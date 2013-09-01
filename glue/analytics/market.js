/* MarketJS Analytics API
 -----------------------------------------------------------------------
 Copyright (c) 2012 MarketJS Limited.  MarketJS APIs and SDKs are licensed
 under the MIT license.  Certain portions may come from 3rd parties and
 carry their own licensing terms and are referenced where applicable. 
 -----------------------------------------------------------------------
*/

// NEW FORMAT 
/*
var MarketJS = {
	protocol: 'http://',
	cloud_domain: 'marketjs-gamecenter.appspot.com',
	localhost_domain: 'localhost:14095',

	game_key:'',
	auth_token:'',
		
	Initialize:function(){	
		this.base_url = this.protocol + (window.location.hostname == 'localhost'? this.localhost_domain:this.cloud_domain);
				
	},
	
	SendRequest:function(){
		
	},
};
*/

var MarketJS = {};

(function()
{
	var PROTOCOL = 'http://';
	var CLOUD_DOMAIN = 'marketjs-gamecenter.appspot.com';
	var LOCALHOST_DOMAIN = 'localhost:14095';
	var BASE_URL = PROTOCOL + (window.location.hostname == 'localhost'? CLOUD_DOMAIN:CLOUD_DOMAIN);
	var GAME_KEY = '';
	var AUTH_TOKEN = '';
	function SendRequest(mode,metric_name,metric_value,callback){
		var request = window.XDomainRequest ? new XDomainRequest() : new XMLHttpRequest(); 
				
		var url;
		switch(mode){
			/* SINGLE COUNTER */
			case 'single-metric-write':
				url = BASE_URL + '/metric/write/' + GAME_KEY + '/' + metric_name + '/' + metric_value;
				break;
			case 'single-metric-read':
				url = BASE_URL + '/metric/read/single/' + GAME_KEY + '/' + metric_name;
				break;
			
			/* MULTI COUNTER */	
			case 'multi-metric-write':
				// handled by POST
				break;
			case 'multi-metric-read':
				url = BASE_URL + '/metric/read/multi/' + GAME_KEY + '?' + metric_name;
				break;
			
			/* LEADERBOARD */					
			case 'leaderboard-read':
				url = BASE_URL + '/leaderboard/read/' + GAME_KEY + '?' + metric_name;
				break;
			case 'leaderboard-write':
				// handled by POST
				break;
												
			default:
				console.log('no mode found');
		}

		request.onerror = function()
		{
			console.log(request.responseText);
		};

		request.onload = function()
		{
			var response = JSON.parse(request.responseText);
			
			if(callback){
				console.log('passing to callback ...')
				callback(response);
			}else{
				console.log(response);
			}			
		};

		if(window.XDomainRequest)
		{
			request.open("GET", url);
		}
		else
		{
			request.open("GET", url, true);
		}
							
		request.send();	
	}
	
	MarketJS.Initialize = function(k){		
		GAME_KEY = k;		
		MarketJS.SingleMetric.Write('InitializeGame','1');
	}

	/**************************
		CUSTOM METRICS 
	**************************/		
	MarketJS.SingleMetric = {
		// uses a key-value pair		
		Write: function(metric_name,metric_value){
			SendRequest('single-metric-write',metric_name,metric_value);
		},
		
		Read: function(metric_name){
			SendRequest('single-metric-read',metric_name);
		},
	}
		
	MarketJS.MultiMetric = {
		Write:function(data){
			var payload = {}
			payload['data'] = JSON.stringify(data);
			payload['game_key'] = GAME_KEY;
			
			$.post(BASE_URL + '/write', payload,
				function(response) {
					console.log("Response: " + response);
			});				
		},
				
		Read: function(metric_names,callback,rank_ascending){
			var query="";
			
			for(i=0;i<metric_names.length;i++){
				query+="metric_name="
				query+=metric_names[i];				
				if(i!=metric_names.length-1) query+="&";				
			}
			
			// RANK
			query+=rank_ascending?'&rank_ascending=yes':'&rank_ascending=no';
			
			console.log(query);					
			SendRequest('multi-metric-read',query,0,callback);
		}
	} 

	
	// Eg usage: MarketJS.Player.Read.Leaderboard('score','665765789',callbackFunction)
	MarketJS.Player = {}
	MarketJS.Player.Read = {
		Leaderboard: function(metric_name,player_key,callback){
			var getString = BASE_URL + '/read/player/game/leaderboard/' + metric_name + '/' + player_key + '/' + GAME_KEY;
			var payload = {}
			$.get(getString, payload, callback, 'json');	
		}		
	}	

	/**************************
		LOGIN 
	**************************/			
	MarketJS.Login = {
		Basic: function(obj,callback){
			var payload = {}
			payload['game_key'] = GAME_KEY;
			payload['login_method'] = 'basic';
			
			// add object properties to payload, without knowing them
			for(var k in obj){
    			payload[k] = obj[k]; // Eg: username, email, password
			}
			
			console.log('login payload:',payload);
			
			$.post(BASE_URL + '/login', payload,callback)			
			
			//console.log('callback: ',callback)
			/*		
			$.post(BASE_URL + '/login', payload,function(response){
				response = JSON.parse(response);
				AUTH_TOKEN = response['auth-token'];
				
				switch(response);	
			});	
			*/							
		}		
	}
	
	/**************************
		LEADERBOARD 
	**************************/			
	MarketJS.Leaderboard = {
		// requires player key
		Write:function(player_key,metric_name,metric_value,cumulative){
			var payload = {}
			payload['game_key'] = GAME_KEY;
			payload['player_key'] = player_key;
			payload['metric_name'] = metric_name;
			payload['metric_value'] = metric_value;
			payload['cumulative'] = cumulative?'true':'false';
			
			$.post(BASE_URL + '/write/leaderboard', payload,
				function(response) {
					console.log("Response: " + response);
			});				
		},

		Read:function(metric_name,rank_ascending,metric_count,callback){
			var query="";
			query+="metric_name=";
			query+=metric_name;
			
			// RANK			
			query+=rank_ascending?'&rank_ascending=yes':'&rank_ascending=no';
			
			// METRIC COUNT (i.e how many results to retrieve)
			query+="&metric_count=";
			query+=metric_count;
			
			SendRequest('leaderboard-read',query,0,callback);
		}					
	}

	/**************************
		END OF LEADERBOARD 
	**************************/
	
	/* Gets the platform */
	MarketJS.Platform = {
		Read:function(){
			var iPhone = /iPhone/i.test(navigator.userAgent);
			var iPad = /iPad/i.test(navigator.userAgent);
			var Android = /android/i.test(navigator.userAgent);
			var WebView = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent);
			
			if(iPhone){
				return 'iPhone';
			}else if(iPad){
				return 'iPad';
			}else if(Android){
				return 'Android';
			}else if(WebView){
				return 'WebView';
			}else{
				return 'Web'
			}				
		}
	}
			
}());


function localJsonpCallback(json) {
        if (!json.Error) {
            console.log(json);
        }
        else {
            console.log(json.Message);
        }
}


/* JSON via json.org */
if (!this.JSON) {
    this.JSON = {};
}

(function () {

    function f(n) {
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf()) ?
                   this.getUTCFullYear()   + '-' +
                 f(this.getUTCMonth() + 1) + '-' +
                 f(this.getUTCDate())      + 'T' +
                 f(this.getUTCHours())     + ':' +
                 f(this.getUTCMinutes())   + ':' +
                 f(this.getUTCSeconds())   + 'Z' : null;
        };

        String.prototype.toJSON =
        Number.prototype.toJSON =
        Boolean.prototype.toJSON = function (key) {
            return this.valueOf();
        };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

        escapable.lastIndex = 0;
        return escapable.test(string) ?
            '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string' ? c :
                    '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' :
            '"' + string + '"';
    }


    function str(key, holder) {


        var i, 
            k,  
            v,    
            length,
            mind = gap,
            partial,
            value = holder[key];

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }


        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }


        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':


            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':


            return String(value);


        case 'object':


            if (!value) {
                return 'null';
            }


            gap += indent;
            partial = [];


            if (Object.prototype.toString.apply(value) === '[object Array]') {


                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }


                v = partial.length === 0 ? '[]' :
                    gap ? '[\n' + gap +
                            partial.join(',\n' + gap) + '\n' +
                                mind + ']' :
                          '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }


            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === 'string') {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {


                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }


            v = partial.length === 0 ? '{}' :
                gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                        mind + '}' : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }


    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {


            var i;
            gap = '';
            indent = '';

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }


            } else if (typeof space === 'string') {
                indent = space;
            }

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                     typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

            return str('', {'': value});
        };
    }



    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {


            var j;

            function walk(holder, key) {


                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }


            if (/^[\],:{}\s]*$/
.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
.replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {


                j = eval('(' + text + ')');


                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }

            throw new SyntaxError('JSON.parse');
        };
    }
}());
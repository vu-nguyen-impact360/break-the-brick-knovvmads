// GENERATED BY SERVER CODE

/* API USE CASE
   For games with no levels, use Endgame (inject add score code, etc)
   For games with levels use Level events (Begin,End,Win,Lose,Draw)
*/
var _SETTINGS = {
    'API':{
        'Enabled':true,
        'Log':{
            'Events':{
                'InitializeGame':true,
                'EndGame':true,
                'Level':{
                    'Begin':true,
                    'End':true,
                    'Win':true,
                    'Lose':true,
                    'Draw':true,
                },
            },
        },
    },
    'Ad':{
        'Mobile':{
            'Preroll':{
                'Enabled':false,
                'Duration':5,
                'Width':300,
                'Height':250,
                'Rotation':{
                    'Enabled':false,
                    'Weight':{
                        'MobileAdInGamePreroll':40,
                        'MobileAdInGamePreroll2':40,
                        'MobileAdInGamePreroll3':20,
                    },
                },
            },
            'Header':{
                'Enabled':false,
                'Duration':5,
                'Width':320,
                'Height':50,
                'Rotation':{
                    'Enabled':false,
                    'Weight':{
                        'MobileAdInGameHeader':40,
                        'MobileAdInGameHeader2':40,
                        'MobileAdInGameHeader3':20,
                    },
                },
            },
            'Footer':{
                'Enabled':false,
                'Duration':5,
                'Width':320,
                'Height':50,
                'Rotation':{
                    'Enabled':false,
                    'Weight':{
                        'MobileAdInGameFooter':40,
                        'MobileAdInGameFooter2':40,
                        'MobileAdInGameFooter3':20,
                    },
                },
            },
            'End':{
                'Enabled':false,
                'Duration':1,
                'Width':300,
                'Height':250,
                'Rotation':{
                    'Enabled':false,
                    'Weight':{
                        'MobileAdInGameEnd':40,
                        'MobileAdInGameEnd2':40,
                        'MobileAdInGameEnd3':20,
                    },
                },
            },
        },
    },

    'Language':{
        'Default':'en',
    },

    'DeveloperBranding':{ // MarketJS Branding
        'Splash':{
            'Enabled':true,
        },
        'Logo':{
            'Enabled':false,
            'Link':'http://google.com',
            'LinkEnabled':false,
            'NewWindow': true,    // open link in new window, although this behavior can be override by browsers preference
            'Width':166,
            'Height':61,
        }
    },

    'Branding':{
        'Splash':{
            'Enabled':false,
        },
        'Logo':{
            'Enabled':false,
            'Link':'http://google.com',
            'LinkEnabled': false, // Makes the logo clickable or not (ie activate/deactivate link)
            'NewWindow': true,    // open link in new window, although this behavior can be override by browsers preference
            'Width':166,
            'Height':61,
        }
    },

    'MoreGames':{
        'Enabled':true,
        'Link':'http://www.marketjs.com/game/links/mobile',
        'NewWindow': true,    // open link in new window, although this behavior can be override by browsers preference
    },

    'Gamecenter':{
        'Enabled':true,
    },
};

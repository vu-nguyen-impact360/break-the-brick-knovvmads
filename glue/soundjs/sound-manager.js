try{
	var manifest = [
	{src:"media/audio/play/static.ogg|media/audio/play/static.mp3", id:"static"},
	{src:"media/audio/opening/opening.ogg|media/audio/opening/opening.mp3", id:"opening"},
	{src:"media/audio/opening/kittyopening.ogg|media/audio/opening/kittyopening.mp3", id:"kittyopening"},
    {src:"media/audio/start.ogg|media/audio/start.mp3", id:"start"},
	];

	createjs.Sound.registerPlugins([createjs.HTMLAudioPlugin, createjs.WebAudioPlugin]);
	createjs.Sound.registerManifest(manifest);
}catch(e){console.log('soundjs'+e);}
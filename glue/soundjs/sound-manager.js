var manifest = [
	{src:"media/audio/opening/opening.ogg|media/audio/opening/opening.mp3", id:"opening"},
    {src:"media/audio/start.ogg|media/audio/start.mp3", id:"start"},
];

createjs.Sound.registerPlugins([createjs.HTMLAudioPlugin, createjs.WebAudioPlugin]);
createjs.Sound.registerManifest(manifest);
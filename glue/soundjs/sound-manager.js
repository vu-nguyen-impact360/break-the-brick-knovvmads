var manifest = [
	{src:"media/sounds/desktop/background.ogg|media/sounds/desktop/background.mp3", id:"BGM"},
    {src:"media/sounds/desktop/start.ogg|media/sounds/desktop/start.mp3", id:"start"},
];

createjs.Sound.registerPlugins([createjs.HTMLAudioPlugin, createjs.WebAudioPlugin]);
createjs.Sound.registerManifest(manifest);
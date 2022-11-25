ig.module('game.entities.buttons.sound-toggle')
    .requires(
        'impact.entity',
        'game.entities.buttons.button'
    )
    .defines(function() {
        EntitySoundToggle = EntityButton.extend({
            muted: false,
            On: new ig.Image("media/graphics/button/btn_on.png"),
            Off: new ig.Image("media/graphics/button/btn_off.png"),
            init:function(x,y,settings){
                settings = settings || {};
                // Image
                this.enable = false;
                this.parent(x,y,settings);
                this.animSheet = new ig.AnimationSheet(this.On.path, 205, 113);
                this.addAnim("enabled", 1, [0], true);
                this.animSheet = new ig.AnimationSheet(this.Off.path, 205, 113);
                this.addAnim("disabled", 1, [0], true);
                this.size = {
                    x: this.animSheet.width,
                    y: this.animSheet.height
                }
                var sound = localStorage.getItem("sound");
                if(sound) {
                    sound = sound === "true";
                    this.muted = !sound;
                    if(this.muted) {
                        this.currentAnim = this.anims.disabled;
                    } else {
                        this.currentAnim = this.anims.enabled;
                    }
                }

                this.pausePage = ig.game.getEntitiesByType(EntityPausePage)[0];
                this.settingPage = ig.game.getEntitiesByType(EntitySettingPage)[0];
            },

            update: function() {
                if (this.pausePage.enable===true||this.settingPage.enable===true){ //
                    this.enable = true;
                }else if (this.pausePage.enable===false&&this.settingPage.enable===false){
                    this.enable = false;
                }

                //this.zIndex = 500;

                if (this.pausePage.enable===true){
                    if (ig.ua.mobile){
                        this.pos.x = this.pausePage.pos.x + (1080 - this.size.x)/2 + 120;
                        this.pos.y = this.pausePage.pos.y + (1920 - 348)/2  + 80;
                    }else{
                        this.pos.x = this.pausePage.pos.x + (1920 - 343)/2 + 200;
                        this.pos.y = this.pausePage.pos.y + (1080 - 348)/2  + 80;
                    }

                }else if (this.settingPage.enable===true){
                    if (ig.ua.mobile){
                        this.pos.x = this.settingPage.pos.x + (1080 - this.size.x)/2 + 111;
                        this.pos.y = this.settingPage.pos.y + (1920 - 348)/2 + 80;
                    }else{
                        this.pos.x = this.settingPage.pos.x + (1920 - this.size.x)/2 + 111;
                        this.pos.y = this.settingPage.pos.y + (1080 - 348)/2 + 80;
                    }

                }
            },

            clicked: function() {
                if(this.muted)
                {
                    ig.soundHandler.unmuteSFX(true);
                    this.muted = false;
                    this.currentAnim = this.anims.enabled;
                    localStorage.setItem("sound", true);
                    ig.soundHandler.sfxPlayer.play("testSound");
                }
                else
                {
                    ig.soundHandler.muteSFX(true);
                    this.muted = true;
                    this.currentAnim = this.anims.disabled;
                    localStorage.setItem("sound", false);
                }
            },
            clicking: function() {
            },

            released: function() {
            },
        });
    });
ig.module('game.entities.home-page')
	.requires(
		'impact.entity',
		'game.entities.buttons.start-button',
		'game.entities.buttons.setting-button',
		'game.entities.buttons.button-more-games'
	)
	.defines(function () {
		EntityHomePage = ig.Entity.extend({
			zIndex: 300,
			pos: new Vector2(0, 0),
			size: new Vector2(1, 1),
			color: new ColorRGB(125, 255, 125, 1),
			//animSheet: new ig.AnimationSheet('media/graphics/game/player.png',117,23),
			image: new ig.Image('media/graphics/game/background.png'),
			imageMobile: new ig.Image('media/graphics/game/background-m.png'),
			title: new ig.Image('media/graphics/game/title.png'),
			gameControl: null,
			init: function (x, y, settings) {
				this.parent(x, y, settings);

				this.enable = true;

				this.startButtom = ig.game.spawnEntity(EntityStartButton, 0, 0, {
					gameControl: this.gameControl,
					homePage: this
				})

				this.settingButtom = ig.game.spawnEntity(EntitySettingButton, 0, 0, {
					gameControl: this.gameControl,
					pausePage: this,
					resultPage: this.gameControl.resultPage
				})

				if (_SETTINGS.MoreGames.Enabled === true) {
					this.moreGameButtom = ig.game.spawnEntity(EntityButtonMoreGames, 0, 0, {
						homePage: this
					});
				}

				ig.game.sortEntitiesDeferred();

			},
			update: function () {

				this.parent();

				if (this.gameControl.home === true) {

					this.enable = true;
					if (this.moreGameButtom) {
						this.moreGameButtom.enable = true;
						this.moreGameButtom.show();
					}

				} else if (this.gameControl.home === false) {

					this.enable = false;
					if (this.moreGameButtom) {
						this.moreGameButtom.enable = false;
						this.moreGameButtom.hide();
					}


				}


			},
			draw: function () {
				this.parent();

				if (this.enable === true) {
					if (ig.ua.mobile) {
						this.imageMobile.draw(this.pos.x, this.pos.y);
						this.title.draw((1080 - 835)*0.5, 300);
					} else {
						this.image.draw(this.pos.x, this.pos.y);
						this.title.draw((1920 - 835)*0.5, 100);
					}
				}
			}

		});
	});
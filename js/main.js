window.addEventListener("load" , function(){

	var mainState = {
		
		bulletTime: 0,
	
		preload : function () {
			this.hero = game.load.image('hero', 'assets/player.png');
			this.bullet = game.load.image('bullet', 'assets/bullet.png');
			game.load.image('wallV', 'assets/wallVertical.png' );
			game.load.image('wallH', 'assets/wallHorizontal.png' );
		},
		
		create : function() {
			this.hero = game.add.sprite(game.world.centerX, game.world.centerY, 'hero');
			this.wallLeft = game.add.sprite(0, 10, 'wallV');
			game.physics.startSystem(Phaser.Physics.ARCADE);
			game.physics.arcade.enable(this.hero);
			
			this.cursor = game.input.keyboard.createCursorKeys();
			fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			
		    bullets = game.add.group();
		    bullets.enableBody = true;
		    bullets.physicsBodyType = Phaser.Physics.ARCADE;
		    bullets.createMultiple(40, 'bullet');
		    bullets.setAll('anchor.x', -0.5);
		    bullets.setAll('anchor.y', 1);
		    bullets.setAll('outOfBoundsKill', true);
		    bullets.setAll('checkWorldBounds', true);
		},
	
		update: function() {
		    this.hero.body.velocity.x = 0;
		    this.hero.body.velocity.y = 0;
			
			this.movePlayer();
		},
		
		movePlayer: function() {
			
			if (this.cursor.left.isDown ) {
				this.hero.body.velocity.x = -400; 
		    }  
			else if (this.cursor.right.isDown) { 
				this.hero.body.velocity.x = 400;
			} else if (this.cursor.up.isDown) {
				this.hero.body.velocity.y = -400;
				
			}  else if (this.cursor.down.isDown) {
				this.hero.body.velocity.y = 400;
				
			}
			else {
				this.hero.body.velocity.x = 0;
			}
	
	        if (fireButton.isDown) {
	            this.fireBullet();
	        }
			
		          
		},
		
		fireBullet: function() {

		    //  To avoid them being allowed to fire too fast we set a time limit
		    if (game.time.now > this.bulletTime)
		    {
		        //  Grab the first bullet we can from the pool
		        bullet = bullets.getFirstExists(false);

		        if (bullet)
		        {
		            //  And fire it
		            bullet.reset(this.hero.x, this.hero.y + 8);
		            bullet.body.velocity.y = -800;
		            bulletTime = game.time.now + 200;
		        }
		    }

		},
		
		resetBullet: function(bullet) {

		    //  Called if the bullet goes out of the screen
		    bullet.kill();

		}
		
	}

	var game = new Phaser.Game(800, 480, Phaser.AUTO, 'gameDiv');

	game.state.add( 'main', mainState );
	game.state.start('main');
		
});
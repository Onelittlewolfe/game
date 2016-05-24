window.addEventListener("load" , function(){

	var mainState = {
		
		bulletTime: 0,
	
		preload : function () {
			this.hero = game.load.image('hero', 'assets/player.png');
			this.bullet = game.load.image('bullet', 'assets/bullet.png');
			this.coin = game.load.image('coin', 'assets/coin.png');
			game.load.image('wallV', 'assets/wallVertical.png' );
			game.load.image('wallH', 'assets/wallHorizontal.png' );
		},
		
		
		createWorld : function (){
			
			this.walls = game.add.group();
			this.walls.enableBody = true;
			
					
			var leftWall = game.add.sprite(0, 0, 'wallV', 0, this.walls);
			leftWall.scale.setTo(1.5, 5);
			
			var rightWall = game.add.sprite(770, 0, 'wallV', 0, this.walls);
			rightWall.scale.setTo(1.5, 5);
			
			var floor = game.add.sprite(0, 460, 'wallH', 0, this.walls);
			floor.scale.setTo(3, 1);
			
			var celing = game.add.sprite(0, 0, 'wallH', 0, this.walls);
			celing.scale.setTo(4, 1);
			
			this.walls.setAll('body.immovable', true);
			
		},
		
		createBullets: function (){
		    
			this.bullets = game.add.group();
		    this.bullets.enableBody = true;
		    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
		    this.bullets.createMultiple(40, 'bullet');
		    this.bullets.setAll('anchor.x', -0.5);
		    this.bullets.setAll('anchor.y', 1);
		    this.bullets.setAll('outOfBoundsKill', true);
		    this.bullets.setAll('checkWorldBounds', true);
		},
		
		create : function() {
			this.hero = game.add.sprite(game.world.centerX, game.world.centerY, 'hero');
			this.coin = game.add.sprite(250, 250, 'coin');
			
			this.scoreLabel = game.add.text(50, 50, "this is the score", 
			{ font: '18px Arial' , fill: '#ffffff' });
			
			this.score = 0;
			
			this.coin.anchor.setTo(0.5, 0.5);
			
			game.physics.startSystem(Phaser.Physics.ARCADE);
			
			game.physics.arcade.enable(this.hero);
			game.physics.arcade.enable(this.coin);
			
			this.cursor = game.input.keyboard.createCursorKeys();
			fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			
			this.createBullets();
			this.createWorld();
		},
	
		update: function() {

			game.physics.arcade.collide(this.hero, this.walls);
			
		    this.hero.body.velocity.x = 0;
		    this.hero.body.velocity.y = 0;
			
			this.movePlayer();
			
			game.physics.arcade.overlap(this.hero, this.coin, this.takeCoin, null, this );
			
			if ( !this.hero.inWorld ) { 
				this.playerDie();
			}
		},
		
		takeCoin: function(hero, coin) {
			// this.coin.kill();
			
			var newX = game.rnd.integerInRange(10, game.world.width - 20); 
			var newY = game.rnd.integerInRange(10, game.world.height - 20);
			
			
			
			this.score += 5
			this.scoreLabel.text = 'score: ' + this.score; 
			this.updateCoin();
		},
		
		updateCoin: function(){
		
			var coinPosition = [
				{x:200, y: 50}, {x:300, y:120},
				{x:500, y: 80}, {x:300, y:430},
				{x:200, y: 200}, {x:120, y:300},
			];
			
			
			for (var i = 0; i < coinPosition.length; i++  ){
				if( coinPosition[i].x == this.coin.x  ) {
					coinPosition.splice(i, 1);
				}
				
			}
			
			var newPosition = coinPosition[ game.rnd.integerInRange(0, coinPosition.length-1)];
			this.coin.reset(newPosition.x, newPosition.y );
			console.log(newPosition.x, newPosition.y )
			
			
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
		
		playerDie: function(){
			
			game.state.start('main');
			
		},
		
		fireBullet: function() {

		    //  To avoid them being allowed to fire too fast we set a time limit
		    if (game.time.now > this.bulletTime)
		    {
		        //  Grab the first bullet we can from the pool
		        bullet = this.bullets.getFirstExists(false);

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
window.addEventListener("load" , function(){

	var mainState = {
	
		preload : function () {
			this.hero = game.load.image('hero', 'assets/player.png');
		},
		
		create : function() {
			this.hero = game.add.sprite(20, 20, 'hero');
			game.physics.startSystem(Phaser.Physics.ARCADE);
			game.physics.arcade.enable(this.hero);
			
			this.cursor = game.input.keyboard.createCursorKeys();
		},
	
		update: function() {
		    this.hero.body.velocity.x = 0;
		    this.hero.body.velocity.y = 0;
			
			this.movePlayer();
		},
		
		movePlayer: function() {
			
			if (this.cursor.left.isDown ) {
				this.hero.body.velocity.x = -200; 
		    }  
			else if (this.cursor.right.isDown) { 
				this.hero.body.velocity.x = 200;
			} else if (this.cursor.up.isDown) {
				this.hero.body.velocity.y = -200;
				
			}  else if (this.cursor.down.isDown) {
				this.hero.body.velocity.y = 200;
				
			}
			else {
				this.hero.body.velocity.x = 0;
			}
		          
		}
	}

	var game = new Phaser.Game(400, 300, Phaser.AUTO, 'gameDiv');

	game.state.add( 'main', mainState );
	game.state.start('main');
		
});
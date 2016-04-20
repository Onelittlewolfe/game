window.addEventListener("load" , function(){

	var mainState = {
	
		preload : function () {
			this.hero = game.load.image('hero', 'assets/mario.gif');
			
		},
		
		create : function() {
			this.hero = game.add.sprite(20, 20, 'hero');
			game.physics.arcade.enable(this.hero);
			this.cursor = game.input.keyboard.createCursorKeys();
		},
	
		update: function() {
			this.movePlayer();
		},
		
		movePlayer: function() {
			
			if (this.cursor.left.isDown ) {
				this.hero.body.velocity.x = -200; 
		    }  
			else if (this.cursor.right.isDown) { 
				this.hero.body.velocity.x = 200;
			}
			else {
				this.hero.body.velocity.x = 0;
			}
		          
			if (this.cursor.up.isDown && this.hero.body.touching.down) { 
				 this.hero.body.velocity.y = -320;
			}
		}
	}

	var game = new Phaser.Game(400, 300, Phaser.AUTO, 'gameDiv');

	game.state.add( 'main', mainState );
	game.state.start('main');
	
		
});
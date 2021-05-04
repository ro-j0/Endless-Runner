class Menu extends Phaser.Scene {

    constructor() {
        super("menuScene");
    }

    preload(){
        this.load.image('background', './assets/menuTitle.png');
        
        // Call function that loads game font
        loadFont("chuck", "assets/fonts/Chuck_W01_Regular.ttf");
    }

    create(){
        this.background = this.add.image(game.config.width/2, game.config.height/2, 'background').setOrigin(0.5, 0.5);
        this.background.scaleX = 0.7;
        this.background.scaleY = 0.7;

        // Create Score UI
        let PLAYConfig = {
            fontFamily: 'chuck',
            fontSize: '56px',
            color: '#faf5c8',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            }
        }

        // Create Score UI
        let CREDITSConfig = {
            fontFamily: 'chuck',
            fontSize: '40px',
            color: '#faf5c8',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            }
        }
        
        // Add Play Button to the Screen
        this.play = this.add.text(game.config.width/2 , 3*game.config.height/4, "PLAY", PLAYConfig).setOrigin(0.5, 0.5);
        this.play.setInteractive();
        this.play.on('pointerover', () => { this.enterButtonHoverState(this.play); });
        this.play.on('pointerout', () => { this.enterButtonRestState(this.play); });
        this.play.on('pointerdown', () => { this.scene.start("playScene"); });

        // Add Credits Button to the Screen
        this.credits = this.add.text(game.config.width/2 , 3*game.config.height/4 +50, "CREDITS", CREDITSConfig).setOrigin(0.5, 0.5);
        this.credits.setInteractive();
        this.credits.on('pointerover', () => { this.enterButtonHoverState(this.credits); });
        this.credits.on('pointerout', () => { this.enterButtonRestState(this.credits); });
        this.credits.on('pointerdown', () => { this.scene.start("creditsScene"); });
        
    }

    enterButtonHoverState(button) {
        button.setStyle({ color: '#525e4a'});
      }
    
    enterButtonRestState(button) {
        button.setStyle({ color: '#faf5c8' });
    }
    
}
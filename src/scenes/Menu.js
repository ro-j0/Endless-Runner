class Menu extends Phaser.Scene {

    constructor() {
        super("menuScene");
    }

    preload(){
        this.load.image('background', './assets/mainmenu.png');
        
        // Call function that loads game font
        loadFont("chuck", "assets/fonts/Chuck_W01_Regular.ttf");
    }

    create(){
        this.background = this.add.image(game.config.width/2, game.config.height/2 + 60, 'background');
        this.background.scaleX = 1.15;
        this.background.scaleY = 1.15;

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
        this.play = this.add.text(game.config.width -200 , game.config.height/2 -200, "PLAY", PLAYConfig);
        this.play.setInteractive();
        this.play.on('pointerover', () => { this.enterButtonHoverState(this.play); });
        this.play.on('pointerout', () => { this.enterButtonRestState(this.play); });
        this.play.on('pointerdown', () => { this.scene.start("playScene"); });

        // Add Credits Button to the Screen
        this.credits = this.add.text(game.config.width -230 , game.config.height/2-125 , "CREDITS", CREDITSConfig);
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
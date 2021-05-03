class Credits extends Phaser.Scene {

    constructor() {
        super("creditsScene");
    }

    preload(){
        this.load.image('creditsBackground', './assets/creditsBG.png');
    }

    create(){
        this.background = this.add.image(game.config.width/2, game.config.height, 'creditsBackground');
        
        // Create Score UI
        let BUTTONConfig = {
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
        let TEXTConfig = {
            fontFamily: 'Courier',
            fontSize: '30px',
            color: '#faf5c8',
            align: 'center',
            padding: {
            top: 5,
            bottom: 5,
            }
        }
        
        // Add Back Button to the Screen
        this.back = this.add.text(20, game.config.height/2 -200, "Back", BUTTONConfig);
        this.back.setInteractive();
        this.back.on('pointerover', () => { this.enterButtonHoverState(this.back); });
        this.back.on('pointerout', () => { this.enterButtonRestState(this.back); });
        this.back.on('pointerdown', () => { this.scene.start("menuScene"); });

        // Add Credits to the Screen
        this.line1 = this.add.text(30, game.config.height/2-110 , "Artwork by\nLauren Nakamura", TEXTConfig).setOrigin(0.5,0).x = game.config.width/2;
        this.line2 = this.add.text(30, game.config.height/2-20, "Sound Design by\nRohan Jhangiani", TEXTConfig).setOrigin(0.5,0).x = game.config.width/2;
        this.line3 = this.add.text(30, game.config.height/2+70 , "Gameplay Programming by\nStryker Buffington", TEXTConfig).setOrigin(0.5,0).x = game.config.width/2;
        
    }

    enterButtonHoverState(button) {
        button.setStyle({ color: '#525e4a'});
      }
    
    enterButtonRestState(button) {
        button.setStyle({ color: '#faf5c8' });
    }
}
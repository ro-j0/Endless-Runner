class Credits extends Phaser.Scene {

    constructor() {
        super("creditsScene");
    }

    preload(){
        this.load.image('creditsBackground', './assets/creditsBG.png');
    }

    create(){
        //this.background = this.add.image(game.config.width/2, game.config.height, 'creditsBackground');
        this.back6 = this.add.tileSprite(0, game.config.height-90, this.textures.get('backLayer6').width, this.textures.get('backLayer6').height, 'backLayer6').setOrigin(0, 1);
        this.back5 = this.add.tileSprite(0, game.config.height-120, this.textures.get('backLayer5').width, this.textures.get('backLayer5').height, 'backLayer5').setOrigin(0, 1);
        this.back4 = this.add.tileSprite(0, game.config.height-30, this.textures.get('backLayer4').width, this.textures.get('backLayer4').height, 'backLayer4').setOrigin(0, 1);
        this.back3 = this.add.tileSprite(0, game.config.height, this.textures.get('backLayer3').width*1.3, this.textures.get('backLayer3').height*1.3, 'backLayer3').setOrigin(0, 1);
        
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
        this.back = this.add.text(40, 40, "Back", BUTTONConfig);
        this.back.setInteractive();
        this.back.on('pointerover', () => { enterButtonHoverState(this.back); });
        this.back.on('pointerout', () => { enterButtonRestState(this.back); });
        this.back.on('pointerdown', () => { this.scene.start("menuScene"); });

        // Add Credits to the Screen
        this.line1 = this.add.text(30, game.config.height/2-200 , "Artwork by\nLauren Nakamura", TEXTConfig).setOrigin(0.5,0).x = game.config.width/2;
        this.line2 = this.add.text(30, game.config.height/2-20, "Sound Design by\nRohan Jhangiani", TEXTConfig).setOrigin(0.5,0).x = game.config.width/2;
        this.line3 = this.add.text(30, game.config.height/2-110 , "Gameplay Programming by\nStryker Buffington", TEXTConfig).setOrigin(0.5,0).x = game.config.width/2;
        
    }
}
class Tutorial extends Phaser.Scene {

    constructor() {
        super("tutorialScene");
    }

    create(){
        this.background = this.add.image(game.config.width/2, game.config.height/2, 'tutorialScreen');
        this.background.scaleX = 0.7;
        this.background.scaleY = 0.7;

        // Set sound variables
        if (!this.UISound){
            this.UISound = this.sound.add("UISound", {loop: false, volume: 0.5});
        }
        
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
        
        // Add Back Button to the Screen
        this.back = this.add.text(40, game.config.height - 40, "Back", BUTTONConfig).setOrigin(0, 1);
        this.back.setInteractive();
        this.back.on('pointerover', () => { enterButtonHoverState(this.back); });
        this.back.on('pointerout', () => { enterButtonRestState(this.back); });
        this.back.on('pointerdown', () => { 
            this.UISound.play();
            this.scene.start("menuScene"); 
        });
    }
}
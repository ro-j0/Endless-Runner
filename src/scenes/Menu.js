class Menu extends Phaser.Scene {

    constructor() {
        super("menuScene");
    }

    preload(){
        // Check if we have already loaded the assets
        if (this.background){
            return;
        }

        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBar.x = 240;
        progressBox.x = 240;
        progressBar.y = 80;
        progressBox.y = 80;
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        var width = game.config.width;
        var height = game.config.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        
        this.load.on('progress', function (value) {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });

        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
        });

        // Call function that loads game font
        loadFont("chuck", "./assets/fonts/Chuck_W01_Regular.ttf");

        // Load Images
        this.load.image('obstacle1', './assets/pillarL1.png');
        this.load.image('obstacle2', './assets/pillarL2.png');
        this.load.image('obstacle3', './assets/pillarL3.png');
        this.load.image('backLayer1', './assets/hill2.png');
        this.load.image('backLayer2', './assets/hill1.png');
        this.load.image('backLayer3', './assets/tree4.png');
        this.load.image('backLayer4', './assets/tree3.png');
        this.load.image('backLayer5', './assets/tree2.png');
        this.load.image('backLayer6', './assets/tree1.png');
        this.load.image('backLayer7', './assets/cloudsandmountains.png');
        this.load.image('sun', './assets/sun.png');
        this.load.image('background', './assets/Menutitle.png');
        this.load.image('deathScreen', './assets/Endscreen.png');
        this.load.image('tutorialScreen', './assets/tutorialscreen.png');
        this.load.image('creditsBackground', './assets/credits.png');
        this.load.image('nightmareBackground', './assets/nmbg.png');
        this.load.image('nightmareSun', './assets/nmsun.png');
        this.load.image('obstacle4', './assets/pillarL4.png');
        
        // Load spritesheet with player animations
        this.load.atlas('spriteSheet', './assets/spritesheet.png', './assets/spritesheet.json');
        this.load.atlas('glitchSheet', './assets/glitchSheet.png', './assets/glitch.json');

        // Load Audio Files
        this.load.audio("music", ["./assets/sounds/music.wav"]);
        this.load.audio("jump", ["./assets/sounds/jumpSound.wav"]);
        this.load.audio("startSound", ["./assets/sounds/cluck1.mp3"]);
        this.load.audio("deathSound", ["./assets/sounds/squeak.mp3"]);
        this.load.audio("UISound", ["./assets/sounds/cluck2.mp3"]);
        this.load.audio("deathBackgroundSound", ["./assets/sounds/frying.mp3"]);
        this.load.audio("nmmusic", ["./assets/sounds/night.wav"]);
        
    }

    create(){
        
        // Render background Image
        this.background = this.add.image(game.config.width/2, game.config.height/2, 'background').setOrigin(0.5, 0.5);
        this.background.scaleX = 0.7;
        this.background.scaleY = 0.7;

        // Set sound variables
        if (!this.UISound){
            this.UISound = this.sound.add("UISound", {loop: false, volume: 0.5});
        }

        // Config for Play Button
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

        // Config for other buttons
        let CREDITSConfig = {
            fontFamily: 'chuck',
            fontSize: '40px',
            color: '#faf5c8',
            align: 'center',
            padding: {
            top: 5,
            bottom: 5,
            }
        }
        
        // Add Play Button to the Screen
        this.play = this.add.text(game.config.width/2 , 3*game.config.height/4, "PLAY", CREDITSConfig).setOrigin(0.5, 0.5);
        this.play.setInteractive();
        this.play.on('pointerover', () => { enterButtonHoverState(this.play); });
        this.play.on('pointerout', () => { enterButtonRestState(this.play); });
        this.play.on('pointerdown', () => { 
            this.scene.start("playScene"); 
        });

        // Add Credits Button to the Screen
        this.tutorial = this.add.text(game.config.width/3 , 3*game.config.height/4, "TUTORIAL", CREDITSConfig).setOrigin(0.5, 0.5);
        this.tutorial.setInteractive();
        this.tutorial.on('pointerover', () => { enterButtonHoverState(this.tutorial); });
        this.tutorial.on('pointerout', () => { enterButtonRestState(this.tutorial); });
        this.tutorial.on('pointerdown', () => { 
            this.UISound.play();
            this.scene.start("tutorialScene"); 
        });

        // Add Credits Button to the Screen
        this.credits = this.add.text((2 * game.config.width)/3 -20, 3*game.config.height/4, "CREDITS", CREDITSConfig).setOrigin(0.5, 0.5);
        this.credits.setInteractive();
        this.credits.on('pointerover', () => { enterButtonHoverState(this.credits); });
        this.credits.on('pointerout', () => { enterButtonRestState(this.credits); });
        this.credits.on('pointerdown', () => { 
            this.UISound.play();
            this.scene.start("creditsScene");
        });
    }

    
    
}
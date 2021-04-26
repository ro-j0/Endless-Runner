class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // Load sprites
        this.load.image('player', './assets/Player.png');
        this.load.image('obstacle', './assets/Obstacle.png');
    }

    create() {
        // Create ground
        this.ground = this.add.rectangle(320, 480, 640, 100, 0x00FF00);
        // Create Player
        this.player = new Player(this, 100, 380, 'player').setOrigin(0,0);



        // Create key bindings
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    }

    update() {
        // Update the player
        this.player.update();
    }
}
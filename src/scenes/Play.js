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

        //this.ground.setCollisionByExclusion([-1]);

        // this.physics.world.bounds.width = this.ground.width;
        // this.physics.world.bounds.height = this.ground.height;

        this.physics.add.existing(this.ground);
        this.ground.body.immovable = true;
        this.ground.body.moves = false;

        this.obstacle = new Obstacle(this, 700, 100, 'obstacle').setOrigin(0,0);

        this.spawnRate = 1000;

        this.physics.add.collider(this.ground, this.player);

        // Create key bindings
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    }

    update() {
        // Update the player
        this.player.update();
        if(this.spawnRate <= 0){
            this.obstacle = new Obstacle(this, 560, 340, 'obstacle').setOrigin(0,0);
            this.physics.add.collider(this.ground, this.obstacle);
            this.physics.add.collider(this.player, this.obstacle);
            this.spawnRate = 1000;
        }
        this.obstacle.update();
        this.spawnRate = this.spawnRate - 2.5;

    }

    
}
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
        //this.ground = this.add.rectangle(320, 480, 640, 100, 0x00FF00);
        this.ground = this.add.rectangle(320, 480, 840, 100, 0x00FF00);
        // Create Player
        this.player = new Player(this, 100, game.config.height - this.ground.height, 'player').setOrigin(0.5,0);

        //this.ground.setCollisionByExclusion([-1]);

        // this.physics.world.bounds.width = this.ground.width;
        // this.physics.world.bounds.height = this.ground.height;

        this.physics.add.existing(this.ground);
        this.ground.body.immovable = true;
        this.ground.body.moves = false;

        this.obstacles = [];
        //this.obstacle = new Obstacle(this, 700, 340, 'obstacle').setOrigin(0.5,0);

        this.spawnTimer = 0;

        this.physics.add.collider(this.ground, this.player);

        // Create key bindings
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.difficulty = 0;
        this.score = 0;
        
        // Time between obstacle spawns (ms)
        this.SPAWN_RATE = 1000;

        // Create the first obstacle
        let obstacle = new Obstacle(this, 660, this.ground.y - this.ground.height, 'obstacle', 0, 150, 0);
        this.obstacles.push(obstacle);
        this.physics.add.collider(this.player, obstacle);

        // Create Score UI
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            }
        }
        this.scoreLeft = this.add.text(20 , 20, this.score+" seconds", scoreConfig);

    }

    update(speed, delta) {
        // Update the player
        this.player.update();

        // Increase score by time since last frame
        this.increaseScore(delta);

        // Increase Timer variable by time since last frame
        this.spawnTimer += delta;

        // Check if the player is dead
        if (this.player.x <= 0){
            this.gameOver();
        }

        // Check if we should spawn an obstacle
        if(this.spawnTimer >= this.SPAWN_RATE){
            this.spawnObstacle();
            this.spawnTimer = 0;
        }
        
        let idx;
        for (idx = 0; idx < this.obstacles.length; idx++){
            this.obstacles[idx].update();
        }
        

    }

    spawnObstacle(){
        let obstacle = new Obstacle(this, 660, this.ground.y - this.ground.height, 'obstacle', 0, 150, this.obstacles[this.obstacles.length-1].scaleY);
        this.obstacles.push(obstacle);
        this.physics.add.collider(this.player, obstacle);
    }

    increaseScore(delta){
        this.score += delta;
        this.scoreLeft.text = Math.round(this.score/1000) + " seconds"; 
    }

    gameOver(){
        this.registry.destroy(); // destroy registry
        this.events.off(); // disable all active events
        this.scene.restart(); // restart current scene
    }
}
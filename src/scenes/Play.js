class Play extends Phaser.Scene {

    constructor() {
        super("playScene");
    }

    preload() {
        // Load sprites
        this.load.image('player', './assets/Player.png');
        this.load.image('obstacle', './assets/Obstacle.png');
        this.load.image('backdrop', './assets/backdrop.png');
    }

    create() {
        // Create backdrop
        this.sky = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'backdrop').setOrigin(0, 0);
        this.scrollSpeed = 0.05;
        //this.sky.setTint("0x00FF00");

        // Set the three tint colors we are going to shift to and from
        // const firstColor = Phaser.Display.Color.ValueToColor(0x42d6af);
        // const secondColor = Phaser.Display.Color.ValueToColor(0xd64de8);
        // const thirdColor = Phaser.Display.Color.ValueToColor(0xe8af4d);

        // this.tweens.addCounter({
        //     from: 0,
        //     to: 100,
        //     duration: 5000,
        //     ease: Phaser.Math.Easing.Sine.Inout,

        // })

        // Create ground
        this.ground = this.add.rectangle(320, 480, 640, 100, 0xFF0000);

        // Create Player
        this.player = new Player(this, game.config.width/2, this.ground.y - this.ground.height - 40, 'player').setOrigin(0.5,1);
        this.player.body.Set

        //this.ground.setCollisionByExclusion([-1]);
        this.physics.world.bounds.width = this.ground.width;
        //this.physics.world.bounds.height = this.ground.height;
        this.player.body.setCollideWorldBounds(true);

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

        // Start on Easy Mode
        this.difficulty = 0;
        
        // Speed of obstacles
        this.currentSpeed = 150;

        // Time between obstacle spawns (ms)
        this.SPAWN_RATE = 1500;

        // Column Width
        this.columnWidth = 3;
        
        // Keeps track of time alive
        this.score = 0;

        
        // EASY (0:00-0:30): speed = 150, rate = 1500, width = 3

        // MEDIUM (0:30-0:59): speed: 200, rate = 1000, width = 2
        this.MEDIUM_THRESHOLD = 30000;

        // HARD (1:00-INF): speed = 250, rate = 600, width = 1.2
        this.HARD_THRESHOLD = 60000;
        
        

        // Create the first obstacle
        let obstacle = new Obstacle(this, 0, this.ground.y - this.ground.height, 'obstacle', 0, this.currentSpeed, 0, 24);
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


        this.DoubleJumpGroup = this.game.add.group();
        //this.DoubleJumpGroup.add(sprite1);


    }

    update(speed, delta) {
        
        // Update the player
        this.player.update(delta);

        // Increase score by time since last frame
        this.increaseScore(delta);

        // Check if we're ready to increase difficulty
        this.increaseDifficulty();

        // Increase Timer variable by time since last frame
        this.spawnTimer += delta;

        // Check if the player is dead
        if (this.player.x <= 0 || this.player.y >= game.config.height - 50){
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
        
        this.sky.tilePositionX += this.scrollSpeed*delta;

    }

    spawnObstacle(){
        let obstacle = new Obstacle(this, 660, this.ground.y - this.ground.height, 'obstacle', 0, this.currentSpeed, this.obstacles[this.obstacles.length-1].scaleY, this.columnWidth);
        this.obstacles.push(obstacle);
        this.physics.add.collider(this.player, obstacle);
    }

    increaseScore(delta){
        this.score += delta;
        this.scoreLeft.text = Math.round(this.score/1000) + " seconds"; 
    }

    increaseDifficulty(){
        // Bounce back quickly if difficulty is maxed
        if (this.difficulty == 2){
            return;
        }
        if (this.score >= this.HARD_THRESHOLD && this.difficulty < 2){
            this.difficulty = 2;
            this.currentSpeed = 250;
            this.SPAWN_RATE = 600;
            this.columnWidth = 1.2;
            // let idx;
            // for (idx = 0; idx < this.obstacles.length; idx++){
            //      this.obstacles[idx].body.velocity.x = -this.currentSpeed;
            // }
        } else if (this.score >= this.MEDIUM_THRESHOLD && this.difficulty < 1){
            this.difficulty = 1;
            this.currentSpeed = 200;
            this.SPAWN_RATE = 800;
            this.columnWidth = 2;
            // let idx;
            // for (idx = 0; idx < this.obstacles.length; idx++){
            //      this.obstacles[idx].body.velocity.x = -this.currentSpeed;
            // }
        }
    }

    gameOver(){
        this.registry.destroy(); // destroy registry
        this.events.off(); // disable all active events
        this.scene.restart(); // restart current scene
    }
}
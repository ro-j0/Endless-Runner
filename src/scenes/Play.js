class Play extends Phaser.Scene {

    constructor() {
        super("playScene");
    }

    preload() {
        // Load sprites
        this.load.image('obstacle1', './assets/pillar1.png');
        this.load.image('obstacle2', './assets/pillar2.png');
        this.load.image('obstacle3', './assets/pillar3.png');
        this.load.image('backLayer1', './assets/hill2.png');
        this.load.image('backLayer2', './assets/hill1.png');
        this.load.image('backLayer3', './assets/trees4.png');
        this.load.image('backLayer4', './assets/trees3.png');
        this.load.image('backLayer5', './assets/trees2.png');
        this.load.image('backLayer6', './assets/trees1.png');
        this.load.image('backLayer7', './assets/clouds_mountains.png');
        this.load.atlas('spriteSheet', './assets/spritesheet.png', 'assets/spritesheet.json');
    }

    create() {
        // Create backdrop elements
        this.back7 = this.add.tileSprite(0, game.config.height-350, this.textures.get('backLayer7').width, this.textures.get('backLayer7').height, 'backLayer7').setOrigin(0, 0);
        this.back6 = this.add.tileSprite(0, game.config.height-70, this.textures.get('backLayer6').width, this.textures.get('backLayer6').height, 'backLayer6').setOrigin(0, 1);
        this.back5 = this.add.tileSprite(0, game.config.height-90, this.textures.get('backLayer5').width, this.textures.get('backLayer5').height, 'backLayer5').setOrigin(0, 1);
        this.back4 = this.add.tileSprite(0, game.config.height-40, this.textures.get('backLayer4').width, this.textures.get('backLayer4').height, 'backLayer4').setOrigin(0, 1);
        this.back3 = this.add.tileSprite(0, game.config.height-30, this.textures.get('backLayer3').width, this.textures.get('backLayer3').height, 'backLayer3').setOrigin(0, 1);
        this.back2 = this.add.tileSprite(0, game.config.height, this.textures.get('backLayer2').width, this.textures.get('backLayer2').height, 'backLayer2').setOrigin(0, 1);
        this.back1 = this.add.tileSprite(0, game.config.height, this.textures.get('backLayer1').width, this.textures.get('backLayer1').height, 'backLayer1').setOrigin(0, 1);
        
        // Setting scroll speeds for various parallax scrolling elements
        this.scrollSpeeds = [0.1, 0.08, 0.07, 0.05, 0.03, 0.02, 0.01];

        // Create Player
        this.player = new Player(this, game.config.width/2, game.config.height - 240, 'spriteSheet').setOrigin(0.5,1);
        
        // Set world bounds
        this.physics.world.bounds.width = game.config.width;
        
        // Obstacle array, stores each obstacle that is shown on screen
        this.obstacles = [];

        // Keeps track of current obstacle sprite
        this.obstacleSprite = 'obstacle1';

        // Timer to keep track of when it's time to spawn another obstacle
        this.spawnTimer = 0;


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

        // Create the first obstacles, that form a forgiving platform
        let ob_idx;
        for (ob_idx = 0; ob_idx < 10; ob_idx++){
            // {72 * ob_idx} is hard coded; should be {obstacle.width * 3 * ob_idx}
            let obstacle = new Obstacle(this, 72*ob_idx, game.config.height, this.obstacleSprite, 0, this.currentSpeed, 0, 3);
            this.obstacles.push(obstacle);
            this.physics.add.collider(this.player, obstacle);
        }

        // Create Score UI
        let scoreConfig = {
            fontFamily: 'chuck',
            fontSize: '56px',
            color: '#faf5c8',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            }
        }
        
        // Add UI Element to the screen
        this.scoreLeft = this.add.text(20 , 20, this.score, scoreConfig);
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
        if (this.player.x <= 0 || this.player.y >= game.config.height + this.player.height){
            this.gameOver();
        }

        // Check if we should spawn an obstacle
        if(this.spawnTimer >= this.SPAWN_RATE){
            this.spawnObstacle();
            this.spawnTimer = 0;
        }
        
        // Update existing obstacle positions
        let idx;
        for (idx = 0; idx < this.obstacles.length; idx++){
            this.obstacles[idx].update();
        }

        // Scrolls background elements at varying rates
        this.ScrollBackground(delta);

    }

    // Adds obstacle to the game - collides with player, reachable via the obstacles[] array
    spawnObstacle(){
        let obstacle = new Obstacle(this, 660, game.config.height, this.obstacleSprite, 0, this.currentSpeed, this.obstacles[this.obstacles.length-1].scaleY, this.columnWidth);
        this.obstacles.push(obstacle);
        this.physics.add.collider(this.player, obstacle);
    }

    // Adds time to the score independent of frame rate
    increaseScore(delta){
        this.score += delta;
        this.scoreLeft.text = Math.round(this.score/100)/10; 
    }

    // changes pillar spawn speed, velocity, and width based on score
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
            this.obstacleSprite = "obstacle3";
        } else if (this.score >= this.MEDIUM_THRESHOLD && this.difficulty < 1){
            this.difficulty = 1;
            this.currentSpeed = 200;
            this.SPAWN_RATE = 800;
            this.columnWidth = 2;
            this.obstacleSprite = "obstacle2";
        }
    }

    gameOver(){
        this.registry.destroy(); // destroy registry
        this.events.off(); // disable all active events
        this.scene.restart(); // restart current scene
    }

    ScrollBackground(delta){
        this.back1.tilePositionX += this.scrollSpeeds[0]*delta;
        this.back2.tilePositionX += this.scrollSpeeds[1]*delta;
        this.back3.tilePositionX += this.scrollSpeeds[2]*delta;
        this.back4.tilePositionX += this.scrollSpeeds[3]*delta;
        this.back5.tilePositionX += this.scrollSpeeds[4]*delta;
        this.back6.tilePositionX += this.scrollSpeeds[5]*delta;
        this.back7.tilePositionX += this.scrollSpeeds[6]*delta;
    }

    
}
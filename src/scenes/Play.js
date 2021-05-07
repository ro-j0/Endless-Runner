class Play extends Phaser.Scene {

    constructor() {
        super("playScene");
    }

    preload() {
        
    }

    create() {
        // Create backdrop elements
        this.back7 = this.add.tileSprite(game.config.width/2, game.config.height-500, this.textures.get('backLayer7').width*3, this.textures.get('backLayer7').height, 'backLayer7').setOrigin(0.5, 0);
        this.back7.scaleX = 1.3;
        this.back7.scaleY = 1.3;
        this.sun = this.add.image(game.config.width/2-40, 140, 'sun').setOrigin(0.5, 0.5);
        this.sun.scaleX = 2;
        this.sun.scaleY = 2;
        this.back6 = this.add.tileSprite(0, game.config.height-180, this.textures.get('backLayer6').width, this.textures.get('backLayer6').height, 'backLayer6').setOrigin(0, 1);
        this.back5 = this.add.tileSprite(0, game.config.height-210, this.textures.get('backLayer5').width, this.textures.get('backLayer5').height, 'backLayer5').setOrigin(0, 1);
        this.back4 = this.add.tileSprite(0, game.config.height-120, this.textures.get('backLayer4').width, this.textures.get('backLayer4').height, 'backLayer4').setOrigin(0, 1);
        this.back3 = this.add.tileSprite(0, game.config.height-90, this.textures.get('backLayer3').width*1.3, this.textures.get('backLayer3').height*1.3, 'backLayer3').setOrigin(0, 1);
        this.back2 = this.add.tileSprite(0, game.config.height-60, this.textures.get('backLayer2').width*1.3, this.textures.get('backLayer2').height*1.3, 'backLayer2').setOrigin(0, 1);
        this.back1 = this.add.tileSprite(0, game.config.height, this.textures.get('backLayer1').width, this.textures.get('backLayer1').height, 'backLayer1').setOrigin(0, 1);
        this.back1.scaleX = 1.3;
        this.back1.scaleY = 1.3;

        if (!this.music){
            this.music = this.sound.add("music", {loop: true, volume: 0.5});
            this.deathMusic = this.sound.add("deathBackgroundSound", {loop: true, volume: 0.5});
            this.jumpSound = this.sound.add("jump", {loop: false, volume: 0.7});
            this.deathSound = this.sound.add("deathSound", {loop: false, volume: 0.7});
            this.UISound = this.sound.add("UISound", {loop: false, volume: 0.7});
            this.startSound = this.sound.add("startSound", {loop: false});
        }

        // Create camera object
        this.camera = this.cameras.add(0, 0, 1280, 700);
        
        // Play background music on loop
        this.music.play();

        // Play a hearty chicken noise to kick things off 
        this.startSound.play();

        // Setting scroll speeds for various parallax scrolling elements
        this.scrollSpeeds = [0.1, 0.08, 0.07, 0.05, 0.03, 0.01];

        // Create Player
        this.player = new Player(this, game.config.width/4 + 100, game.config.height - 240, 'spriteSheet').setOrigin(0.5,1);
        
        // Set world bounds
        this.physics.world.bounds.width = game.config.width;
        
        // Obstacle array, stores each obstacle that is shown on screen
        this.obstacles = [];

        // Keeps track of current obstacle sprite
        this.obstacleSprite = 'obstacle1';

        // Timer to keep track of when it's time to spawn another obstacle
        this.spawnTimer = 0;

        // Flag to stop updating game elements when player dies
        this.gameEnded = false;

        // Flag that pauses game while tutorial is active
        this.tutorialActive = true;


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

        // HARD (1:00-1:30): speed = 250, rate = 600, width = 1.2
        this.HARD_THRESHOLD = 60000;

        // GLITCH (1:30-INF): speed = 250, rate = 600, width = 1.2
        this.GLITCH_THRESHOLD = 90000;

        // Create the first obstacles, that form a forgiving platform
        let ob_idx;
        for (ob_idx = 0; ob_idx < 20; ob_idx++){
            // {72 * ob_idx} is hard coded; should be {obstacle.width * 3 * ob_idx}
            let obstacle = new Obstacle(this, game.config.width/2 + 72*(9-ob_idx), 640, this.obstacleSprite, 0, this.currentSpeed, 0, 3);
            this.obstacles.push(obstacle);
            this.physics.add.collider(this.player, obstacle);
        }

        // Create Score UI
        this.scoreConfig = {
            fontFamily: 'chuck',
            fontSize: '78px',
            color: '#faf5c8',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            }
        }
        
        // Add UI Element to the screen
        this.scoreLeft = this.add.text(40 , 20, this.score, this.scoreConfig).setOrigin(0, 0);

    }

    update(speed, delta) {
        // Do nothing if the game is over
        if (this.gameEnded){return;}

        // if (this.tutorialActive){
        //     if (this.checkForInput()){
        //         this.tutorialActive = false;
        //     }
        //     return;
        // }

        // Update the player
        this.player.update(delta);

        // Increase score by time since last frame
        this.increaseScore(delta);

        // Check if we're ready to increase difficulty
        this.increaseDifficulty();

        // Increase Timer variable by time since last frame
        this.spawnTimer += delta;

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

        // Check if the player is dead
        if (this.player.x <= 0 || this.player.y >= game.config.height + this.player.height){
            this.gameOver();
        }
    }

    checkForInput(){
        if(keyLEFT.isDown || keyRIGHT.isDown){
            return true;
        } else {
            return false;
        }
    }

    // Adds obstacle to the game - collides with player, reachable via the obstacles[] array
    spawnObstacle(){
        let obstacle = new Obstacle(this, game.config.width + 20, game.config.height, this.obstacleSprite, 0, this.currentSpeed, this.obstacles[this.obstacles.length-1].y, this.columnWidth);
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
        if (this.difficulty == 3){
            return;
        }
        if (this.score >= this.GLITCH_THRESHOLD && this.difficulty < 3){
            this.difficulty = 3;
            this.glitch();
        } else if (this.score >= this.HARD_THRESHOLD && this.difficulty < 2){
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

    glitch(){
        this.music.pause();
        this.music = this.sound.add("nmmusic", {loop: true, volume: 0.5});
        this.camera.setBackgroundColor('rgba(55,47,84, 1)');

        this.currentSpeed = 300;
        this.SPAWN_RATE = 600;
        this.columnWidth = 1;
        this.obstacleSprite = "obstacle4";

        // Remove previous Assets
        this.sun.destroy();
        this.back7.destroy();
        this.back6.destroy();
        this.back5.destroy();
        this.back4.destroy();
        this.back3.destroy();
        this.back2.destroy();
        this.back1.destroy();

        
        // Create Glitch Assets
        this.nmback = this.add.tileSprite(0, game.config.height, this.textures.get('nightmareBackground').width, this.textures.get('nightmareBackground').height, 'nightmareBackground').setOrigin(0, 1);
        this.nmback.scaleX = 1.5;
        this.nmback.scaleY = 1.5;
        this.nmback.setDepth(-3);
        this.player.setDepth(1);
        
        
        this.glitchAnim = this.add.sprite(game.config.width/2, game.config.height/2, 'glitchSheet').setOrigin(0.5, 0.5);
        this.glitchAnim.scaleX = 3.2;
        this.glitchAnim.scaleY = 3.2;
        this.glitchAnim.setDepth(-1);
        this.glitchAnim.anims.create({
            key: 'glitch', 
            repeat: 0,
            frames: this.anims.generateFrameNames('glitchSheet', {
                prefix: 'sprite',
                start: 5,
                end: 33,
            }),
            framerate: 30
        });
        this.glitchAnim.anims.play('glitch');
        this.clock = this.time.delayedCall(1300, () => {
            this.glitchAnim.destroy();
            this.music.play();
            this.sun = this.add.image(game.config.width/2-40, 140, 'nightmareSun').setOrigin(0.5, 0.5);
            this.sun.scaleX = 2;
            this.sun.scaleY = 2;
        }, null, this);
    }

    gameOver(){
        this.gameEnded = true;
        this.music.pause();
        this.music = this.sound.add("music", {loop: true, volume: 0.5});
        this.deathSound.play();
        this.deathMusic.play();
        this.endScreen = this.add.image(game.config.width/2, game.config.height/2, 'deathScreen').setOrigin(0.5, 0.5);
        this.endScreen.scaleX = 0.7;
        this.endScreen.scaleY = 0.7;
        this.endScoreConfig = {
            fontFamily: 'chuck',
            fontSize: '102px',
            color: '#faf5c8',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            }
        }
        this.endScore = this.add.text(265 , 80, Math.round(this.score/100)/10, this.endScoreConfig).setOrigin(0.5, 0);
        this.seconds = this.add.text(265 , 180, "seconds", this.endScoreConfig).setOrigin(0.5, 0);
        this.seconds.setFontSize(50);

        this.retry = this.add.text(265 , 350, "RETRY", this.endScoreConfig).setOrigin(0.5, 0);
        this.retry.setFontSize(72);
        this.retry.setInteractive();
        this.retry.on('pointerover', () => { enterButtonHoverState(this.retry); });
        this.retry.on('pointerout', () => { enterButtonRestState(this.retry); });
        this.retry.on('pointerdown', () => { 
            this.deathMusic.pause();
            this.restart(); 
        });
        this.exit = this.add.text(265 , 420, "MENU", this.endScoreConfig).setOrigin(0.5, 0);
        this.exit.setFontSize(72);
        this.exit.setInteractive();
        this.exit.on('pointerover', () => { enterButtonHoverState(this.exit); });
        this.exit.on('pointerout', () => { enterButtonRestState(this.exit); });
        this.exit.on('pointerdown', () => { 
            this.UISound.play();
            this.deathMusic.pause();
            this.scene.start("menuScene"); 
        });
    }

    restart(){
        this.registry.destroy(); // destroy registry
        this.events.off(); // disable all active events
        this.scene.restart(); // restart current scene
    }

    ScrollBackground(delta){
        if (this.difficulty == 3){
            this.nmback.tilePositionX -= 0.2*delta;
            return;
        }
        this.back1.tilePositionX += this.scrollSpeeds[0]*delta;
        this.back2.tilePositionX += this.scrollSpeeds[1]*delta;
        this.back3.tilePositionX += this.scrollSpeeds[2]*delta;
        this.back4.tilePositionX += this.scrollSpeeds[3]*delta;
        this.back5.tilePositionX += this.scrollSpeeds[4]*delta;
        this.back6.tilePositionX += this.scrollSpeeds[5]*delta;
        // this.back7.tilePositionX += this.scrollSpeeds[6]*delta;
    }

    
}
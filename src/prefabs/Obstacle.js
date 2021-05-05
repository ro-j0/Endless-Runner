class Obstacle extends Phaser.GameObjects.Sprite  {
    constructor(scene, x, y, texture, frame, speed, prevHeight, scaleWidth) {
        super(scene, x, y, texture, frame);

        // add object to scene
        scene.add.existing(this);

        // enable physics
        scene.physics.add.existing(this);


        // Default height: 640
        // Height step increse: 26 pixels
        // Height step decrease: 52 pixels

        this.body.velocity.x = -speed;

        this.body.immovable = true;
        this.body.allowGravity = 0;

        // Set up transforms so that the base is touching the ground, and scaling
        // Y does not affect location of the base
        //this.y = game.config.height;
        this.setOrigin(0, 0);

        this.scaleX = scaleWidth;
        this.scaleY = 1.5;

        // Handle first obstacle spawn: always the same height
        if (prevHeight == 0){
            this.y = 640;
            return;
        }

        // Randomize height of the following obstacles based on previous height
        let RNG = Math.random();
        if (RNG <= 0.4){
            // Reduce obstacle height
            if (prevHeight >= 588){
                this.y = prevHeight - 40;
            }
            else{
                this.y = prevHeight + 40;
            }
        } else if (RNG <= 0.60){
            // Keep obstacle height the same
            this.y = prevHeight;
        } else {
            // Increase obstacle height
            if (prevHeight <= 420){
                this.y = prevHeight + 40;
            }
            else{
                this.y = prevHeight - 40;
            }
        }

        
        
        //console.log();
        //console.log("previous height: " + prevScale+ ", this scale: " + this.scaleY + "\n");

        
    }
    
    update() {
        // Slide to the left every frame
        //this.x -= this.moveSpeed;

        // Despawn if reaching the left side of the screen
        if(this.x <= -this.width * this.scaleX){
            this.destroy();
        }
    }

    setSpeed(speed){
        this.body.velocity.x = -speed;
    }
}
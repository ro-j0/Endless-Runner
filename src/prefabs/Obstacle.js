class Obstacle extends Phaser.GameObjects.Sprite  {
    constructor(scene, x, y, texture, frame, speed, prevScale, scaleWidth) {
        super(scene, x, y, texture, frame);

        // add object to scene
        scene.add.existing(this);

        // enable physics
        scene.physics.add.existing(this);

        this.body.velocity.x = -speed;

        this.body.immovable = true;
        this.body.allowGravity = 0;

        // Set up transforms so that the base is touching the ground, and scaling
        // Y does not affect location of the base
        this.y = game.config.height;
        this.setOrigin(0, 1);

        this.scaleX = scaleWidth;

        // Handle first obstacle spawn: always the same height
        if (prevScale == 0){
            this.scaleY = 1.2;
            return;
        }

        // Randomize height of the following obstacles based on previous height
        let RNG = Math.random();
        if (RNG <= 0.4){
            // Reduce obstacle height
            if (prevScale <= 1.9){
                this.scaleY = prevScale + 0.4;
            }
            else{
                this.scaleY = prevScale - 0.8;
            }
        } else if (RNG <= 0.60){
            // Keep obstacle height the same
            this.scaleY = prevScale
        } else {
            // Increase obstacle height
            if (prevScale >= 3.1){
                this.scaleY = prevScale - 0.8;
            }
            else{
                this.scaleY = prevScale + 0.4;
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
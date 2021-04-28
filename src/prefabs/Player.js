class Player extends Phaser.GameObjects.Sprite {
    
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to scene
        scene.add.existing(this);

        // enable physics
        scene.physics.add.existing(this);

        this.jumpTime = 0;
        this.moveSpeed = 200;
        this.JUMP_RATE = 1500;
    }
    
    update(delta) {
        // Player movement

        if(keyLEFT.isDown && this.x >= 0) {
            this.body.velocity.x = -this.moveSpeed;
        } else if (keyRIGHT.isDown && this.x <= game.config.width - this.width) {
            this.body.velocity.x = this.moveSpeed;
        } else {
            this.body.velocity.x = 0;
        }

        if (this.jumpTime <= 0)
        {
            this.body.setVelocityY(-300); // jump up
            this.jumpTime = this.JUMP_RATE;
        }

        this.jumpTime -= delta;
    }

    setJumpRate(value){
        this.JUMP_RATE = value;
    }
}
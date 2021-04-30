class Player extends Phaser.GameObjects.Sprite {
    
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to scene
        scene.add.existing(this);

        // enable physics
        scene.physics.add.existing(this);

        
        this.moveSpeed = 200;
        this.jumpHeight = 300;
        this.JUMP_RATE = 1500;
        this.jumpTime = this.JUMP_RATE/2;
        
        // Duration of squish animation prior to jump
        this.SQUISH_DURATION = 250;

        // Flag so that the animation plays once per jump
        this.hasSquished = false;

        this.jumping = false;
    }
    
    update(delta) {
        // Player movement

        if (!this.jumping && this.body.touching.down){
            this.jumping = true;
            this.Jump();
        }
            
        if(keyLEFT.isDown && this.x >= 0) {
            this.body.velocity.x = -this.moveSpeed;
        } else if (keyRIGHT.isDown && this.x <= game.config.width - this.width) {
            this.body.velocity.x = this.moveSpeed;
        } else {
            this.body.velocity.x = 0;
        }

        

        // if (this.jumpTime <= 0)
        // {
        //     this.Jump();
        //     this.hasSquished = false;       // Reset animation flag
        //     this.jumpTime = this.JUMP_RATE; // Reset jump timer
        // }
        // if (this.jumpTime <= this.SQUISH_DURATION && !this.hasSquished){
        //     this.indicateJump();
        // }

        // this.jumpTime -= delta;
    }

    

    Jump(){
        //this.jumping = true;
        console.log("jump called.");
        this.indicateJump();
        this.clock = this.scene.time.delayedCall(this.SQUISH_DURATION-1, () => {
            this.body.setVelocityY(-this.jumpHeight);   // jump up
            this.jumping = false;
        }, null, this);
        
        
    }

    setJumpRate(value){
        this.JUMP_RATE = value;
    }

    indicateJump(){
        //this.hasSquished = true;
        this.scene.tweens.add({
            targets     : this,
            scaleY: 0.7,
            ease        : Phaser.Math.Easing.Sine.Inout,
            duration    : this.SQUISH_DURATION/2,
            yoyo        : true,
            repeat      : 0,
            callbackScope   : this
          });
    }
}
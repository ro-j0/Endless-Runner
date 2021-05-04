class Player extends Phaser.GameObjects.Sprite {
    
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to scene
        scene.add.existing(this);

        // enable physics
        scene.physics.add.existing(this);

        this.anims.create({
            key: 'flying', 
            repeat: -1,
            frames: this.anims.generateFrameNames('spriteSheet', {
                prefix: 'fly',
                start: 1,
                end: 6,
            }),
            framerate: 10
        });
        this.anims.create({
            key: 'hopping', 
            repeat: -1,
            frames: this.anims.generateFrameNames('spriteSheet', {
                prefix: 'hop',
                start: 1,
                end: 6,
            }),
            framerate: 10
        });
        this.anims.play('hopping');

        
        this.moveSpeed = 200;
        this.jumpHeight = 300;
        this.JUMP_RATE = 1500;
        this.jumpTime = this.JUMP_RATE/2;

        this.scaleX = 2;
        this.scaleY = 2;
        
        // Duration of squish animation prior to jump
        this.SQUISH_DURATION = 250;

        // Flag so that the animation plays once per jump
        this.hasSquished = false;

        this.jumping = false;
    }
    
    update(delta) {
        // Player movement

        if (!this.jumping){
            if (this.body.touching.down){
                this.jumping = true;
                this.Jump(); 
            }
            if(keyLEFT.isDown && this.x >= 0) {
                this.body.velocity.x = -this.moveSpeed;
                this.flipX = true;
            } else if (keyRIGHT.isDown && this.x <= game.config.width - this.width) {
                this.body.velocity.x = this.moveSpeed;
                this.flipX = false;
            } else {
                this.body.velocity.x = 0;
                this.flipX = false;
            }
        } else {
            this.body.velocity.x = 0;
            this.flipX = false;   
        }
    }

    

    Jump(){
        this.indicateJump();
        this.anims.play('hopping');

        this.scene.jumpSound.play();
        this.clock = this.scene.time.delayedCall(this.SQUISH_DURATION-1, () => {
            this.body.setVelocityY(-this.jumpHeight);   // jump up
            this.anims.play('flying');
            this.jumping = false;
        }, null, this);
        
        
    }

    setJumpRate(value){
        this.JUMP_RATE = value;
    }

    indicateJump(){
        this.scene.tweens.add({
            targets     : this,
            scaleY: 1,
            ease        : Phaser.Math.Easing.Sine.Inout,
            duration    : this.SQUISH_DURATION/2,
            yoyo        : true,
            repeat      : 0,
            callbackScope   : this
          });
    }
}
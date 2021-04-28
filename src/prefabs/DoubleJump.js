class DoubleJump extends Phaser.GameObjects.Sprite  {
    constructor(scene, x, y, texture, frame, speed) {
        super(scene, x, y, texture, frame);

        // add object to scene
        scene.add.existing(this);

        // enable physics
        scene.physics.add.existing(this);

        this.body.velocity.x = -speed;

        this.body.immovable = true;
        this.body.allowGravity = 0;

        this.game.physics.arcade.overlap(this, scene.player, this.Collect(), null, this);
    }

    Collect(){
        this.scene.player.Jump();
        this.destroy();
    }
}
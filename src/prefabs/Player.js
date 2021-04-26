class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to scene
        scene.add.existing(this);
        this.jumpTime = 1000;
        this.moveSpeed = 5;
    }

    update() {
        if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
            this.x -= this.moveSpeed;
        } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
            this.x += this.moveSpeed;
        }
    }
}
class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to scene
        scene.add.existing(this);
        this.jumpTime = 1000;
        this.moveSpeed = 5;
    }

    update() {
        // Player movement

        if(keyLEFT.isDown && this.x >= 0) {
            this.x -= this.moveSpeed;
        } else if (keyRIGHT.isDown && this.x <= game.config.width - this.width) {
            this.x += this.moveSpeed;
        }

        // Check for bounds and game over
        if(this.x <= 0){
            console.log("Game Over");
        }


    }
}
class Obstacle extends Phaser.GameObjects.Sprite  {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to scene
        scene.add.existing(this);

        // enable physics
        scene.physics.add.existing(this);

        this.moveSpeed = 2;
    }
    
    update() {
        // Player movement
        this.x -= this.moveSpeed;

        // Check for bounds and game over
        if(this.x <= 0){
            this.destroy();
        }

    }
}
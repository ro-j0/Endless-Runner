// Configure the specs for the game canvas

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height : 480, 
    backgroundColor: "#00ffff",
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 500 }
        }
    },
    scene: [Play]
}

// Configure the game to the specs 

let game = new Phaser.Game(config);

// reserve key bindings

let keyLEFT, keyRIGHT;
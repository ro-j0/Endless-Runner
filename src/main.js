// Configure the specs for the game canvas

let config = {
    type: Phaser.WEBGL,
    width: 640,
    height : 480, 
    backgroundColor: "#ffffff",
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 500 }
        }
    },
    scene: [Play]
}

// Configure the game to the specs 

let game = new Phaser.Game(config);

// reserve key bindings

let keyLEFT, keyRIGHT;
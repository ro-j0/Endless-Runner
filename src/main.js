// Configure the specs for the game canvas

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height : 480, 
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 150 }
        }
    },
    scene: [Play]
}

// Configure the game to the specs 

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 30;
let borderPadding = borderUISize / 3;

// reserve key bindings

let keyLEFT, keyRIGHT;
// Configure the specs for the game canvas

let config = {
    type: Phaser.WEBGL,
    width: 1280,
    height : 720, 
    backgroundColor: "#8aa179",
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 500 }
        }
    },
    scene: [Menu, Credits, Play],
}

// Configure the game to the specs 

let game = new Phaser.Game(config);

// reserve key bindings

let keyLEFT, keyRIGHT;

function loadFont(name, url) {
    var newFont = new FontFace(name, `url(${url})`);
    newFont.load().then(function (loaded) {
        document.fonts.add(loaded);
    }).catch(function (error) {
        return error;
    });
}

function enterButtonHoverState(button) {
    button.setStyle({ color: '#525e4a'});
  }

function enterButtonRestState(button) {
    button.setStyle({ color: '#faf5c8' });
}
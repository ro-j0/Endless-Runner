// Hen Hop
// An Endless Runner made by:
// Stryker Buffington, Lauren Nakamura, and Rohan Jhangiani
// Version 1.0 Completed: May 3rd

// Creative Tilt Justification

// Some interesting technical aspects of our game include:
//      - Tweening player scale when they collide with the ground
//      - Collision Detection with top of obstacles, not the sides
//      - Delayed call to an Automatic Jump function when player touches the ground

// Hen Hop's Visual Style was 100% original artwork, and we are all very 
// proud of how it turned out visually, from the 6 layers of parallax 
// backgrounds to the intricate pixel art and player animations. The music
// was also originally composed.



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
    scene: [Menu, Tutorial, Credits, Play],
}
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
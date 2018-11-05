// Forked from: https://github.com/lostdecade/simple_canvas_game
// Create the canvas
//var canvas = document.createElement("canvas");
var canvas = document.getElementById('c');
var ctx = canvas.getContext("2d");
//canvas.width = 512;
//canvas.height = 480;
//document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/games/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/games/hero.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/games/monster.png";

// Game objects
var hero1 = {
	speed: 256 // movement in pixels per second
};
var hero2 = {
	speed: 256 // movement in pixels per second
};
var monster = {};
var monstersCaught1 = 0;
var monstersCaught2 = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a monster
var reset = function () {
	hero1.x = canvas.width / 2 - 16;
	hero1.y = canvas.height / 2;
        
        hero2.x = canvas.width / 2 + 16;
	hero2.y = canvas.height / 2;

	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 128));
	monster.y = 32 + (Math.random() * (canvas.height - 128));
};

// Update game objects
var update = function (modifier) {
        //player 1 controls 
	if (38 in keysDown) { // Player holding up
		hero1.y -= hero1.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
		hero1.y += hero1.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		hero1.x -= hero1.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		hero1.x += hero1.speed * modifier;
	}
        
        //player 2 controls
        if (87 in keysDown) { // Player holding up
		hero2.y -= hero2.speed * modifier;
	}
	if (83 in keysDown) { // Player holding down
		hero2.y += hero2.speed * modifier;
	}
	if (65 in keysDown) { // Player holding left
		hero2.x -= hero2.speed * modifier;
	}
	if (68 in keysDown) { // Player holding right
		hero2.x += hero2.speed * modifier;
	}

	// Are they touching?
	if (
		hero1.x <= (monster.x + 32)
		&& monster.x <= (hero1.x + 32)
		&& hero1.y <= (monster.y + 32)
		&& monster.y <= (hero1.y + 32)
	) {
		++monstersCaught1;
		reset();
	}
        if (
		hero2.x <= (monster.x + 32)
		&& monster.x <= (hero2.x + 32)
		&& hero2.y <= (monster.y + 32)
		&& monster.y <= (hero2.y + 32)
	) {
		++monstersCaught2;
		reset();
	}
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero1.x - 16, hero1.y);
                ctx.drawImage(heroImage, hero2.x + 16, hero2.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Player1 caught: " + monstersCaught1, 32, 0);
        ctx.fillText("Player2 caught: " + monstersCaught2, 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();
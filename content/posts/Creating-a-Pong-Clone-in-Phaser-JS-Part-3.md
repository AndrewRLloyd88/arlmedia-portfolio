---
title: 'Creating a Pong Clone in Phaser JS Part 3'
date: 2020-11-28T16:44:32-08:00
draft: false
tags: ['PhaserJS', 'JavaScript', 'Pong', 'Development']
---

![](/images/blog-images/pong-pt3/4250119467_ecbbfbce0d_b.jpg#header)

<!--more-->

Continuing on from [Part 1](/posts/creating-a-pong-clone-in-phaser-js-part-1/) and [Part 2](/posts/creating-a-pong-clone-in-phaser-js-part-2/), Part 3 will be focused on:

- Adding and detecting scores
- Indicating which side a player starts on via colours
- Serving the ball from a player perspective
- Serving the ball from beginning of the game
- Serving the ball once scored against
- Game over condition

Referring to the user stories for the Mintbean.io Pong hackathon I find it logical as a developer to group sets of core requirement user stories together to tackle in a logical way:

> _As a user, I can see that if a ball misses a paddle the opposing side will get a point_
>
> _As a user, If someone scores 7 points they will will win the game_
>
> _As a user, the court will appear and an Indication as of which side I am on will be shown_
>
> _As a user, I will start with the ball, to serve I shall press either the left or right arrow key to serve based on court position_
>
> _As a user, after I serve I will see the ball travel across the court_

I’m going to first work on implementing the scores and having them display to tackle the requirement for a score and also to indicate which player is which to and end user:

### Adding the scores

The first thing I want to do is to add a visual representation of the score to the game view.

There are two primary ways to include scores in Phaser, either via Text or Bitmap. Text is the simpler way as bitmap relies on having a texture file as well as an XML or JSON file to parse the character positions. For this example I will use the text method.

First declare some variables to hold our text score for Player 1 and Player 2:

```javascript
let score1_text;

let score2_text;
```

In the create method we can add a text object to add our two scores to the game world.

```javascript
score1*text = \_this*.add.text(128, 10, “0”, {
font: “64px Gabriella”,

fill: “#FF0000”,

align: “center”,

});

score2*text = \_this*.add.text(672, 10, “0”, {

font: “64px Gabriella”,

fill: “#0000FF”,

align: “center”,

});
```

The fourth property is an object that you can use to declare your font, fill color and alignment. For now I have set the colors to be #FF0000 or red and #0000FF for blue.

For the positioning the scores will be placed at 128 and 672 in the X axis and 10 in the Y axis.

The result looks like this:

| ![](/images/blog-images/pong-pt3/0_UYTghCYnlJ0D7o5k.png) |
| :------------------------------------------------------: |

### Scoring Goals

The scores don’t do anything right now, and they must score whenever one or the other player misses the ball, so we can declare two variables to hold both players’ scores:

```javascript
let score1;

let score2;

And set the scores in the create() function:

//set scores

score1 = 0;

score2 = 0;
```

In the update() function we can set score1_text and score2_text to equal our score values:

```javascript
//setting score text to be value of our scores

score1_text.text = score1;

score2_text.text = score2;
```

And then we can add some conditional logic within our update() to check if the ball has collided with either the left or right side of the board:

```javascript
//check to see if the ball collides with left or right
if (ball.body.blocked.left) {
  score2++;
} else if (ball.body.blocked.right) {
  score1++;
}
```

If the left side is hit by the ball player 2’s score will increase, and if the right side is hit player 1’s score will increase:

The result should look like this:

| ![](/images/blog-images/pong-pt3/1_JWuCuPt7fQVA40g1W32mbA.gif) |
| :------------------------------------------------------------: |

I made a slight modification to the ball in this instance with the following line:

```javascript
ball.setScale(1.5, 1.5);
```

As we can see the score is increasing on both sides, however we are lacking a reset function and it can be somewhat tricky right now to score past the ultra defensive CPU. We also need a way of addressing the identity of the player so it is clear to know which side is which.

```javascript
//draw player respective text

p1Text = _this_.add.text(40, 20, “P1:”, {

font: “48px Gabriella”,

fill: “#FF0000”,

align: “center”,

});

cpuText = _this_.add.text(550, 20, “CPU:”, {

font: “48px Gabriella”,

fill: “#0000FF”,

align: “center”,

});
```

Resulting in this:

| ![](/images/blog-images/pong-pt3/0_4pyN2TjuLpy6Dz_k.png) |
| :------------------------------------------------------: |

Now players will definitely have an indication of who’s who on the field!

### Serving the ball

Right now the ball just kind of randomly spawns and moves from the center point, we want to be able to serve the ball as per the requirements the user should press the right key to serve it. There are many ways to tackle this, the simplest of which being, placing the ball statically and using the player bat to “serve”

I set up a function called resetSceneWhenP1Scores()

```javascript
//this function resets the playfield if P1 scores

const resetSceneWhenP1Scores = () => {
  console.log(paddleP1);

  let x = 0;

  let y = 0;

  //reset the paddles position

  paddleP1.body.x = 10;

  paddleP1.body.y = 300;

  paddleP2.body.x = 790;

  paddleP2.body.y = 300;

  //set players velocity to 0,0

  paddleP1.setVelocity(x, y);

  // paddleP2.body.velocity = 0;

  //reset the balls position

  ball.body.x = 700;

  ball.body.y = 300;

  //set balls velocity to 0,0

  ball.setVelocity(0, 0);
};
```

The logic basically resets the position of both paddles, the ball and sets the players’ velocity to 0 upon scoring.

The function can be called in the conditional block checking if the ball has collided with the right side:

```javascript

} else if (ball.body.blocked.right) {

score1++;

resetSceneWhenP1Scores();

}
```

We end up with a result that looks like this:

| ![](/images/blog-images/pong-pt3/0_ndWQ0BYh3wT6Gtwb.png) |
| :------------------------------------------------------: |

Great the scene is set up for the next round! We can duplicate this logic by recreating the function for when Player2 scores, changing the position of the ball to where player 1 is:

```javascript
//this function resets the playfield if P2 scores

const resetSceneWhenP2Scores = () => {
  console.log(paddleP1);

  let x = 0;

  let y = 0;

  //reset the paddles position

  paddleP1.body.x = 10;

  paddleP1.body.y = 300;

  paddleP2.body.x = 790;

  paddleP2.body.y = 300;

  //set players velocity to 0,0

  paddleP1.setVelocity(x, y);

  // paddleP2.body.velocity = 0;

  //reset the balls position

  ball.body.x = 100;

  ball.body.y = 300;

  //set balls velocity to 0,0

  ball.setVelocity(0, 0);
};

if (ball.body.blocked.left) {
  score2++;

  resetSceneWhenP2Scores();
} else if (ball.body.blocked.right) {
  score1++;

  resetSceneWhenP1Scores();
}
```

however at this stage there is a problem, if player 1 scores there is no mechanism to stop player 1 charging over to player 2's side and stealing their launch, and with a human player 2 vice versa. As player 2 (CPU) only moves following the ball’s velocity this should not be a problem with the CPU. A mechanism should be adds a state that can check if the ball is launched which disables movement for the opposite player. When the ball is launched we can change this state to true, which will enable controls for both sides, until a point is scored and the scene reset which would switch our launched check and our disabled controls back to false.

Let’s start by adding a state at the top of the file:

```javascript

ball_launched = false;

This should be set to false by default

The following three variables should be created also:

let p1scored = false;

let p2scored = false;

let firstLaunch = true;
```

We need to track if the ball launch is with the score at 0–0. The firstLaunch variable will only be used once in this instance. The p1scored and p2scored variables can be used as a quick toggler to check which player scored when the conditional logic is written to check what to do after a reset.

Inside of the update function I created a launch_ball function which has a block of conditional checks nested inside of a primary conditional check

The first if statement checks to see if the ball has not been launched, at the start of a new round this check should always be true. At this point we want to disable the player controls by setting the player’s maxVelocity at this point to 0

```javascript
const launch_ball = () => {

if (!ball_launched) {

paddleP1.body.maxVelocity.x = 0;

paddleP1.body.maxVelocity.y = 0;
```

The three conditions or states of our game we need to check is as follows

```javascript

if (cursors.right.isDown && p2scored) {

ball.setBounceY(Phaser.Math.FloatBetween(0.5, 0.9));

ball.setVelocityX(100);

ball.setVelocityY(150 — Math.random() \* 400);

paddleP1.body.maxVelocity.x = 250;

paddleP1.body.maxVelocity.y = 250;

p2scored = false;

return (ball_launched = true);

}

if (cursors.right.isDown && firstLaunch) {

ball.setBounceY(Phaser.Math.FloatBetween(0.5, 0.9));

ball.setVelocityX(100);

ball.setVelocityY(150 — Math.random() \* 400);

paddleP1.body.maxVelocity.x = 250;

paddleP1.body.maxVelocity.y = 250;

firstLaunch = false;

return (ball_launched = true);

}

if (p1scored) {

setTimeout(() => {

paddleP1.body.maxVelocity.x = 250;

paddleP1.body.maxVelocity.y = 250;

p1scored = false;

ball.setBounceY(Phaser.Math.FloatBetween(0.5, 0.9));

ball.setVelocityX(-100);

ball.setVelocityY(150 — Math.random() \* 400);

}, 2000);

return (ball_launched = true);

}
```

We call the function directly after declaring it as the first action in Update()

```javascript
launch_ball();
```

We now need to update our score checker and set the variable to true for the corresponding scorer

```javascript
if (ball.body.blocked.left) {
  score2++;

  resetSceneWhenP2Scores();

  p2scored = true;

  ball_launched = false;
} else if (ball.body.blocked.right) {
  score1++;

  resetSceneWhenP1Scores();

  p1scored = true;

  ball_launched = false;
}
```

| ![](/images/blog-images/pong-pt3/0_nyf6qLfN-SnNTvea.gif) |
| :------------------------------------------------------: |

### Finishing the game

To win the game first we need some win screens to go to.

For for sake of expedience for the hackathon I decided the easiest way to go about managing end game conditions was to going to duplicate the existing WinScreen.js file three times inside the same directory using the following naming conventions:

Cpuwins.js, P1Wins.js, P2wins.js

The first thing to do with CPU wins is to rename the key as each scene inside Phaser has to have a unique key, this one I named cpuwinscreen

```javascript
import Phaser from “phaser”;

let graphics;

let cursors;

export default new Phaser.Class({

Extends: Phaser.Scene,

initialize: function () {

Phaser.Scene.call(_this_, { key: “cpuwinscreen” });

},

create: function () {

cursors = _this_.input.keyboard.createCursorKeys();

graphics = _this_.add.graphics();

graphics.fillStyle(0x000000, 1);

graphics.fillRect(0, 0, 800, 600);

_this_.add.text(300, 300, “CPU Wins!”, {

font: “48px Gabriella”,

fill: “#0000FF”,

align: “center”,

});

},

update: function () {

setTimeout(() => {

_this_.scene.start(“mainmenu”);

}, 3000);

},

});
```

I modified the file by adding another text object with different properties on to colour coordinate the win screen text. I also used a setTimeout function in the update to return to the main menu scene after three seconds. I repeated the same process for the P1 and P2 win screens.

To use the new scenes We must import our scenes into index.js as follows:

```javascript

import Phaser from “phaser”;

import MainMenu from “./scenes/MainMenu”;

import Game from “./scenes/Game”;

import P1wins from “./scenes/P1wins”;

import P2wins from “./scenes/P2wins”;

import Cpuwins from “./scenes/Cpuwins”;

// Resolution setting for the game

const resolution = {

width: 800,

height: 600,

};

// Configuration for phaser

const config = {

type: Phaser.AUTO,

width: resolution.width,

height: resolution.height,

physics: {

default: “arcade”,

},

scene: \[MainMenu, Game, P1wins, P2wins, Cpuwins\],

};

const game = new Phaser.Game(config);
```

We also need to add the scenes into the scene: array so that Phaser knows how to access and reference them in the scene object.

The next change I made was in the Game.js file. A win condition is needed in the game instance to check for a win at 7 points with a simple equality check and the logic would move the scene on to the winners’ respective screen.

```javascript

const checkWin = () => {

if (score1 === 7) {

_this_.scene.start(“p1winscreen”);

}

if (score2 === 7) {

_this_.scene.start(“cpuwinscreen”);

}

return;

};
```

If I would have had more time to optimise the win screens ideally I would have found a way to pass a value onto one win screen and make the content dynamic to save the amount of repetition of files and code in the project.

When the player or CPU reaches 7 points the results will look as follows with the added logic:

| ![](/images/blog-images/pong-pt3/0_0KlGcu_w6GrU5ocV.png) |
| :------------------------------------------------------: |

| ![](/images/blog-images/pong-pt3/0_7KxBmHSaYZL_jWs4.png) |
| :------------------------------------------------------: |

This wraps up part 3 of the technical writeup for PhaserPong. Part 4 will cover:

- Add a second player game mode
- More menus and scenes
- Changes to 2nd player physics and velocity limitations

[You can find the progress on the repo for the project here](https://github.com/AndrewRLloyd88/pong-hackathon)

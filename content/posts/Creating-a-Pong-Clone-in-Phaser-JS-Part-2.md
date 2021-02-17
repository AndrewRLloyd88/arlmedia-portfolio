---
title: 'Creating a Pong Clone in Phaser JS Part 2'
date: 2020-11-25T16:44:27-08:00
draft: false
tags: ['PhaserJS', 'JavaScript', 'Pong', 'Development']
---

![](/images/blog-images/pong-pt2/1_VjYPM6gxld_xS-EN1L_pRA.jpeg#header)

<!--more-->

Continuing on from [Part 1 getting started with Phaser.JS](/posts/creating-a-pong-clone-in-phaser-js-part-1/) and making the modifications today’s post will be focused on the addition of a second paddle and writing some code for an AI, replacing the star sprite with a ball and adding a couple of sound effects.

### Making the AI Paddle

Switch around the paddle position so red is left and blue is right

One of the first changes to be made is to change the side the paddle is on. True to video game conventions it makes more sense for our P1 player controlled panel to be on the left of the screen and for the P2 controlled panel be it AI or a human to be on right of the screen.

blue to have some programmable AI that follows the ball.

Following the project user stories a core requirement is: _As a user, the court will appear and an Indication as of which side I am on will be shown_

I would like to indicate this by colour coordinating our players, name, score and paddle color to indicate that clearly.

I will start off by editing the game.js file inside of scenes.

```Javascript
//declaring our P1 controlled paddle at X 10 and Y 300 (half of our canvas size)

paddleP1 = _this_.physics.add.image(10, 300, “paddle1”);
```

This results in the following change below! Looking good!

| ![](/images/blog-images/pong-pt2/0_NyKiAGjpIP2T-GEu.png) |
| :------------------------------------------------------: |

Next I want to add in the blue paddle. It will be a very similar process as importing and declaring the red paddle to get the asset into the gameworld [(see part 1 of the writeup)](/posts/creating-a-pong-clone-in-phaser-js-part-1/)

```Javascript
import paddle2 from “../assets/paddle2.png”;

let paddleP2;

preload: function preload() {

_this_.load.image("bg", bg);

_this_.load.image("paddle1", paddle1);

_this_.load.image("paddle2", paddle2);

_this_.load.image("star", star);

},

create: function create() {

_this_.add.image(400, 300, "bg");

_this_.add.image("paddle1", paddle1);

_this_.add.image("paddle2", paddle2)

//declaring our P2 controlled paddle at X 790 (right side of canvas) and Y 300 (half of our canvas size)

paddleP2 = _this_.physics.add.image(790, 300, "paddle2");

//setting paddleP1 bounce

paddleP2.setBounce(1, 1);

//set worldcollisionbounds for P1 so it can't leave the playing field

paddleP2.setCollideWorldBounds(true);
```

After this is done the result looks like this:

| ![](/images/blog-images/pong-pt2/0__guhWTZgUDIOu9vC.png) |
| :------------------------------------------------------: |

Both of our paddles are now in play, although the blue paddle at this stage to be controlled by the AI is lifeless.

### Replace the Star Sprite with a ball

The goal of this section is to replace the star as pretty as it is with a ball, something a bit more pong like! We can do this simply by following the same idea as putting in the paddles:

```Javascript
import ballimg from “../assets/ball.png”;

let ball;
```

| ![](/images/blog-images/pong-pt2/1_c275N3Ru9JTeDFud3LUKZA.png) |
| :------------------------------------------------------------: |

### Implementing AI

An AI can be implemented many different ways, you could set the AI to target a specific object in this case the ball, you could make the AI move randomly or erratically, you could mimic the player’s movements and velocity but in this case I have decided to try mimicking the balls Velocity instead. The theory would be if the ball is travelling towards the CPU paddle it should move at the opposite rate of its X position whilst following it on the Y position. To do this some logic has to be written in our update function:

```Javascript
//CPU logic — mimic the balls velocity on the Y axis

paddleP2.body.setVelocity(ball.body.velocity.y);

//move in the opposite X direction at half the speed (tweak for higher CPU difficulty)

paddleP2.body.velocity.x = -ball.body.velocity.x \* 0.5;

//limit the max Y velocity

paddleP2.body.maxVelocity.y = 250;

//limit the max X velocity

paddleP2.body.maxVelocity.X = 250;

//update ball bounce per frame

ball.setBounce(1, 1);
```

The result is as follows:

| ![](/images/blog-images/pong-pt2/1_yXh4cMTgWh5vLQqHCuS0QQ.gif) |
| :------------------------------------------------------------: |

There are still some issues to fix such as the ball velocity slowing down, no collision between paddles, the AI not really chasing the ball too hard meaning the player has to risk moving away from the goal but for now this serves as a good basis. For now I think this offers a good balance of skill, challenge and being able to score against the CPU!

### Add Some Sound Effects

Now we have that working we want to be able to play sounds every time the paddles touch the ball. In traditional pong style I shall keep these to simple blips. A good resource for our blip sounds will come from freesound.org. Find the link for the two blips I am using below:

[https://freesound.org/people/NoiseCollector/sounds/4390/](https://freesound.org/people/NoiseCollector/sounds/4390/)

[https://freesound.org/people/NoiseCollector/sounds/4391/](https://freesound.org/people/NoiseCollector/sounds/4391/)

Now to import the sounds into the phaser-js-gh-pages/src/assets directory

| ![](/images/blog-images/pong-pt2/0_0DWwybl2O1y_ST3s.png) |
| :------------------------------------------------------: |

Start by importing the assets at the top of the file

```Javascript
import blip1 from “../assets/4390\_\_noisecollector\_\_pongblipf-4.wav”;

import blip2 from “../assets/4391\_\_noisecollector\_\_pongblipf-5.wav”;
```

Include them in the preload function with load.audio method:

```Javascript
preload: function preload() {

_this_.load.image(“bg”, bg);

_this_.load.image(“paddle1”, paddle1);

_this_.load.image(“paddle2”, paddle2);

_this_.load.image(“ballimg”, ballimg);

_this_.load.audio(“blip1”, blip1);

_this_.load.audio(“blip2”, blip2);
```

Then we need to set up a second processCollision function so that both of our paddles when connecting with the ball can make a different blip:

```Javascript
const processCollision = (paddleP1, ball) => {

ball.setBounceY(Phaser.Math.FloatBetween(0.5, 0.8));

ball.setBounce(1, 1);

_this_.sound.play(“blip2”);

};

const processCollision2 = (paddleP2, ball) => {

ball.setBounceY(Phaser.Math.FloatBetween(0.5, 0.8));

ball.setBounce(1, 1);

_this_.sound.play(“blip1”);

};
```

Then remember to set the second paddles physics collider to use the new processColision 2 function:

```Javascript
_this_.physics.add.collider(ball, paddleP1, processCollision, null, _this_);

//adding collision detection for paddleP2 and the star

_this_.physics.add.collider(ball, paddleP2, processCollision2, null, _this_);
```

The result can be heard and seen in this video here:

[https://www.youtube.com/watch?v=nz48EatphUU](https://www.youtube.com/watch?v=nz48EatphUU)

This concludes part 2 of the technical writeup. Part 3 will focus on:

- Adding and detecting scores
- Indicating which side a player starts on via colours
- Serving the ball from a player perspective
- Serving the ball from beginning of the game
- Serving the ball once scored against
- Game over condition

[You can find the progress on the repo for the project here](https://github.com/AndrewRLloyd88/pong-hackathon)

---
title: 'Building a Beat Machine With React'
date: 2020-12-03T18:17:12-08:00
draft: false
tags: ['React', 'Development', 'JavaScript', 'Development', 'HowlerJS']
---

![](/images/blog-images/beat-machine/1_LjKIZSKxt0YPEniUmR1NsA.gif#header.width-800)

<!--more-->

#### [Mintbean Campus JavaScript Playoffs: Build a Beat Machine](https://mintbean.io/meets/39f3b1cb-967d-4dc9-9195-c6da68059f7e)

Recently I completed my third hackathon with [Mintbean.io](https://mintbean.io/). The challenge was to build a Beat Machine in 1 week. The application had to be a front end web application, no backend or server/serverless components were allowed to be used.

You can play with BeatJuice here 👉 :[BeatJuice App](https://beatjuice.netlify.app/)

The tech stack that was used was [#JavaScript](https://www.linkedin.com/feed/hashtag/?keywords=javascript&highlightedUpdateUrns=urn%3Ali%3Aactivity%3A6740194865679859712) [#reactjs](https://www.linkedin.com/feed/hashtag/?keywords=reactjs&highlightedUpdateUrns=urn%3Ali%3Aactivity%3A6740194865679859712) [#HowlerJS](https://www.linkedin.com/feed/hashtag/?keywords=howlerjs&highlightedUpdateUrns=urn%3Ali%3Aactivity%3A6740194865679859712) [#MaterialUI](https://www.linkedin.com/feed/hashtag/?keywords=materialui&highlightedUpdateUrns=urn%3Ali%3Aactivity%3A6740194865679859712) & [#FeaturePeek](https://www.linkedin.com/feed/hashtag/?keywords=featurepeek&highlightedUpdateUrns=urn%3Ali%3Aactivity%3A6740194865679859712)

## BeatJuice in action

One of the first things we implemented as a group was a pull request workflow using gh pr create ([github CLI](https://cli.github.com/manual/gh_pr_create)):

| ![](/images/blog-images/beat-machine/1_6HGHQ0ILdi-Mjwb4qzbKdg.png) |
| :----------------------------------------------------------------: |

This was a hugely beneficial workflow to follow as it gave each other a chance to review our code collectively and approve and fix merge conflicts ahead of time.

I also continued learning React and setting state using setInterval. One of the trickier aspects of the project was setting up the playhead and synchronising this with the playback of the music.

Something I would like to improve on is the modularity of code and passing props and state around. A lot of times with a project my intention is to make different components and keep the modular however one file always seems to take most of the load.

|                             ![](/images/blog-images/beat-machine/1_8gPT6VvuYcLqgomag9usnA.png)                              |
| :-------------------------------------------------------------------------------------------------------------------------: |
| _Long files! Okay for a hackathon but not following the single responsibility principle well! I want to improve upon this._ |

Originally I wanted to separate the BeatTracker component (playhead) and the patches however the issue was the counter couldn’t be passed down as props as it was just sticking on 0 and not iterating up. I think that was due to the setInterval logic acting too quickly dependent on the tempo.

```javascript
//gets index position and assigns that to setSquares

const playHeadLoop = () => {
  //make a shallow copy of the pattern

  let pattern = [...squares];

  //make a shallow copy of the mutable object

  let position = squares[animCount];

  //replace the 0 with a 1

  position = 1;

  pattern[animCount] = position;

  setSquares(pattern);

  //get the square to animate

  let squareToAnimate = document.getElementById(`${animCount}`);

  //find previousSquare

  let previousSquare = getPreviousSquare();

  //distribute classes as needed

  previousSquare.classList.remove('playead');

  previousSquare.classList.add('inactive');

  squareToAnimate.classList.remove('inactive');

  squareToAnimate.classList.add('playhead');
};
```

I had to move all the components handling the playhead visuals to the app.js out of BeatTracker as well as the ResetSquares() function and GetPreviousSquare().

```javascript
const resetSquares = () => {
  setCounter(0);

  setSquares([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  setPlayHeadArray(
    squares.map((square, i) => (
      <td
        key={i + squares}
        id={i}
        className={square > 0 ? 'playhead' : 'inactive cycle'}
      ></td>
    ))
  );
};

const getPreviousSquare = () => {
  if (counter === 0) {
    return document.getElementById('15');
  } else {
    return document.getElementById(`${counter - 1}`);
  }
};
```

We had a component setup called useBPM to hold this function in a modular way.

```javascript
export default function useBPM(bpm) {
  return (60 * 1000) / 4 / bpm;
}
```

There could have been other solutions to tackle the BPM such as using Howler.js’ inbuilt loop or webAudioAPI but I decided to try controlling the step with stateful logic:

```javascript
const App = () => {

const [isPlaying, setIsPlaying] = useState(false)

const [tempo, setTempo] = useState(120);

const [volNum, setVolNum] = useState(50)

const [squares, setSquares] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

const [playHeadArray, setPlayHeadArray] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
```

The arrays above worked as a toggle for the playhead squares with a 0 = inactive and a 1=active

```javascript
let beats = Bpm(tempo);

useEffect(() => {
  if (isPlaying) {
    const interval = setInterval(() => {
      resetSquares();

      playHeadLoop();

      loop();

      // each square, counter increments to one (should be using and if else and setCounter here since it is part of state?)

      counter = counter >= 15 ? 0 : counter + 1;

      // loop creates an array of up to 6 sounds that are then played at the same time
      // this

      resetSquares();
    }, beats);

    return () => clearInterval(interval);
  }

  resetSquares();
  //any time isPlaying, grid, beats, volNum or counter changes re-render the app via the useEffect
}, [(isPlaying, grid, beats, volNum, countercounter)]);
```

This was the underlying logic put into a useEffect to control the player. Originally as stated above I wanted more modularity with the code and to keep the animation and samples seperate however we were running into sync issues so I had to merge the logic in this file. With more time we could refactor the logic out of our app.js.

| ![](/images/blog-images/beat-machine/1_M7rSg2pFchKJeHFt8ObJiA.png) |
| :----------------------------------------------------------------: |
|                 _Folder structure and components_                  |

I’d like to draw attention to this line:

```javascript
counter = counter >= 15 ? 0 : counter + 1;
```

This line in particular is troublesome as React state should not be directly updated inside a component this way. The correct usage is

```javascript
setState((prevState) => ++prevState);
```

Our useEffect logic would follow this pattern:

```javascript
useEffect(() => {
  if (isPlaying) {
    if (counter < 15) {
      setCounter((prevState) => ++prevState);
    } else {
      setCounter(0);
    }
  }
}, [isPlaying]);
```

Although the combining that with the setInterval like this:

```javascript
useEffect(() => {
  if (isPlaying) {
    const interval = setInterval(() => {
      resetSquares();

      playHeadLoop();

      loop();

      // each square, counter increments to one (should be using and if else and setCounter here since it is part of state?)

      if (counter < 15) {
        setCounter((prevState) => ++prevState);
      } else {
        setCounter(0);
      }

      // loop creates an array of up to 6 sounds that are then played at the same time

      resetSquares();
    }, beats);

    return () => clearInterval(interval);
  }

  resetSquares();
}, [(isPlaying, grid, beats, volNum, counter)]);
```

also made the counter sporadically stick at 0 and not tick up to 16 at the speed of our formula `(60 * 1000 / 4)` / bpm so for 120 BPM this would be

```javascript
(60 * 1000 / 4) / 120 = 125ms
```

I think the reason the counter doesn’t iterate upwards is because the logic may loop quicker than React can update the state hence the output would always be

```javascript
counter in useEffect: 0

counter in useEffect: 0

counter in useEffect: 0

counter in useEffect: 0
```

I wasn’t able to find a way to put in the correct logic this would be one improvement I would like to make in refactoring. I think learning about other hooks like useContext, useRef and useMemo would be a workaround for this problem.

This project helped get me more practise with Functions Objects Conditionals, Loops and Arrays in JavaScript with objects and arrays to manage and access in the form of the squares and also whilst building our instrument bank:

```javascript
export const instruments =
  [
    ({
      name: 'Clap',
      sound: './DrumSamples/Claps/Clap1.wav',
      pattern: {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
        11: false,
        12: false,
        13: false,
        14: false,
        15: false,
      },
      color: '#b50000',
    },
    {
      name: 'Hi-hat (open)',
      sound: './DrumSamples/OpenHats/OpenHiHat01.wav',
      pattern: {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
        11: false,
        12: false,
        13: false,
        14: false,
        15: false,
      },
      color: '#bcc200',
    },
    {
      name: 'Hi-hat (closed)',
      sound: './DrumSamples/ClosedHats/HiHat01.wav',
      pattern: {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
        11: false,
        12: false,
        13: false,
        14: false,
        15: false,
      },
      color: '#ff00ff',
    },
    {
      name: 'Snare 2',
      sound: './DrumSamples/AltSnare1/AltSD25.wav',
      pattern: {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
        11: false,
        12: false,
        13: false,
        14: false,
        15: false,
      },
      color: '#00DACD',
    },
    {
      name: 'Snare 1',
      sound: './DrumSamples/MainSnare/Snare1.wav',
      pattern: {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
        11: false,
        12: false,
        13: false,
        14: false,
        15: false,
      },
      color: '#ff7700',
    },
    {
      name: 'Kick',
      sound: './DrumSamples/Kicks/KickDrum01.wav',
      pattern: {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
        11: false,
        12: false,
        13: false,
        14: false,
        15: false,
      },
      color: '#00990a',
    },
    {
      name: 'Bassline',
      sound: './BassSamples/HighE-BassNote.wav',
      pattern: {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
        11: false,
        12: false,
        13: false,
        14: false,
        15: false,
      },
      color: 'blue',
    })
  ];
```

// returns different sound pointer depending on the position of the counter on the grid

```javascript
export function getBassNote(position) {
  if (position >= 14) {
    return './BassSamples/G-BassNote.wav';
  }

  if (position >= 12) {
    return './BassSamples/A-BassNote.wav';
  }

  if (position >= 10) {
    return './BassSamples/B-BassNote.wav';
  }

  if (position >= 8) {
    return './BassSamples/D-BassNote.wav';
  }

  if (position >= 6) {
    return './BassSamples/HighE-BassNote.wav';
  }

  if (position >= 4) {
    return './BassSamples/D-BassNote.wav';
  }

  if (position >= 2) {
    return './BassSamples/B-BassNote.wav';
  }

  if (position >= 0) {
    return './BassSamples/HighE-BassNote.wav';
  }

  return './BassSamples/HighE-BassNote.wav';
}
```

I also used materialUI and CSS diving into the inbuilt properties to customise the buttons, sliders and icons.

```javascript
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),

    backgroundColor: '#330704',

    border: '1px solid',

    borderColor: '#000',

    '&:hover': {
      backgroundColor: '#440704',

      color: '#FFF',

      border: '1px solid',

      borderColor: '#FFF',
    },
  },
}));
```

MaterialUI provides inbuilt methods accessible via a theme object where you can change properties of the element you want to customise. In this case I am changing the default colour of a button, the outline colour and also changing the colour properties on hover.

| ![](/images/blog-images/beat-machine/1_0xha9nJkMJFqFxSIbFZQzw.gif) |
| :----------------------------------------------------------------: |
| _MaterialUI button properties — changing button colours on hover_  |

### Future Improvements

As well as some of refactors I suggested above future versions of beatJuice could easily implement:

A clear pattern function — that clears the current pattern (without having to refresh)

A waveform visualizer — Howler.JS provides some methods to link into an audio visualiser so it would be cool to see the waveform as sound is playing.

JSON export /import— we already have the object set up to save out the 1s and 0s for our pattern so I think it would be easy to implement this so you could save the pattern.

Audio render — I think this would be another easy thing to accomplish with another npm package to give the user an MP3 file of their sample.

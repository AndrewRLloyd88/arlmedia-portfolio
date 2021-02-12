---
title: 'Combining Hugo and React'
date: 2021-02-08T09:30:07-08:00
draft: false
tags: ['Hugo', 'React']
---

![Hugo](/images/blog-images/Hugo.png)

<!--more-->

I am currently in the process of re-designing my portfolio website and wanted to use the Hugo framework as it is lightning fast to build, comes with a neat blogging feature and is low maintenance.

The reason for the re-design and moving framework is that the original site was just coded using html, css and js. I want to move the website over to a modern framework which is easier to maintain and apply some component based logic where appropriate.

## Why Hugo?

As I document my development journey Hugo offers a wonderful opportunity for a fully fledged blog feature. Generating a new post is as easy as running `hugo new blog posts/title` which then creates all the correct routing and with the layouts markdown can even handle things like tags, author, date created, pagination and order.

The pain point with the old code:

```javascript
//index.html
  <div>
      <a href="https://dashboard.featurepeek.com/peek/k5zh70zl#/">
        <div class="beatjuice portfolio-proj zoom bottom-margin_10">
      </div>
      </a>
      <p class="text-center port-desc_mw bottom-margin_10">A beat machine made with React and Howler.js
      </p>
    </div>

    <div>
      <a href="https://fork-it-all.herokuapp.com/">
        <div class="forkitall portfolio-proj zoom bottom-margin_10">
    </div>
      </a>
      <p class="text-center port-desc_mw bottom-margin_10">Forkitall - A single page React app that allows users
        to share
        their twists on various recipes. Pulls data from <a
          href="https://www.themealdb.com/api.php">TheMealDB.com</a>
      </p>
    </div>

    <div>
      <a href="https://github.com/AndrewRLloyd88/jungle-rails">
        <div class="jungle portfolio-proj zoom bottom-margin_10"></div>
      </a>
      <p class="text-center port-desc_mw bottom-margin_10">Jungle - A mini e-commerce application built with
        Rails 4.2
      </p>
</div>
```

```javascript
//style.css

/* Portfolio Elements */

.listkeeper {
  background-image: url('./images/listkeeper.jpg');
  background-size: cover;
}

.beatjuice {
  background-image: url('./images/beatjuice.jpg');
  background-size: cover;
}

.phaserpong {
  background-image: url('./images/pong.jpg');
  background-size: cover;
}

.jeopardy {
  background-image: url('./images/jeopardy.jpeg');
  background-size: cover;
}

.forkitall {
  background-image: url('./images/cookdinosaur.svg');
  background-size: cover;
}
```

This is a lot of duplicated code and is very hard to maintain. In my mind this is the perfect candidate for a React component that can map per project I want to display.

By default Hugo does not come with any setup for webpack or npm packages.

The first step is to run `npm init -y` to generate a package.json

Starting point:
[how to add a react script to hugo](https://www.wictorwilen.se/blog/how-to-add-a-react-script-to-hugo/)

[how to add more than one path to webpack](https://stackoverflow.com/questions/35903246/how-to-create-multiple-output-paths-in-webpack-config#:~:text=Webpack%20does%20support%20multiple%20output,the%20name%20as%20output%20template.&text=Basically%20you%20don't%20follow,a%20path%20for%20the%20filename.)

[increasing limit when 404 errors occur with SVGs](https://stackoverflow.com/questions/42395452/webpack-2-svg-files-give-404-error/42420701)

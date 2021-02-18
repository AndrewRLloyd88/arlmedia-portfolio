---
title: 'Combining Hugo and React'
date: 2021-02-08T09:30:07-08:00
draft: false
tags: ['Hugo', 'React']
---

![Hugo](/images/blog-images/hugo-react/Hugo.png#header)

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

The first step is to run `npm init -y` to generate a package.json.

The next step is to install all of the dependencies `npm i --save-dev babel-loader @babel/core webpack @babel/preset-react react react-dom npm-run-all`

I started by reading the below article as a starting point of reference:

Starting point:
[how to add a react script to hugo](https://www.wictorwilen.se/blog/how-to-add-a-react-script-to-hugo/)

I have been using Build Websites With Hugo by Brian P Hogan as a guide to Hugo, so I referred to chapter 7, Managing Assets With Pipes to set up my package.json scripts correctly:

```javascript
 "build": "npm-run-all webpack hugo-build",
    "hugo-build": "hugo --cleanDestinationDir",
    "hugo-server": "hugo server --disableFastRender",
    "webpack": "webpack",
    "webpack-watch": "webpack --watch",
    "dev": "npm-run-all webpack --parallel webpack-watch hugo-server"
```

`npm run build` builds the current version of the website into the /public folder. I use `npm run dev` which in conjunction uses the npm-run-all package to build, run webpack, run the hugo server and watch for changes.

I set up my webpack.config.js like this initially:

```javascript
const path = require('path');

module.exports = {
  entry: './themes/arlmediaTheme/assets/js/index.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'themes', 'arlmediaTheme', 'assets', 'js'),
  },
};
```

The entry point was index.js in the js file which I set up a quick test using the Axios package and the Kanye Rest API. The index.js was located in my hugo template in the `arlmedia-portfolio/themes/arlmediaTheme/assets/js/` directory.

Content of the JS file:

```javascript
import axios from 'axios';
import lunr from 'lunr';

axios.get('https://api.kanye.rest').then((res) => {
  console.log(res.data);
});
```

This file was transpiled back to a minified version and pre ES6 syntax into the app.js file which is served in the /public directory.

In order to work with React as it uses JSX syntax I also had to include babel and set up a configuration file. Following the lead of the tutorial I set up my babel.config.js file in the root of my project as follows:

```javascript
module.exports = function (api) {
  api.cache(true);
  const presets = [['@babel/preset-react']];
  const plugins = [];
  return {
    presets,
    plugins,
  };
};
```

[This Commit](https://github.com/AndrewRLloyd88/arlmedia-portfolio/commit/4024ea7cc165563d3852d59ac073535c65e2be9c) Shows the changes I made to the config and what packages I included to make a few React style files work with Hugo.

The main changes to webpack.config.js I made:

```Javascript
const path = require('path');

module.exports = {
  entry: './themes/arlmediaTheme/assets/js/index.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'themes', 'arlmediaTheme', 'assets', 'js'),
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /.css$/,
        use: ['style-loader', 'css-loader'],
        include: /flexboxgrid/,
      },
      {
        test: /.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
```

This allowed the index.js file to generate a minified version that transpiled from ES6 syntax back to ES4 and run on the hugo server.

Utlising React turned the confusing repeated code in the CSS and JS I shared above to this:

```javascript
import React, { useState, useEffect } from 'react';
import { projectData } from './projectData';

export default function main() {
  return (
    <div className="project">
      {projectData.map((project, i) => (
        <div className="project-inner">
          <div className="project-container">
            <div className="project-description">
              <div className="project-desc-text">
                <p className="desc">{project.description}</p>
                {project.frontend && (
                  <p className="stack-type">
                    <span className="stack-type-title">Frontend:</span>
                    <div className="stack-row">
                      {project.frontend.map((icon, i) => (
                        <span className="stack-icon">
                          <img
                            className="stack-image"
                            src={icon}
                            title={project.frontendNames[i]}
                          ></img>
                        </span>
                      ))}
                    </div>
                  </p>
                )}
                {project.backend && (
                  <p className="stack-type">
                    <span className="stack-type-title">Backend:</span>
                    <div className="stack-row">
                      {project.backend.map((icon, i) => (
                        <span className="stack-icon">
                          <img
                            className="stack-image"
                            src={icon}
                            title={project.backendNames[i]}
                          ></img>
                        </span>
                      ))}
                    </div>
                  </p>
                )}
                {project.test && (
                  <p className="stack-type">
                    <span className="stack-type-title">Test:</span>
                    <div className="stack-row">
                      {project.test.map((icon, i) => (
                        <span className="stack-icon">
                          <img
                            className="stack-image"
                            src={icon}
                            title={project.testNames[i]}
                          ></img>
                        </span>
                      ))}
                    </div>
                  </p>
                )}
                {project.deployment && (
                  <p className="stack-type">
                    <span className="stack-type-title">Deployment:</span>
                    <div className="stack-row">
                      {project.deployment.map((icon, i) => (
                        <span className="stack-icon">
                          <img
                            className="stack-image"
                            src={icon}
                            title={project.deploymentNames[i]}
                          ></img>
                        </span>
                      ))}
                    </div>
                  </p>
                )}
              </div>
            </div>
            <img className="project-image" src={project.image}></img>
          </div>
          <div className="project-control-panel">
            <p className="project-name">{project.name}</p>
            <div className="project-buttons">
              {project.github !== '' && (
                <button
                  onClick={() => {
                    window.location.href = `${project.github}`;
                  }}
                >
                  Code
                </button>
              )}
              {project.demo !== '' && (
                <button
                  onClick={() => {
                    window.location.href = `${project.demo}`;
                  }}
                >
                  Demo
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
```

This code is ultimately easier to maintain it draws from a projectData object which I have defined in the following schema:

```javascript
export const projectData = [
  {
    name: 'MB-WYSIWYG Text Editor',
    description:
      'A Rich Text Editor built for Mintbean’s Build Your Own Text Editor hackathon.',
    image: '/images/projects/wysiwyg.png',
    github: 'https://github.com/AndrewRLloyd88/mb-text-editor',
    demo: 'https://mb-wysiwyg-text-editor.netlify.app/',
    frontend: [react, typescript, css3, materialui],
    backend: null,
    test: null,
    deployment: [netlify],
    frontendNames: ['React', 'TypeScript', 'CSS3', 'MaterialUI'],
    backendNames: null,
    testNames: null,
    deploymentNames: ['Netlify'],
  },
  //more projects are below in the array
```

The variables from the icons are imported at the top of this data file. This data object and all of the project properties are then mapped out in index.js. Further refactoring could be done to split all of the elements into seperate components in the future. This overall is much more maintainable as I would only have to change my project data in one place as opposed to copying and pasting HTML content. Map takes care of the rest in the index.js file.

<b>The finished result:</b>

| ![Portfolio Section](/images/blog-images/hugo-react/portfolio_section.png) |
| :---------------------------------------------------------------------: |

## How to add more than one React Style Entry File

I needed to run two React scripts one for my projects and one for my skills to map out in a similar way as the above. With the setup I currently had no way to define two entry and output files. After doing a bit of researching I came across this useful post:

[how to add more than one path to webpack](https://stackoverflow.com/questions/35903246/how-to-create-multiple-output-paths-in-webpack-config#:~:text=Webpack%20does%20support%20multiple%20output,the%20name%20as%20output%20template.&text=Basically%20you%20don't%20follow,a%20path%20for%20the%20filename.)

I set up the two modules as follows:

| ![Modules](/images/blog-images/hugo-react/modules.png) |
| :---------------------------------------------------------------------: |

And set up my webpack config to use the two entry points and generate two output files:

```javascript
module.exports = {
  entry: {
    index: './themes/arlmediaTheme/assets/js/modulea/index.js',
    projects: './themes/arlmediaTheme/assets/js/moduleb/projects.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'themes', 'arlmediaTheme', 'assets', 'js'),
  },
  //...
```

The idea is that this setup can take in index.js and projects.js from the `'./themes/arlmediaTheme/assets/js/[your module]` path and output the files elsewhere the main.js and projects.js that get output in the /js directory are the minified and transpiled versions of the JSX files. The above method is slated as a bit of a workaround but generated the correct results for my needs.

## SVG Limit errors

I also encountered some issues whilst using SVGs at first due to the custom setup with webpack. Initially all of my SVG resources were coming back 404 despite having the correct path. At one point a lot of .SVG files were being generated with a minified name and the browser was clearly not recieving the correct files:

`module.exports = __webpack_public_path__ + "images/code.61e3a3939c2f93f30ac21419625c9a4f.jpg"`

This was what the file path was looking like. To remedy this i did a bit of research on StackOverflow:

| [Using Images with Webpack React Won't work](https://stackoverflow.com/questions/50205296/using-images-with-webpack-react-wont-work) |
| :---------------------------------------------------------------------: |

This article pointed me to removing url loader and setting up svg-url-loader in the webpack config.js:

```javascript
      {
        test: /.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
```

This solved the first issue but I still had several .SVGs which would not load. That is when I did a bit more digging and found this article:

[increasing limit when 404 errors occur with SVGs](https://stackoverflow.com/questions/42395452/webpack-2-svg-files-give-404-error/42420701)

I took the answer from that article and increased the limit in the options param:

```javascript
      {
        test: /.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 1000000,
            },
          },
        ],
      },
```

And hey presto!

| ![Icons](/images/blog-images/hugo-react/icons.png) |
| :---------------------------------------------------------------------: |

The takeaways I have gotten from renovating my website have been enormous. There are still specific things I would like to learn with Webpack, I'd love to get a bit more indepth with webpack set up andthe ins and outs to fully understand what the parameters mean and what settings to tweak.

It's been massively helpful to learn a different framework in Hugo, the site is performant and builds lightning fast and with the content pipeline has a lot of flexibility.

There are definitely improvements I am seeking to add to the website as time goes on but I really feel I have improved the website from the prior version. The maintainability definitely feels like a huge weight off when it comes to updating content.

I would like to find a way to automatically push the Public changes to my SiteGround hosting, and have looked into CircleCI, Jenkins and other methods to deploy but am yet to settle on a way right now to deploy smoothly and automatically via SiteGround so that is something I would like to do a bit more research on and if anyone has some suggestions feel free to reach out!

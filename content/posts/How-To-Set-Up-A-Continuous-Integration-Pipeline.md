---
title: 'How To Set Up A Continuous Integration Pipeline with Github and Next.JS'
date: 2020-12-04T19:09:35-08:00
draft: false
---

![](https://cdn-images-1.medium.com/max/800/1*eZqFUVhMAt-G0iNEvcORIA.png#header)

<!--more-->

### How To Set Up A Continuous Integration Pipeline with Github and Next.JS

I wanted to learn a bit more about Continuous Integration Pipelines, so I took the opportunity with [Nicole Woodcock](https://www.linkedin.com/in/npwoodcock/) working on [MB Javascript Hacks: Social Justice Hack Week](https://www.mintbean.io/meets/988938b2-f615-414d-8b5b-7be96b49bec6).

### What is Continuous Integration?

Continuous integration safely allows multiple users to contribute to one repository on Github. In essence continuous integration gives us a safety net to stop us pushing bad or broken code to our production build and hence our deployment.

We can write tests using a test runner like [Jest](https://jestjs.io/) to check functional logic we write does what we expect it to do (or not do in some cases) What continuous integraton does is take it a step further by automating the entire process of running our tests and deploying the application if all of the tests pass.

| ![](/images/blog-images/circle-ci/1_ZpINHyTC7VPeXqs3R-NoKw.png) |
| :-------------------------------------------------------------: |

Jest test runner in action

At first when we are writing features or adding dependencies we can use branches to build out a new feature for an application until we are happy with it. When satisfied with our feature, we will merge our changes to the main branch. Pushing our changes to the main repository branch (or the branch you set up to be watched by our Continuous integration watcher) on GitHub will start this automated pipeline.

### Setting Up Your Next.JS Project For CI

Assuming you have set up your Next.JS project using:

`npx create-next-app <your-app>`

You should have the starter shell for a Next.JS project. You can follow the [getting started guide here](https://nextjs.org/learn/basics/create-nextjs-app/setup)

Next what you will want to do is add the testing dependencies to your package.json:

`npm install -D jest @testing-library/react @testing-library/jest-dom @testing-library/dom babel-jest`

or

`yarn add -D jest @testing-library/react @testing-library/jest-dom @testing-library/dom babel-jest`

The next step is to make a file called `.babelrc` in your root directory (see folder structure image below)

In this file you will want to insert the following code:

```javascript
{
"presets": ["next/babel"]
}
```

Now you will want to open up your `package.json` file, add the following section for `jest`:

```javascript
"jest": {
    "testPathIgnorePatterns": [
      "<rootDir>/.next/",
      "<rootDir>/node_modules/"
    ],
    "transform": {
      "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
    },
    "moduleNameMapper": {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
      "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
    }
}
```

You will also want to add the code below in the scripts section of your `package.json`:

```javascript
    "scripts": { "test": "jest"},
```

Following this you should make a folder named `.circleci` at the root of the project and add a configuration file named `config.yml` inside of the .circleCI folder

| ![](/images/blog-images/circle-ci/1_9zsXqKuA5l4gNjS-p4g8Kw.png) |
| :-------------------------------------------------------------: |

Then this file, enter the following code:

if you are using NPM:

```javascript
version: 2.1
jobs:
  build:
    working_directory: ~/repo
    docker:
      - image: circleci/node:10.16.3
    steps:
      - checkout
      - run:
          name: Update NPM
          command: "sudo npm install -g npm@5"
      - restore_cache:
          key: dependency-cache-{{ checksum "package.json" }}
      - run:
          name: Install Dependencies
          command: npm install
      - save_cache:
          key: dependency-cache-{{ checksum "package.json" }}
          paths:
            - ./node_modules
      - run:
          name: Run tests
          command: npm run test --passWithNoTests

```

or if you are using Yarn:

```javascript
version: 2.1
jobs:
  build:
    working_directory: ~/repo
    docker:
      - image: circleci/node:10.16.3
    steps:
      - checkout
      - run:
          name: yarn update
          command: "sudo npm install -g yarn"
      - restore_cache:
          key: dependency-cache-{{ checksum "package.json" }}
      - run:
          name: Install Dependencies
          command: yarn install
      - save_cache:
          key: dependency-cache-{{ checksum "package.json" }}
          paths:
            - ./node_modules
      - run:
          name: yarn run tests
          command: yarn run test --passWithNoTests
```

You will notice the — passWithNoTests flag after the run test command on the last line of the yml file. This needs to be removed when you add Jest tests to your project. For now it will allow the run test command to pass even if there are no Jest test suites present in your project.

### Setting Up With CircleCI

Once you have set up your project in your IDE, you will want to go to [CircleCI](https://circleci.com/) and if you haven’t already make an account.

Once you are in you will see a dashboard. From here you can select on the top left corner what account or organisation on Github you want to use and within those accounts will be the repo or repos you want to hook up to CircleCI. Press the Set Up Project button.

| ![](/images/blog-images/circle-ci/1_XmG3b1NCj2CtfFaCOJ9k9Q.png) |
| :-------------------------------------------------------------: |

You may also need to give authorisation for CircleCI to access your repo or organisation this can be in the form of third party access

| ![](/images/blog-images/circle-ci/1_vRNhsDnW2BsLSu3zg1gC2Q.png) |
| :-------------------------------------------------------------: |

Or through a deploy key:

| ![](/images/blog-images/circle-ci/1_DmYZuuuLkCN8X_p0OVq8sw.png) |
| :-------------------------------------------------------------: |

These will have to be set up on Github.

You should now see a screen that looks like the below. Remember our config.yml file we wrote earlier? This is where we are going to bring that into play. Press the Use Existing Config button:

| ![](/images/blog-images/circle-ci/1_aeOxAYOMXvq7-cjgvJ6bww.png) |
| :-------------------------------------------------------------: |

Then you will be asked Have you added a config.yml file? We already have so you can press Start Building.

| ![](/images/blog-images/circle-ci/1_I2I79O2L_1CLrO2O1yrCzw.png) |
| :-------------------------------------------------------------: |

All being well the screen will progress onto your build screen. You can also view this on the dashboard. Your build will start to run with all the parameters we set in the config.yml file:

| ![](/images/blog-images/circle-ci/1_79oDPA3C0JFSH2sEgcHK8Q.png) |
| :-------------------------------------------------------------: |

The build in the above picture failed because the line yarn add was incorrect in the YML file:

```javascript
- run:
          name: Install Dependencies
//yarn install is the correct syntax also .yml files are white space sensitive which can cause build failures
          command: yarn add
```

When we fix that line the below result happened:

| ![](/images/blog-images/circle-ci/1_admZdaYxCE44Y5EIfpvdZw.png) |
| :-------------------------------------------------------------: |

Congratulations! If you are seeing a similar result to this screen with green ticks and success your automated continuous integration pipeline is now set up! If you don’t see this and the build fails examine the logs carefully in each part of the build to see what failed and what needs to be fixed. If you have tests running in Jest it could also be that your tests are not passing but your build would compile.

### What happens now when I create a pull request or push something to the main branch?

When you submit the pull request or push some code to the main branch with the CI automation pipeline set up one of two things can happen. Your code can pass all of the tests and checks that CircleCI (and your deployment platform) needs to create a non crashing and successful build:

| ![](/images/blog-images/circle-ci/1_8_yPl4FvZNZ8Q_aCUaS4uw.png) |
| :-------------------------------------------------------------: |

A successful pull request passing checks on CircleCI and Vercel — awaiting review

These changes should be merged into the main branch with a tick

| ![](/images/blog-images/circle-ci/1_N9ECn7ROv-xUOVRtGDC-mA.png) |
| :-------------------------------------------------------------: |

Or if there is a problem with some aspect of your code you can also have an unsuccessful pull request that can either be edited in GitHub to fix by the reviewer, or it can be commented on, or most likely it will be rejected.

| ![](/images/blog-images/circle-ci/1_1QorRs3rUKgSRmEECWXvUA.png) |
| :-------------------------------------------------------------: |

In some cases depending on your project or organisation setup on github you may see a pull request or merge appear with a cross:

| ![](/images/blog-images/circle-ci/1_m9H6-pYupFomSVy6k1CtWA.png) |
| :-------------------------------------------------------------: |

It’s not necessarily a bad thing to see this as the CI pipeline is trying to stop you deploying the code live!

Credit goes to [https://circleci.com/blog/building-postman-test-reports/](https://circleci.com/blog/building-postman-test-reports/) which contains even more detailed information about unit testing in Next.JS with Jest!

import bootstrap from '../../../../../static/images/icons/stack/bootstrap.svg';
import css3 from '../../../../../static/images/icons/stack/css3.svg';
import circleci from '../../../../../static/images/icons/stack/circleci.svg';
import cypress from '../../../../../static/images/icons/stack/cypress.svg';
import express from '../../../../../static/images/icons/stack/express.svg';
import featurepeek from '../../../../../static/images/icons/stack/featurepeek.svg';
import heroku from '../../../../../static/images/icons/stack/heroku.svg';
import html5 from '../../../../../static/images/icons/stack/html5.svg';
import jest from '../../../../../static/images/icons/stack/jest.svg';
import js from '../../../../../static/images/icons/stack/js.svg';
import netlify from '../../../../../static/images/icons/stack/netlify.svg';
import next from '../../../../../static/images/icons/stack/nextjs.svg';
import nodejs from '../../../../../static/images/icons/stack/nodejs.svg';
import materialui from '../../../../../static/images/icons/stack/material-ui.svg';
import mongodb from '../../../../../static/images/icons/stack/mongo-icon.svg';
import postgresql from '../../../../../static/images/icons/stack/postgresql.svg';
import rails from '../../../../../static/images/icons/stack/ruby-on-rails.svg';
import react from '../../../../../static/images/icons/stack/react.svg';
import redux from '../../../../../static/images/icons/stack/redux.svg';
import ruby from '../../../../../static/images/icons/stack/Ruby_logo.svg';
import sass from '../../../../../static/images/icons/stack/sass.svg';
import stripe from '../../../../../static/images/icons/stack/stripe.svg';
import storybook from '../../../../../static/images/icons/stack/storybook-icon.svg';
import typescript from '../../../../../static/images/icons/stack/typescript.svg';
import vercel from '../../../../../static/images/icons/stack/vercel-icon.svg';

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
  {
    name: 'The Shoppies Movie Awards',
    description:
      'Built for the Shopify UX Developer Intern and Web Developer Intern Challenge Summer 2021',
    image: '/images/projects/shoppies.png',
    github: 'https://github.com/AndrewRLloyd88/Shoppies-Challenge',
    demo: 'https://theshoppies-movie-awards.netlify.app/',
    frontend: [react, js, css3, materialui],
    backend: [ruby, rails],
    test: null,
    deployment: [netlify, heroku],
    frontendNames: ['React', 'JavaScript', 'CSS3', 'MaterialUI'],
    backendNames: ['Ruby', 'Rails'],
    testNames: null,
    deploymentNames: ['Netlify', 'Heroku'],
  },
  {
    name: 'National Logistics Transportation',
    description:
      'Re-design of business website for a Missouri based logistics firm.',
    image: '/images/projects/nat-log.jpeg',
    github:
      'https://github.com/AndrewRLloyd88/National-Logistics-Transportation',
    demo: 'https://national-logistics-transportation.netlify.app/',
    frontend: [react, js, css3, materialui],
    backend: null,
    test: null,
    deployment: [netlify],
    frontendNames: ['React', 'JavaScript', 'CSS3', 'MaterialUI'],
    backendNames: null,
    testNames: null,
    deploymentNames: ['Netlify'],
  },
  {
    name: 'ListKeeper',
    description:
      'A personal safety app disguised as a todo list app. An entry for Mintbean Social Justice Hack Week.',
    image: '/images/projects/listkeeper.png',
    github: 'https://github.com/ListKeeper/ListKeeper',
    demo: 'https://listkeeper.vercel.app/',
    frontend: [next, js, css3, materialui],
    backend: [mongodb],
    test: null,
    deployment: [vercel],
    frontendNames: ['Next', 'JavaScript', 'CSS3', 'MaterialUI'],
    backendNames: ['MongoDB Atlas'],
    testNames: null,
    deploymentNames: ['Vercel'],
  },
  {
    name: 'Beatjuice',
    description:
      'An entry for Mintbean’s Campus JavaScript Playoffs: Build a Beat Machine Hackathon.',
    image: '/images/projects/beatjuice.png',
    github: 'https://github.com/AndrewRLloyd88/beat-machine-hackathon',
    demo: 'https://beatjuice.netlify.app/',
    frontend: [react, js, css3, materialui],
    backend: null,
    test: null,
    deployment: [netlify],
    frontendNames: ['React', 'JavaScript', 'CSS3', 'MaterialUI'],
    backendNames: null,
    testNames: null,
    deploymentNames: ['Netlify'],
  },
  {
    name: 'PhaserPong',
    description:
      'A Pong clone made with PhaserJS. An entry for MB JavaScript GameHacks: Classic Pong.',
    image: '/images/projects/pong.jpg',
    github: 'https://github.com/AndrewRLloyd88/pong-hackathon',
    demo: 'https://dashboard.featurepeek.com/peek/7m4hd31m',
    frontend: [js],
    backend: null,
    test: null,
    deployment: [featurepeek],
    frontendNames: ['JavaScript'],
    backendNames: null,
    testNames: null,
    deploymentNames: ['FeaturePeek'],
  },
  {
    name: 'Jeopardy',
    description:
      'A quiz app clone of the game show Jeopardy. An entry for Mintbean’s Hack the Quiz Platform Hackathon.',
    image: '/images/projects/jeopardy.jpeg',
    github:
      'https://github.com/AndrewRLloyd88/Hack_the_Quiz_Platform_Hackathon',
    demo: 'https://jeopardy-hackathon.netlify.app/',
    frontend: [react, redux, js, css3, materialui],
    backend: null,
    test: null,
    deployment: [netlify],
    frontendNames: ['React', 'Redux', 'JavaScript', 'CSS3', 'MaterialUI'],
    backendNames: null,
    testNames: null,
    deploymentNames: ['Netlify', 'Heroku'],
  },
  {
    name: 'Forkitall',
    description:
      'A Single Page React app that allows users to share their twists on various recipes.',
    image: '/images/projects/cookdinosaur.svg',
    github: 'https://github.com/AndrewRLloyd88/fork_it_all_frontend',
    demo: 'https://fork-it-all.herokuapp.com/',
    frontend: [react, js, css3],
    backend: [ruby, rails],
    test: null,
    deployment: [heroku],
    frontendNames: ['React', 'JavaScript', 'CSS3'],
    backendNames: ['Ruby', 'Rails'],
    testNames: null,
    deploymentNames: ['Heroku'],
  },
  {
    name: 'Jungle',
    description: 'A mini e-commerce application built with Rails 4.2',
    image: '/images/projects/rubyrails.png',
    github: 'https://github.com/AndrewRLloyd88/jungle-rails',
    demo: '',
    frontend: [ruby, bootstrap],
    backend: [rails],
    test: null,
    deployment: null,
    frontendNames: ['Ruby', 'Bootstrap'],
    backendNames: ['Rails'],
    testNames: null,
    deploymentNames: null,
  },
  {
    name: 'Interview Scheduler',
    description:
      'A single page interview scheduling app built using React, Storybook, NodeJS, Express. Tested using Cypress and Jest.',
    image: '/images/projects/interview-scheduler.png',
    github: 'https://github.com/AndrewRLloyd88/scheduler',
    demo: 'https://andrew-lloyd-scheduler.netlify.app',
    frontend: [react, js, css3, materialui],
    backend: null,
    test: null,
    deployment: [netlify],
    frontendNames: ['React', 'JavaScript', 'CSS3', 'materialui'],
    backendNames: ['ruby', 'rails'],
    testNames: [],
    deploymentNames: ['Netlify', 'Heroku'],
  },
  {
    name: 'Quiz App',
    description:
      'A single page app that you can use to create, take and share quizzes.',
    image: '/images/projects/quiz.jpg',
    github: 'https://github.com/andreiskandar/quiz-app',
    demo: '',
    frontend: [react, js, css3, materialui],
    backend: null,
    test: null,
    deployment: [netlify],
    frontendNames: ['React', 'JavaScript', 'CSS3', 'materialui'],
    backendNames: ['ruby', 'rails'],
    testNames: [],
    deploymentNames: ['Netlify', 'Heroku'],
  },
  {
    name: 'Random Activity Generator',
    description:
      'Feeling bored? Find an activity to do using the Random Activity Generator.',
    image: '/images/projects/random.jpeg',
    github: 'https://github.com/AndrewRLloyd88/random-activity-generator',
    demo: 'https://andrewrlloyd88.github.io/',
    frontend: [react, js, css3, materialui],
    backend: null,
    test: null,
    deployment: [netlify],
    frontendNames: ['React', 'JavaScript', 'CSS3', 'materialui'],
    backendNames: ['ruby', 'rails'],
    testNames: [],
    deploymentNames: ['Netlify', 'Heroku'],
  },
  {
    name: 'Interactive Drum Kit',
    description: 'An interactive drum kit.',
    image: '/images/projects/drumkit.jpeg',
    github: 'https://github.com/AndrewRLloyd88/drum-kit',
    demo: 'https://eager-keller-24b512.netlify.app/',
    frontend: [react, js, css3, materialui],
    backend: null,
    test: null,
    deployment: [netlify],
    frontendNames: ['React', 'JavaScript', 'CSS3', 'materialui'],
    backendNames: ['ruby', 'rails'],
    testNames: [],
    deploymentNames: ['Netlify', 'Heroku'],
  },
  {
    name: 'Dicee',
    description:
      'A 2 player dice game that allows two people to settle disputes via dice roll.',
    image: '/images/projects/dicee.jpeg',
    github: 'https://github.com/AndrewRLloyd88/dicee-challenge',
    demo: 'https://zealous-blackwell-43276e.netlify.app/',
    frontend: [react, js, css3, materialui],
    backend: null,
    test: null,
    deployment: [netlify],
    frontendNames: ['React', 'JavaScript', 'CSS3', 'materialui'],
    backendNames: ['ruby', 'rails'],
    testNames: [],
    deploymentNames: ['Netlify', 'Heroku'],
  },
  {
    name: 'Tindog',
    description:
      'A mock startup website for your dog to find their perfect match.',
    image: '/images/projects/tindog.png',
    github: 'https://github.com/AndrewRLloyd88/Tindog-Starter-Site',
    demo: 'https://thirsty-heyrovsky-82e5a2.netlify.app/',
    frontend: [react, js, css3, materialui],
    backend: null,
    test: null,
    deployment: [netlify],
    frontendNames: ['React', 'JavaScript', 'CSS3', 'materialui'],
    backendNames: ['ruby', 'rails'],
    testNames: [],
    deploymentNames: ['Netlify', 'Heroku'],
  },
  {
    name: 'Simon',
    description: 'A clone of Simon the memory skill game.',
    image: '/images/projects/simon.jpg',
    github: 'https://github.com/AndrewRLloyd88/Simon',
    demo: 'https://affectionate-archimedes-893cb2.netlify.app/',
    frontend: [react, js, css3, materialui],
    backend: null,
    test: null,
    deployment: [netlify],
    frontendNames: ['React', 'JavaScript', 'CSS3', 'materialui'],
    backendNames: ['ruby', 'rails'],
    testNames: [],
    deploymentNames: ['Netlify', 'Heroku'],
  },
  {
    name: 'Tipple',
    description: 'An app to search for your favourite cocktail drinks.',
    image: '/images/projects/tipple.jpeg',
    github: 'https://github.com/AndrewRLloyd88/tipple',
    demo: 'https://sharp-heisenberg-a59d5f.netlify.app/',
    frontend: [react, js, css3, materialui],
    backend: null,
    test: null,
    deployment: [netlify],
    frontendNames: ['React', 'JavaScript', 'CSS3', 'materialui'],
    backendNames: ['ruby', 'rails'],
    testNames: [],
    deploymentNames: ['Netlify', 'Heroku'],
  },
  {
    name: 'Web Chat App',
    description:
      'Ask !Chatbot what the weather will be like or chat with others in realtime via the chat client.',
    image: '/images/projects/chatbot.png',
    github: 'https://github.com/AndrewRLloyd88/Arlmediachatbotjs2',
    demo: 'https://arlmediachatbotll2.herokuapp.com/',
    frontend: [react, js, css3, materialui],
    backend: null,
    test: null,
    deployment: [netlify],
    frontendNames: ['React', 'JavaScript', 'CSS3', 'materialui'],
    backendNames: ['ruby', 'rails'],
    testNames: [],
    deploymentNames: ['Netlify', 'Heroku'],
  },
];

---
title: 'Working with Hugo — New Year, New Technology'
date: 2021-01-05T15:00:25-08:00
draft: false
tags: ['Hugo', 'Development', 'Markdown', 'Static Site']
---

![](/images/blog-images/working-with-hugo/1_edrHHUk9_xuhacDZEHLJaw.jpeg#header)

<!--more-->

#### How to format an image to be a link in markdown

I am currently working on learning [Hugo](https://gohugo.io/) following along with [Build Websites with Hugo by Brian P. Hogan](https://pragprog.com/titles/bhhugo/build-websites-with-hugo/). This was introduced to me by [Tomas Gallucci](https://medium.com/u/ffdda1bb71c0) last year. Towards the end of the previous year I got up to about the 3rd chapter of the book. I can already see the potential with Hugo static site generation and what that will come in useful for in it’s archetype based page generation using markdown format.

Markdown is something that I got acquainted with last year writing various different read-mes in my journey onto the web development scene. I took a lot of time writing different read-mes along the way in various levels of detail.

| ![](/images/blog-images/working-with-hugo/1_l0DSpxWN7a5YT_o00-P6lA.png) |
| :---------------------------------------------------------------------: |
|           _A readme for the forkitall project from last year_           |

Hugo uses markdown in a different way to give you a base template or in Hugo’s lingo archetype:

|  ![](/images/blog-images/working-with-hugo/1_mruQXXMUfbfF6vLCiTjF5g.png)   |
| :------------------------------------------------------------------------: |
| _This acts as a base template for any page generated using this archetype_ |

With the command `hugo new projects/jabberwocky.md` you end up with a new markdown file generated in the tree:

| ![](/images/blog-images/working-with-hugo/1_Aas7-uO2WfdxzCzFCm7Xzg.png) |
| :---------------------------------------------------------------------: |

The projects.md has in effect acted as a boilerplate and created jabberwocky.MD. Jabberwocky.MD then works in conjunction with the layouts folder, the style.css and in this case specifically the projects folder and the single.html file:

| ![](/images/blog-images/working-with-hugo/1_fuwCnjzp5g9NCbDDfYEapA.png) |
| :---------------------------------------------------------------------: |

To generate this page:

| ![](/images/blog-images/working-with-hugo/1_jSOQThAzcku8D_6jcIx8RA.png) |
| :---------------------------------------------------------------------: |

Now we come to the interesting bit! At the end of chapter 4 the gauntlet is thrown down to try creating a content type and archetype for yourself. So having videography work and considering the ease at which you can put boilerplated material together I thought I would create videos as a content type.

| ![](/images/blog-images/working-with-hugo/1_T58MvVEcfk0OwirVODjs6w.png) |
| :---------------------------------------------------------------------: |

I wanted my banner sized image to go to a page. And after trying various combinations this is what I found worked:

```javascript
[![Alt](https://via.placeholder.com/640x150)](https://www.youtube.com/watch?v=soZ9rBhGM5k&feature=youtu.be)
```

This image now links to the video I made a while back for Anglican Campus spirituality!

![](/images/blog-images/working-with-hugo/1_GH7X8LAx2H7hWij1Y52HVA.gif#.width-800)

I will continue to post on my progress and the things I am learning about Hugo as I go along during the course of the tutorial. You can find progress in my [repo here](https://github.com/AndrewRLloyd88/hugo-porfolio-template).

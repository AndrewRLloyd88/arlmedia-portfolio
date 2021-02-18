---
title: 'Technical Write-up for the Shopify UX Developer Intern & Web Developer Intern Challenge — Summer 2021 — The Shoppies'
date: 2021-01-17T16:26:36-08:00
draft: false
tags: ['Development', 'React', 'Ruby on Rails', 'Full Stack']
---

![](/images/blog-images/shopify-tech-challenge/1_douFb-tnRnjLtp4bw53CCA.png#header)

<!--more-->

I was introduced to this technical challenge by [Andre Iskandar](https://www.linkedin.com/in/andreiskandar/) who forwarded me the advertised role and technical challenge from Shopify located [here](https://jobs.smartrecruiters.com/ni/Shopify/ee14b4f1-62ec-4a47-850b-2311c57f855b-front-end-developer-intern-remote-summer-2021). These kinds of technical challenges I am viewing as an awesome opportunity to push my learning and problem solving skills further as well as keep fresh on the skills I have learned so far. They also give another amazing portfolio piece. I was excited to delve into this challenge as it had a number of interesting components to it!

The repository can be viewed [here](https://github.com/AndrewRLloyd88/Shoppies-Challenge) and the final app is available to view live at: [https://theshoppies-movie-awards.netlify.app/](https://theshoppies-movie-awards.netlify.app/)

| ![](/images/blog-images/shopify-tech-challenge/1_KGC8_O2k2lcX4F6hMmK9Ow.gif#.width-800) |
| :-------------------------------------------------------------------------------------: |
|                         _The final product deployed on Netlify_                         |

### The Challenge

We need a webpage that can search [OMDB](http://www.omdbapi.com) for movies, and allow the user to save their favourite films they feel should be up for nomination. When they’ve selected 5 nominees they should be notified they’re finished.

We’d like a simple to use interface that makes it easy to:

- Search OMDB and display the results (movies only)
- Add a movie from the search results to our nomination list
- View the list of films already nominated
- Remove a nominee from the nomination list

### Technical requirements

1.  Search results should come from OMDB’s API (free API key: [OMDB API](http://www.omdbapi.com/apikey.aspx)).
2.  Each search result should list at least its title, year of release and a button to nominate that film.
3.  Updates to the search terms should update the result list
4.  Movies in search results can be added and removed from the nomination list.
5.  If a search result has already been nominated, disable its nominate button.
6.  Display a banner when the user has 5 nominations.

### Making user stories from our requirements list

I always find it helpful to frame a list of user stories from the technical requirements given. It helps to shape things such as the programming logic, the verbs for potential API routes and the entities that will be contained in tables or that need state applied to them. I have also found whether it be for hackathons, personal projects or technical challenges such as this it helps guide you towards minimum viable demo or minimum viable product.

- As a user I should be able to search for films to nominate
- Users must be able to see at least a title, year of release and a nominate button
- As a user I expect that the list of results will change as I update my search term
- As a user I should be able to nominate a film which will appear in a nomination list
- As a user I should be able to un-nominate a film or remove a nomination.
- As a user I should be able to see a list of the films I have nominated
- As a user I should not be able to nominate the same film twice
- As a user I should be able to nominate a film if it is a remake or reboot and has a different year of release but the same title as a prior release
- Users should have the ability to share a link with others that shows what films they have nominated
- Users nominations should be remembered when they return to the page
- As a user I should see a banner when I nominate 5 films
- As a user I should not see a banner if I have nominated 5 films and remove one

### Considerations

What frameworks to use?  
The internship job description mentions the use of Ruby on Rails and React:

> “Developing React components, managing data with GraphQL, and using libraries like Redux and Apollo
>
> Building reusable and scaleable components and documenting in our UX style guides
>
> Using modern technologies and frameworks, including JavaScript and Typescript, to develop large front-end web applications that scale and perform well on all devices
>
> Writing and maintaining unit and integration tests
>
> Using Ruby on Rails to add and modify controllers, models, views, and integrating front-end code into a Rails application”

Thinking ahead to some of the criteria such as remembering users and in my position of having linked a React frontend to a Rails backend this seemed like a good candidate.

The justification I made for Rails, despite it seeming a little heavy as an overhead for the project, I feel it allowed me to prototype the database and relations faster with ActiveRecord’s Rake and Migrate features.

Having previously used Foreman to run both the front and backend simultaneously I decided to go with that again to cut down on amount of terminals needed and also shows logging from both the front and backend.

React in my mind was the best candidate for the frontend as I am familiar with it and the requirements of the projects require the following:

**We have to manage state:**

- The project requirements call for remembering the state of entities such as nominations, search results, isSearching. useState is a perfect way to manage this.
- UseEffect is a perfect candidate for pulling results on load, checking the number of nominations per render and conditionally checking other states of the app with guard clauses
- Ways to pass properties down to child components such as movie results, user information etc.
- Comes with a useDebounce hook that is a perfect candidate for the search bar.
- Methods like hiddden, onClick and other props can give re-usable components more flexibility.
- React Router is a good candidate for navigating between the / and /{GUID} for sharing nominations with other users.

**User Interface — Front End and UX considerations**

Material UI — this is a nice library with a lot of flexibility to edit and customise colours, add different properties to the buttons

We should allow the user to remove nominations and nominate new movies.

What do we limit at 5 nominations, the ability to search, the ability to see nomination buttons? A banner should appear when number of user nominations is equal to 5.

Easy way to map multiple components and make a single component such as nominations and designing a nomination component.

React-UUID library could be used to give a unique slug to users for sharing links.

**Backend Considerations**

Is a backend necessary? Some methods the movie nominations could be held without a backend would include local storage, JSON file, a predefined XML or HTML file that renders out the nominations or even using Redux or a central store in the app. I could have also used a server-less approach with either Firebase or AWS Lambda. I made the choice to use Rails with a Postgres and relational database instead as I feel it gives more flexibility to get data such as how many people have voted, what are the most popular movies and other data querying options in the long run.

Implement sessions/cookies/tokens to remember users choices even if they navigate away from site

Design database to hold user’s nominations and have some way to retrieve data. Normalise data so we are not duplicating movies and make an association from a user to movies via nominations (many to many relationship).

### Solutions

In this section I will be tackling the user stories one by one:

#### **As a user I should be able to search for films to nominate**

This was a fairly straightforward requirement that was solved with a basic axios call to the API:

```javascript
const mainURL = \`http://www.omdbapi.com/?s=${term}&type=movie&page=1&apikey=${process.env.REACT\_APP\_API\_KEY}\`;
```

I set up a .env file to hold the secret key and included a .env.example in the project as follows:

```javascript
REACT_APP_API_KEY = 'YOUR_OMDB_KEY';
```

It’s important to note the API has a query type=movie to limit the return type to movies only as shows, video games and other medium can be returned.

First I set up the above mainURL to hold our query with a dynamic term using a template literal:

```javascript
axios.get(mainURL).then((response) => {

setResults(\[...response.data.Search\]);
console.log(response)

}

});

}, [term]);
```

Then I was able to set the response state object holding our results. Initially I debugged the return object’s structure to see how each movie was laid out

| ![](/images/blog-images/shopify-tech-challenge/1_m4xtJXuLGN5glDswPGmm5Q.png) |
| :--------------------------------------------------------------------------: |
|                 Limiting parameters to just returning movies                 |

This links nicely into the next user story.

#### **Users must be able to see at least a title, year of release and a nominate button**

Now the correct data was coming back I had to figure a way to make the search feel a bit more dynamic. I set up a debounce hook:

```javascript
import { useState, useEffect } from 'react';

export default function useDebounce(input, ms) {
  const [debounced, setDebounced] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(input), ms);

    return () => clearTimeout(timeout);
  }, [input, ms]);

  return debounced;
}
```

This hook essentially acts as a throttle in this case to so we are not making repeated calls to the API. It plugs into the search bar as follows:

```javascript
import React, { useState, useEffect, useCallback } from 'react';

import useDebounce from '../Hooks/useDebounce';

export default function SearchBar(props) {
  const [value, setValue] = useState('');

  const term = useDebounce(value, 400);

  const onSearch = useCallback(props.onSearch, [term]);

  useEffect(() => {
    onSearch(term);
  }, [term, onSearch]);

  return (
    <section className="search">
      <form
        className="search__form"
        onSubmit={(event) => event.preventDefault()}
      >
        <input
          className="radius"
          spellCheck="false"
          placeholder="Search Movies"
          name="search"
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </form>
    </section>
  );
}
```

When any change in the search bar is detected from the top level component the LiveSearch the term is passed down as a prop as well as the OnSearch and events get triggered in the SearchBar file due to the useEffect looking for onSearch(term) and any change to this from our LiveSearch component.

```javascript
<SearchBar onSearch={(term) => setTerm(term)} />

<Results results={results} />

Calls to the api are then throttled with the search term changes at 400ms.

The display of the results is first defined in Movie, to build an individual block.

import React from 'react';

import classnames from 'classnames';

export default function Movie(props) {

const movieInfoClass = classnames('movie\_\_info', {

'movie\_\_info--explicit': props.collectionExplicitness === 'explicit',

return (

<article className="movie">

<img className="movie\_\_thumbnail" src={props.Poster} alt="Movie" />

<div className={movieInfoClass}>

<div className="movie\_\_name">{props.Title}</div>

<div className="movie\_\_artist">{props.Year}</div>

//the button below will be used for the nominations feature

<button className="nominate\_\_btn" onClick={handleClick}>

Nominate

</button>

</div>

</article>

);

}
```

Then to get the final output to display to the user:

```javascript
import React from 'react';

import Movie from './Movie';

export default function Results(props) {
  const { results } = props;

  return results.map((movie) => {
    //guards against an empty movie object and nominate button

    if (movie.Response === 'False') {
      return null;
    }
    //return our movie or movies to display to the user

    return (
      <>
        <Movie key={movie.collectionId} {...movie} />
      </>
    );
  });
}
```

The following result meeting that requirement and user story:

| ![](/images/blog-images/shopify-tech-challenge/1_rppeJ9aRlpVpgEFB6iFpVQ.png) |
| :--------------------------------------------------------------------------: |
|             The final result of this completing this user story              |

The next requirement was a slight bit trickier even with the debouncing in place.

#### **As a user I expect that the list of results will change as I update my search term**

### API Data Limitation

The OMDb has a major limitation on the free tier, you can only retrieve 10 results and if the results exceed a certain number due to putting in a generic term like the letter ‘a’ you will receive this error:

```javascript
{
 "Response": "False",
 "Error": "Too many results."
}
```

How do we work around the fact that the search returns too many results due to the limitation? Ideally it would not be limited but since this is what we are working with we do want to make our search more responsive. Something like a loading panel with a spinner could be beneficial.

The API does have pagination so my first thought was could we limit the amount of results the API sends. Usually APIs have a Max or Offset or Limit option however this did not seem to be the case with OMDb. I tried the pagination option however I was still getting the “Too many results” message.

Initially I just debugged the structure with console logs so I could understand what was going on with the API:

```javascript
axios.get(mainURL).then((response) => {

console.log(response.data);

console.log(response.data.Response);

}
```

With no search result returned this object:

```javascript
results: Array(1)
0: {Response: "False", Error: "Incorrect IMDb ID."}
length: 1

And with “too many results” path:

{Response: "False", Error: "Too many results."}
Error: "Too many results."
Response: "False"
\_\_proto\_\_: Object

The commonality here seemed to be:

response.data.Response === “False”

Thus prompting me to add the following guard clause:

axios.get(mainURL).then((response) => {

if (response.data.Response === 'True') {

setResults(\[...response.data.Search\]);

console.log(response.data);

console.log(response.data.Response);

}
})
```

However this was then only returning results with multiple hits but an amount of hits under the “too many results” number which I believe must be north of 2000+ results. Helpfully the API does return a parameter called “totalResults” if you do successfully get data back:

```javascript
Response: "True"
Search: (10) \[{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}\]
totalResults: "872"
\_\_proto\_\_: Object
```

This is less helpful in the case of “Too many results” as it doesn’t tell you how many were found. I believe this to be a limitation of whatever service the API itself is querying or scraping data from:

User [nnikolov06](https://github.com/nnikolov06) commented [on 22 Oct 2019](https://github.com/omdbapi/OMDb-API/issues/36#issuecomment-545132252):

[OMDb-API/issues/36](https://github.com/omdbapi/OMDb-API/issues/36)

> I don’t know what the implementation is, but I suppose there is some kind of throttling.  
> I can’t find an API for IMDb, so it’s probably based on requests sent to IMDb.

So I decided to do more investigating.

After searching through the API documents and documentation at:

[**Error : Too many results · Issue #164 · omdbapi/OMDb-API**](https://github.com/omdbapi/OMDb-API/issues/164)

and

[http://www.omdbapi.com/](http://www.omdbapi.com/)

I stumbled on this post doing more investigation on Stack Overflow about the API issues:

[**OMDb API multiple results**](https://stackoverflow.com/questions/40340151/omdb-api-multiple-results)

Whilst the implementation of the original posters code was slightly different the question and answer discussed drove me to use the conditional logic to check the fallback and establish a fallback too.

#### Solution Implemented

The solution I implemented was to make use of the other API call by title search or t= as a fallback:

```javascript
//triggers on term changing
useEffect(() => {

const mainURL = \`http://www.omdbapi.com/?s=${term}&type=movie&page=1&apikey=${process.env.REACT\_APP\_API\_KEY}\`;

const fallbackURL = \`http://www.omdbapi.com/?t=${term}&type=movie&apikey=${process.env.REACT\_APP\_API\_KEY}\`;

//our happy path GET request with the s={term} to get multiple results

axios.get(mainURL).then((response) => {

if (response.data.Response === 'True') {

setResults(\[...response.data.Search\]);
//debug to check the structure of the return object

console.log(response.data);

console.log(response.data.Response);
//if we don't meet happy path and we encounter "too many results"

} else if (response.data.Response === 'False') {
//hit our second get request using our fallbackURL with t={term} in

axios.get(fallbackURL).then((response) => {

if (response.data.Response === 'True') console.log(response);
//we don't need to spread in this case since 1 or less results should come back.

setResults(\[response.data\]);

});

}

});

}, \[term\]);
```

This results in the following:

|             ![](/images/blog-images/shopify-tech-challenge/1_vkvU2d7eP00HyJIznZQHbg.gif#.width-800)             |
| :-------------------------------------------------------------------------------------------------------------: |
| The search bar does not hang now as it did previously and utilises both search terms from the API documentation |

I made this decision for two reasons:

One — I think it’s bad UX and doesn’t meet the “Users must be able to see changes to the list of films as their search terms are updated” user story and technical requirement. Especially if the search bar is incapable of updating per keystroke. The user would be sitting there thinking what is going on?

Two — Whilst only returning one result is counter with the letter ‘a’, usually in a debounce or autocomplete situation you would have a mass amount of options, I feel this is potentially the only workaround with this API short of caching all the movie results into our own backend which could be a possibility. In terms of time/cost/performance it arguably makes the most sense to at least encourage the user to type on in this case in my mind.

I will also make a mention to another benefit of using a relational database and backend here, that this opens the options of caching search results. One of the major limitations I had with working with this API is that the search results were only as good as the data present. Searching for ‘A Bugs Life’ for instance returns 0 results as it needs to be spelt ‘a bug’s life’ This is a tricky problem to solve as an algorithm that either adds apostrophes or puts search terms to lower case or looks for a variant of the search term would not be possible with this API and their pre-defined search terms. It may be easier to reason that with the results being cached a backend could have more flexibility using SQL queries with a LIKE or WHERE clause with more detailed parameters.

#### Users must be able to add Movies in search results to their nomination list

This was the next problem to tackle. There are many ways to go about this, it could be done entirely on the front end, it could be implemented as part of the backend too. That opens the need for sessions at this stage and for now I was just developing on the happy path and meeting the base criteria. This criteria also went hand in hand with: **As a user I should be able to nominate a film which will appear in a nomination list**

I decided to take some prescriptive steps:

Re-design the UI and CSS to accommodate for the second row:

| ![](/images/blog-images/shopify-tech-challenge/1_KuEd0M7EoH3j_Oz6Sv8dHg.png) |
| :---------------------------------------------------------------------: |
| Replicate the pattern for Nominations (an array of nominations) and a single nomination (to map out to the right column) |

```javascript
//nominations component
import React from 'react';

import Nomination from './Nomination';

export default function Nominations(props) {
  const { nominations } = props;

  //index is a number in this case

  return nominations.map((nomination, index) => {
    return (
      <>
        <Nomination
          key={index}
          index={index}
          {...nomination}
          deleteNomination={props.deleteNomination}
        />
      </>
    );
  });
}
```

---

```javascript
//nomination component
return (

<article className="nomination">

<img

className="movie\_\_thumbnail"

src={props.movie_poster === 'N/A' ? filmThumbnail : props.movie_poster}

alt="Movie"

/>

<div className={movieInfoClass}>

<div className="movie\_\_name">{props.movie\_title}</div>

<div className="movie\_\_year">{props.movie\_year}</div>

<div>

<Button

className={classes.button}

onClick={handleClick}

variant="contained"

color="secondary"

startIcon={<RemoveCircleIcon />}

\>

Remove

</Button>

</div>

</div>

</article>

);

}
```

Nominations are saved in an array in state:

```javascript
const \[nominations, setNominations\] = useState(\[\]);

//for when a user wants to add a nomination
const addNomination = (movie) => { const newNomination = { Title: movie.Title, Year: movie.Year, Poster: movie.Poster, }; setNominations((prevNominations) => { return \[...prevNominations, newNomination\]; });
```

#### As a user I should be able to un-nominate a film or remove a nomination.

In order to tackle this user story I started by writing a function that handles the deletion:

```javascript
function deleteNomination(id) {
  setNominations((prevNominations) => {
    return prevNominations.filter((nomination, index) => {
      return index !== id;
    });
  });
}
```

I Assigned each nomination an index and id (to satisfy react key props) and used this function taking the index value of the clicked component into this function with filter to go through and find the associated id clicked on and remove that element from the array.

I passed the function down as a prop to the singular nomination component 2 levels down the tree. When the user clicks on the remove button the function is then called in the LiveSearch component that removes that particular movie from the array.

#### Users must not be able to nominate the same movie twice.

For this criteria the Nominate button must be disabled if the movie title on the search results (left) matches any title exactly on the nomination side (right).

We could do this with a conditional render on the Movie component:

```javascript
{isNominated() ? (

<p className="nominated\_label">Nominated</p>

) : (

<Button

className={classes.button}

onClick={handleClick}

startIcon={<AddCircleIcon />}

\>

Nominate

</Button>

)}
```

I had to pass the nominations props down to the movie component so it could access the movie title, movie year and poster and and do a comparison for each nomination in nominations. The check sees if movie title in the results matches the nomination title in the nominations array then conditionally render a nominated label otherwise it displays the nominate button. A problem cropped up with the movie Argo which has the same title with two different entries but two different years. This justifies why I had to have the additional check for year as it is possible that two titles could match because they could be a re-release or re-boot.

#### Users must be able to see a banner when they have 5 nominations in their list.

This requirement was left a bit ambiguous by the challenge creator.

My interpretation of a banner would be a modal popup notifying the user that they have nominated their 5 films and some instructions if they choose to edit (remove existing nominations)

When this condition is met it would imply disabling the nominate button fully if the number of nominations === 5.

I decided to wrap the Movie components existing check in another ternary operator:

```javascript
{props.numNominated !== 5 ? (

<div>

{isNominated() ? (

<p className="nominated\_label">Nominated</p>

) : (

<Button

className={classes.button}

onClick={handleClick}

startIcon={<AddCircleIcon />}

\>

Nominate

</Button>

)}

</div>

) : (

<div>

{isNominated() ? (

<p className="nominated\_label">Nominated</p>

) : null}
```

At the LiveSearch level I passed through the Nomination prop on the Nominations component and to the individual nomination component so when the user clicks the comparison can be made and deleteNomination can be called at the LiveSearch level.

```javascript
nominations = { nominations };
```

| ![](/images/blog-images/shopify-tech-challenge/1_KuEd0M7EoH3j_Oz6Sv8dHg.png) |
| :--------------------------------------------------------------------------: |
|                 Nominated label for movies already nominated                 |

#### As a user I should see a banner when I nominate 5 films

This was another requirement that required state at the LiveSearch level. I first declared another variable numNominations to keep track of the length of the nominations array.

```javascript
const numNominated = nominations.length;
```

Another useEffect in the LiveSearch component checks to see if the number of nominations is === 5 each time the value changes

```javascript
useEffect(() => {
  getNominations();

  if (numNominated === 5) {
    setOpen(true);
  }
}, \[(numNominated, deleteNomination, addNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNominationaddNomination\)]);

// handles close for Modal

const handleClose = () => {
  setOpen(false);
};
```

The modals display state was stored in a useState variable :

```javascript
const \[open, setOpen\] = useState(false);
```

The result looked like this:

| ![](/images/blog-images/shopify-tech-challenge/1_t6fBQtX7Q7mt0PYwd53UQw.gif#.width-800) |
| :-------------------------------------------------------------------------------------: |
|           First iteration of the modal popup when user has nominated 5 films            |

This about wrapped up the base requirements all working on the front end. I wanted to tackle some of the extras on the project which I will talk about in the below section.

### Tackling the Extras

Below are the stretch features outlined by the challenge doc.

#### Extras (Stretch Features)

| ![](/images/blog-images/shopify-tech-challenge/0_EPJBz5n_I4sqjDzb.png) |
| :--------------------------------------------------------------------: |

There is a lot to be improved on here, you can polish the required features by crafting a nicer design, or improve the app by adding new features! Choose something that you feel best showcases your passion and skills.

If you need inspiration, here are examples of what you can work on. If you work on these ideas, **we recommend choosing only one or two**.

- **Save nomination lists if the user leaves the page**
- **Animations for loading, adding/deleting movies, notifications**
- **Create shareable links**

**Remembering Users Nominations List**

I first decided to tackle saving nomination lists if the user leaves the page. This could be all done on the front end with session cookies however I like to build applications that are scaleable, have upgrade options and are long lasting.

Thinking forward to the ‘create shareable links’ requirement it makes sense to handle this on the backend with tokens. This means re-designing the app on the front end and designing a back end system to accommodate users, movie entries and nominations.

I started by designing an Entity Relationship diagram:

|          ![](/images/blog-images/shopify-tech-challenge/1_VuzTJItTZV3V6LvhO-qAYg.png)           |
| :---------------------------------------------------------------------------------------------: |
| _Users can have many nominations and movies can be nominated multiple times by different users_ |

The many to many relationship was the key in normalising movie data so we are not entering the same titles multiple times. Nominations was used as a join table containing user_id and movie_id as foreign keys referencing both users and movies.

I generated migrations and set up my controllers as follows:

```javascript
\# Schema

ActiveRecord::Schema.define(version: 2021_01_14_033303) do

\# These are extensions that must be enabled in order to support this database

enable_extension "plpgsql"

create_table "movies", force: :cascade do |t|

t.string "movie_title"

t.string "movie_year"

t.string "movie_poster"

t.datetime "created_at", precision: 6, null: false

t.datetime "updated_at", precision: 6, null: false

end

create_table "nominations", force: :cascade do |t|

t.bigint "user_id", null: false

t.bigint "movie_id", null: false

t.datetime "created_at", precision: 6, null: false

t.datetime "updated_at", precision: 6, null: false

t.index \["movie_id"\], name: "index_nominations_on_movie_id"

t.index \["user_id"\], name: "index_nominations_on_user_id"

end

create_table "users", force: :cascade do |t|

t.string "access_token"

t.string "slug", limit: 255, default: "0", null: false

t.datetime "created_at", precision: 6, null: false

t.datetime "updated_at", precision: 6, null: false

t.index \["access_token"\], name: "index_users_on_access_token", unique: true

end

add_foreign_key "nominations", "movies"

add_foreign_key "nominations", "users"

end
```

---

```javascript
class User < ApplicationRecord

has_many :nominations, :dependent => :destroy

has_many :nominated_movies, through: :nominations, source: :movie

def self.authenticate_with_credentials(slug)

if @user && @user.authenticate(slug)

return @user

end

nil

end

end
```

The user controller was set up to authenticate using the unique access_token generated on the front end by the UUID module. When a user first visits the page a user is posted to the user route via the App level:

```javascript

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import './styles/App.css';
import LiveSearch from './components/LiveSearch';
import uuid from 'react-uuid';
import Slug from './components/Slug';
export default function App() {
const [state, setState] = useState({
loggedInStatus: 'NOT_LOGGED_IN',
user: {},
});
//posts a user to database and generates unique slug via UUID
const createUser = () => {
axios
.post(
'/api/registrations',
{
slug: uuid(),
},
{
headers: {
authorization: `Token token=${localStorage.getItem(
'access_token'
)}`,
},
},
{ withCredentials: false }
)
.then((response) => {
if (response.data.status === 'created') {
console.log(response.data);
handleSuccessfulAuth(response.data);
}
})
.catch((error) => {
console.log('Error: ', error);
});
};
//sets React state accordingly
const handleSuccessfulAuth = (data) => {
localStorage.setItem('access_token', data.user.access_token);
setState({
loggedInStatus: 'LOGGED_IN',
user: data.user,
});
};
//check if a user exists where access token === access token (in local storage)
const checkLoginStatus = () => {
axios
.get('/api/logged_in', {
headers: {
authorization: `Token token=${localStorage.getItem('access_token')}`,
},
withCredentials: true,
})
.then((response) => {
if (
response.data.logged_in &&
state.loggedInStatus === 'NOT_LOGGED_IN'
) {
setState({
loggedInStatus: 'LOGGED_IN',
user: response.data.user,
});
//catch all clause for setting states correctly
} else if (
!response.data.logged_in &&
state.loggedInStatus === 'LOGGED_IN'
) {
setState({
loggedInStatus: 'NOT_LOGGED_IN',
user: {},
});
}
})
.catch((error) => {
console.log('Error: ', error);
});
};
useEffect(() => {
checkLoginStatus();
//check if there is an access token in the browser
if (!localStorage.getItem('access_token')) {
createUser();
}
}, [state]);
return (
<Router>
<Switch>
<Route
exact
path="/"
render={() => <LiveSearch user={state} />}
></Route>
<Route path="/:slug" component={Slug} />
</Switch>
</Router>
);
}
```

When a user is newly created the route on the backend api/registrations is hit and forwards to the registrations controller

```javascript
class RegistrationsController < ApplicationController

skip_before_action :restrict_access

#creates a user with the params sent from react

def create

@user = User.create!(

slug: params['slug'],

access_token: SecureRandom.hex

)

# confirms creation of the user

if @user

render json: {

status: :created,

user: @user

}

else

render json: { status: 500 }

end

end

end
```

If a user exists (an auth token is present in local storage) the /logged_in route is hit on the backend which is redirected to the sessions controller via routes.rb

```javascript
delete :logout, to: "sessions#logout"

get :logged_in, to: "sessions#logged_in"
```

The session controller then sends the response back to the front end on successful authentication and sets the status of if the user is logged in to LOGGED_IN.

```javascript
class SessionsController < ApplicationController

skip_before_action :restrict_access, only: \[:create, :destroy\]

def new

end

def logged_in

if @current_user

render json: {

logged_in: true,

user: @current_user,

}

else

render json: {

logged_in: false

}

end

end

def logout

@current_user.update_attributes(access_token: nil)

render json: { status: 200, logged_out: true }

end

def create

if @user = User.authenticate_with_credentials(params)

@user.update_attributes(access_token: SecureRandom.hex)

render json: {

status: :created,

logged_in: true,

user: @user

}

end

end

#destroy cookie/session on logout

def destroy

end

end
```

| ![](/images/blog-images/shopify-tech-challenge/1_IP2YRCmz91grW_BTB1kfhA.png) |
| :---------------------------------------------------------------------: |
| access_token generated for user |

Once I had successfully got the app to generate the access_token and find the correct user to verify the LOGGED_IN status I decided to tackle entering entries into the database for movies next.

#### Adding Movies to the Database
```javascript
const addNomination = useCallback((movie) => {

const movieNomination = {

movie_title: movie.Title,

movie_year: movie.Year,

movie_poster: movie.Poster,

};

const user = {

userID: userID,

};

axios

.post('/api/movies',

{

movieNomination,

user,

},

{

headers: {

authorization: `Token token=${localStorage.getItem(

'access_token'

)}`,

},

}

)

.then(() => {

getNominations();

});

}, []);
```

I had to re-write the logic for adding the movie to the stateful nominations variable on the React side from directly adding to the array and instead pulling from the API itself. I will discuss this in more depth further down as it involved making new queries on the backend. For now I just wanted to ensure movies were posting and build on that.

| ![](/images/blog-images/shopify-tech-challenge/1_sKcii_KBjcIa9PSSuYjxUQ.png) |
| :---------------------------------------------------------------------: |
| The final state of the movie data being added to the local db |

I had to put a safeguard in the movies controller on the backend such as a check to see if the movie exists already to stop duplicate entries:

```javascript
def create

if !Movie.exists?(movie_params)

@movie = Movie.create!(movie_params)

end

@movie = Movie.where(movie_title: movie_params\[:movie_title\], movie_year: movie_params\[:movie_year\] ).first

@current_user.nominated_movies << @movie

end

#### Retrieving a users nominations via the Nominations join table

I had to establish the relationships on the backend in Ruby in the users, nominations and movies models:

#user.rb  
has_many :nominations, :dependent => :destroy

\# add a class nominated_movies onto users for easier reference

has_many :nominated_movies, through: :nominations, source: :movie
```

---

```javascript
class Nomination < ApplicationRecord

belongs_to :user

belongs_to :movie

#join nominations and users using the relationshsip with the user_id foreign key

scope :is_nominated, -> (nomination) {joins(:user).where(user_id: users.id)}

end
```
---

```javascript
class Movie < ApplicationRecord

has_many :nominations,

:dependent => :destroy

end
```

The new method on the User class nominated_movies allowed me to create a nomination using the movie information that came in from the backend in a post request to as part of the post request to ‘/api/movies’ in the addNomination function in LiveSearch.

```javascript
def create

if !Movie.exists?(movie_params)

@movie = Movie.create!(movie_params)

end  
#get the record from the query params coming into the route and post the id of that movie via the route established in routes.rb

@movie = Movie.where(movie_title: movie_params\[:movie_title\], movie_year: movie_params\[:movie_year\] ).first

@current_user.nominated_movies << @movie

end

#in routes.rb  
#when the movie/create route is hit make a record in nominations for that movie_id for that user_id.

resources :movies do

put :nomination, on: :member

end
```

For the get request and retrieving nominations I had to implement a query which I worked on in stages first via the SQL editor in DBeaver:

```javascript
-Select all movies  
select * from movies  
- join nominations table  
join nominations  
- using foreign keys  
on movies.id = nominations.movie_id  
-join users table  
join users  
-using foreign keys of nominations table  
on nominations.user_id = users.id  
-for the current user  
where users.slug = 'some-UUID-value' ;
```
| ![](/images/blog-images/shopify-tech-challenge/1_b-h-d-QXoMItVd-iqaeBNw.png) |
| :---------------------------------------------------------------------: |
| *SQL query written in DBeaver returning results from the many to many relationship* |

Then I did some research via [stackoverflow](https://stackoverflow.com/questions/21083625/rails-joining-multiple-tables/21083678) on how to join multiple tables in Rails using activeRecords syntax. The result of my research and modelling a successful query translated to the following on the index route in the movies controller:

```javascript
def index

@movies = Movie.joins(:nominations).select('\*').where(nominations: {user_id: @current_user.id})

render json: @movies.to_json

end
```

As mentioned earlier I had to change the method of storing and adding the nominations on the frontend as now I had to track state from the DB rather than locally as part of implementing the feature to remember a users list of nominations:

```javascript
const getNominations = () => {

axios

.get('/api/movies', {

headers: {

authorization: \`Token token=${localStorage.getItem('access_token')}\`,

},

})

.then((result) => {

setNominations(\[...result.data\]);

});

};

//delete nominations by index from the array

const deleteNomination = useCallback(() => {

getNominations();

}, \[\]);

//for when a user wants to add a nomination

const addNomination = useCallback((movie) => {

const movieNomination = {

movie_title: movie.Title,

movie_year: movie.Year,

movie_poster: movie.Poster,

};

const user = {

userID: userID,

};

axios

.post(

'/api/movies',

{

movieNomination,

user,

},

{

headers: {

authorization: \`Token token=${localStorage.getItem(

'access_token'

)}\`,

},

}

)

.then(() => {

getNominations();

});

}, \[\]);

useEffect(() => {

getNominations();

if (numNominated === 5) {

setOpen(true);

}

}, \[numNominated, deleteNomination, addNomination\]);
```

I had to add the deleteNomination and addNomination as dependencies to the useEffect and as per rules of react wrap the functions inside of useCallback to stop them firing endlessly.

The result of implementing the new structure to save and get nominations fro the database ended up with the following result:

| ![](/images/blog-images/shopify-tech-challenge/1_LchJfNGykr016SWbEwV6cw.gif#.width-800) |
| :---------------------------------------------------------------------: |
| Revisiting and refreshing a page a user has already conducted their votes on |

#### Implementing Shareable Links

An advantage of using the database and creating users in this fashion was that I could generate a slug via React-UUID on a unique users’ first visit to the page on the front end of the app and build a user into the database with this unique slug.

In order to implement the slug or shareable link I had to implement React Router on the front end to create a route such as [https://theshoppies-movie-awards.netlify.app/70b4c0e-111-f3b-51-53bbe685f18](https://theshoppies-movie-awards.netlify.app/70b4c0e-111-f3b-51-53bbe685f18) as well as define the routes and queries on the backend.

```javascript
//App.js return wrapped in Router and Switch routing between / and /:slug

return (

<Router>

<Switch>

<Route

exact

path="/"

render={() => <LiveSearch user={state} />}

\></Route>

<Route path="/:slug" component={Slug} />

</Switch>

</Router>

);

}
```
---
```javascript
#routes.rb  
#redirects users to get/Nominations (nominations controller) when a slug parameter is sent from the front end  
get :slug, to: "nominations#slug"
```
---

```javascript
#nominations_controller.rb

def show

\# takes in a slug from user e.g. http://localhost:3001/api/nominations/7c5dec-e47-4c4e-a3ce-280a3b38ce5b

slug = params\[:id\]

#joins from movies to nominations to user and gets all associated movies by slug

@nominatedMoviesFromSlug = Movie.joins(nominations: :user).where("slug=?", slug).all

render json: @nominatedMoviesFromSlug.to_json

end
```

The above code starts at Movie, joins nominations and user and retrieves each movie by movie_id from the user_id that owns that particular slug has in their nominations.

Again I started off the query incrementally testing in Dbeaver starting by getting all movies and working outwardly to make the query more specific.

To implement the front facing functionality of the slug I decided to pass the user props into the banner component like so:


```javascript
<CompleteBanner

open={open}

numNominated={numNominated}

handleClose={handleClose}

user={props.user}

/>
```

Then in the banner component I could use a template literal with the props to display the user slug:

```javascript
<p>

You can share your nominations by copying this link:

<br></br>

<a href={\`http://localhost:3000/${props.user.user.slug}\`}>

<span className={classes.link}>

localhost:3000/

{props.user.user.slug}

</span>

</a>

</p>
```
The other part of the functionality to actually display a slug page used React Router and I made a Slug component to make a get request to the API based on the slug in the address bar:

```javascript
useEffect(() => {

getTotal();

axios.get(\`api/nominations/${slug}\`).then((response) => {

setNominations(\[...response.data\]);

});

}, \[\]);
```

The result was as follows:

| ![](/images/blog-images/shopify-tech-challenge/1_NDjP6XyMo3b5RuvE3nIL3w.gif#.width-800) |
| :---------------------------------------------------------------------: |
| *Shareable links via a slug can be distributed online and visited by other users.* |

#### Implementing a Spinner Animation

I attempted to tackle another stretch requirement of adding a little animation to the page. I felt that before I implemented the spinner it was hard to see what the search bar was doing. I decided to set this up to be conditionally rendered in the LiveSearch component dependent upon if a search term is present during the useEffect:

I stored the isSearching and setIsSearching in a useState with an initial value of false:

```javascript
const \[isSearching, setIsSearching\] = useState(false);

#UseEffect then triggers when the search term changes

useEffect(() => {

if (term) {

setIsSearching(true);

}

const mainURL = `http://www.omdbapi.com/?s=${term}&type=movie&page=1&apikey=${process.env.REACT_APP_API_KEY}`;

const fallbackURL = `http://www.omdbapi.com/?t=${term}&type=movie&apikey=${process.env.REACT_APP_API_KEY}`;

axios.get(mainURL).then((response) => {

if (response.data.Response === 'True') {

setResults([...response.data.Search]);  
#when the setTimeout in the useDebounce hook is done and we either retrieve search results or no results are found

setIsSearching(false);

} else if (response.data.Response === 'False') {

axios.get(fallbackURL).then((response) => {

if (response.data.Response === 'True') {

setResults([response.data]);

setIsSearching(false);

} else {

setResults([]);

setIsSearching(false);

}

});

}

});

}, [term]);
```
---

```javascript
#if isSearching is true show the spinner

{isSearching && (

<div className="searching">

<p>searching...</p>

<img className="spinner" src={status}></img>

</div>

)}
```

The spinner lives as a static graphic in the public/images directory but is animated to spin 360 degrees using CSS:

```javascript
@keyframes rotate {

100% {

\-webkit-transform: rotate(360deg);

transform: rotate(360deg);

}

}

.spinner {

animation: rotate 1s linear infinite;

height: 2rem;

margin-left: 1rem;

}
```

This shows the Searching… spinner every time the search term changes and the useDebounce() hook is triggered.

| ![](/images/blog-images/shopify-tech-challenge/1_80NF3DyTsbu4H7kQv6gahQ.gif#.width-800) |
| :---------------------------------------------------------------------: |


#### Total number of people who have voted for 5 movies

I decided to add this as a nice little UX feature for the app, as a user it can be a nice thing to see other people using the app.

| ![](/images/blog-images/shopify-tech-challenge/1_88Nf7bVW4BxztG2pxpKWAg.gif#.width-800) |
| :---------------------------------------------------------------------: |
| Total people voted counter dynamically adjusts as people do or do not have 5 total voted movies |

I implemented another backend query in the nominations controller:

```javascript

#get total number of people who have nominated 5 movies

def total

@totalPeopleWith5Nominations = Nomination.group(:user_id).having(count: 5).count

@counted = @totalPeopleWith5Nominations.count

render json: @counted

end
```

This returns a simple hash which contains a data: integer key pair of the count of how many users grouped by user_id having 5 nominations are retrieved. I then use that return number in a template literal with total being stored in a useState with null as the initial value:

```javascript
{total !== null ? (

<p>

<span className="highlight">{total}</span> people have voted for

their favorites.

</p>

) : null}
```
#### A fresh lick of paint

I wanted to give the app a bit more user-friendly feel by using icons and colors in a consistent way. I chose material-ui to handle buttons and themes as there’s a lot of flexibility with what you can do and materialUI icons also allow you to create icon buttons which I thought would make the app a bit easier to use and understand.

```javascript
import React from 'react';

import classnames from 'classnames';

import Button from '@material-ui/core/Button';

import filmThumbnail from '../images/filmdefault.png';

import { makeStyles } from '@material-ui/core/styles';

import AddCircleIcon from '@material-ui/icons/AddCircle';

import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme) => ({

button: {

margin: theme.spacing(1),

backgroundColor: '#00e676',

height: '40px',

'&:hover': {

backgroundColor: 'rgb(0, 161, 82)',

},

},

}));

export default function Movie(props) {

const movieInfoClass = classnames('movie\_\_info', {

'movie\_\_info--explicit': props.collectionExplicitness === 'explicit',

});

const classes = useStyles();

return (

<article className="movie" key={props.id}>

<img

className="movie\_\_thumbnail"

src={props.Poster === 'N/A' ? filmThumbnail : props.Poster}

alt="Movie"

/>

<div className={movieInfoClass}>

<div className="movie\_\_name">{props.Title}</div>

<div className="movie\_\_year">{props.Year}</div>

{props.numNominated !== 5 ? (

<div>

{isNominated() ? (

<p className="nominated\_label">Nominated</p>

) : (

<Button

className={classes.button}

onClick={handleClick}

startIcon={<AddCircleIcon />}

\>

Nominate

</Button>

)}

</div>

) : (

<div>

{isNominated() ? (

<p className="nominated\_label">Nominated</p>

) : null}

</div>

)}

</div>

</article>

);

}
```

Icons, themes and styles from material UI have to be imported, stored as a const and the classes then get applied by using className={classes.classes} on the element you wish to style itself.

The materialUI workflow is very similar to using CSS only you are writing it in the form of an object and with the syntax that materialUI sets out. Instead of background-color: you would use backgroundColor: as notation. The documentation is very detailed for this library with numerous examples being provided on code sandbox and via external users.

| ![](/images/blog-images/shopify-tech-challenge/1_KGC8_O2k2lcX4F6hMmK9Ow.gif#.width-800) |
| :---------------------------------------------------------------------: |

#### Adding OpenGraph cards

Another small feature I wanted to do was to update the index.html create-react-app gives you as standard and customize the icon, description and information the website gives you as well as come up with some relevant information when a user shares a link in social media:

```javascript
<head>

<meta charset="utf-8" />

<link rel="icon" href="%PUBLIC\_URL%/favicon.ico" />

<meta name="viewport" content="width=device-width, initial-scale=1" />

<meta name="theme-color" content="#000000" />

<meta name="Nominate your favorite movies of the year here"

content="Created for the Shopify Front-End Developer Intern (Remote) - Summer 2021 Challenge" />

<link rel="apple-touch-icon" href="%PUBLIC\_URL%/logo192.png" />

<title>The Shoppies Movie Awards</title>

<meta property="og:url" content=https://www.theshoppies.netlifyapp.com />

<meta property="og:type" content="Movie & Entertainment" />

<meta property="og:title" content="The Shoppies - Movie Awards" />

<meta property="og:description" content="​Nominate your favorite movies of the year here." />

<meta property="og:image" content="https://i.imgur.com/SUG2pGw.png" />

<meta property="twitter:image" content="https://i.imgur.com/SUG2pGw.png" />

<meta property="twitter:site" content='https://i.imgur.com/SUG2pGw.png' />

<meta property="twitter:title" content='The Shoppies - Movie Awards' />

</head>
```

I uploaded the banner branding to imgur so it had a host on the website and set the card image source to that image.

| ![](/images/blog-images/shopify-tech-challenge/1_U9dSs8QlEzEPH0qD6E90Lg.gif#.width-800) |
| :---------------------------------------------------------------------: |
| OpenGraph cards appear when sharing the web links online |

#### Making a default image if the movie poster is N/A

I took the decision to come up with a standard image the same way does if album cover artwork is missing on services such as iTunes. To do that I downloaded one of the image covers from my working version of the site:

| ![](/images/blog-images/shopify-tech-challenge/1_ecB-5inikdSqhK_wMpQT2Q.jpeg) |
| :---------------------------------------------------------------------: |
| Movie Thumbnail from OMDB |

Took the movie thumbnail into canva to keep the same dimensions as the above image and edited slightly finding appropriate graphics:

| ![](/images/blog-images/shopify-tech-challenge/1_zN9PgKREOg4tJUGso9FKaQ.png) |
| :---------------------------------------------------------------------: |
| Editing the default_thumbnail in Canva |

| ![](/images/blog-images/shopify-tech-challenge/1_AY9YPdb5kf9IQXMzxrrttA.png) |
| :---------------------------------------------------------------------: |
| Final Default Thumbnail |

I then wrote a conditional check in the movie and nomination:

```javascript
<img

className="movie__thumbnail"

src={props.Poster === 'N/A' ? filmThumbnail : props.Poster}

alt="Movie"

/>
```
if the poster has the value N/A then the default_thumbnail above should render instead.

| ![](/images/blog-images/shopify-tech-challenge/1_vkvU2d7eP00HyJIznZQHbg.gif#.width-800) |
| :---------------------------------------------------------------------: |
| Movies would appear with a broken image and alt text before implementing the default image |

#### Deployment

I decided to deploy the rails backend via Heroku and the front-end on Netlify via the CLIs. I had to make a few changes to the cors file as I was getting a lot of errors to start with because of same-site requests and cross origin resource sharing permissions:

| ![](/images/blog-images/shopify-tech-challenge/1_9MFaFC86K23z5WhZWdyyNw.png) |
| :---------------------------------------------------------------------: |
| Cors and HTTP: issues on the requests |

I had to change my cors configuration in initializers/cors.rb using the rack-cors gem as follows:

```javascript
Rails.application.config.middleware.insert_before 0, Rack::Cors, debug: true, logger: (-> { Rails.logger }) do

allow do

origins '\*'

resource '/cors',

:headers => :any,

:methods => \[:post\],

:max_age => 0

resource '\*',

:headers => :any,

:methods => \[:get, :post, :delete, :put, :patch, :options, :head\],

:max_age => 0

end

end
```

This as well as disabling `{ withCredentials : true }` on the front end requests took care of that problem. The http:// issue when making requests to the OMDB was solved by changing the request link to https:// on the production branch. I decided to branch out my production to a new branch for safety so no bad code would get pushed to the production build.

I also had to write a _redirects file for the Netlify deployment to re-direct requests from netlify.app/api to herokuapp.com/api.

```javascript
/api/* https://myrubyapiandbackend.herokuapp.com/api/:splat 200

/* /index.html 200
```

### Future Improvements

**Add different search filters to the search bar e.g. search by type, year**

Theoretically with the different options the API has available a filter could be built into the search as a dropdown option and applied to the query.

**Add unit testing and integration testing with Jest and Cypress for frontend and Capybara and Rspec on the backend**

I feel this would help during a re-factor process, for making code more generic as well as testing and having confidence in the overall codebase itself. There are a lot of places the codebase can be made more efficient and testing is often makes me think about code from a different perspective.

**Add media queries for mobile responsive layouts**

I had some friends test the code over various computers and mobile devices. Whilst the device did display the site the results were not as pretty as desktop:

| ![](/images/blog-images/shopify-tech-challenge/1_RPqFgFxacqqXv0udsyNZDg.jpeg) |
| :---------------------------------------------------------------------: |

| ![](/images/blog-images/shopify-tech-challenge/1_rNKr0g2Yw8xn_MjrAHQpQg.jpeg) |
| :---------------------------------------------------------------------: |

Whilst the criteria didn’t specify responsiveness it should always be a consideration in UX and UI design as many sites are designed with a mobile first approach.

**Add nomination envelope placeholders when the user has nominations still to make**

This was a feature that would help the user experience a little bit and clue the end user into what the app is expecting from them. Having 5 empty envelopes as placeholders may give more visual clues as to what to do with the app with each envelope transitioning away once a choice is made.

**Cache movie search results in database for faster and more relevant searches/implement pagination for results.**

I alluded to this earlier in the technical write up. Some work would have to be done on both the front and backend to adapt the app to check the internal database first for our cached results as well as falling back to the other search results via OMDB. OMDB has many limitations like data being inaccurate or missing, some tv shows and making ofs getting slated as movies. See this example below:

| ![](/images/blog-images/shopify-tech-challenge/1_qot45_heZCZAglWdArRV7w.png) |
| :---------------------------------------------------------------------: |
| Data is sometimes inaccurate or mis-typed |

This result looks arguably like a stand-up comedian on tour, and whilst this may be the subject of debate I personally would not class this as a movie.

With caching the results our app users are getting paired with either a machine learning algorithm or some form of aggregating the results on the backend the search function could work more efficiently to get over the deficiencies and shortcomings of the API as well as decrease loading times so results show up more rapidly.

The API does offer pagination so it would make sense to cache the first page of results and implement an algorithm that checks if either some or all of the results exist in the database. Potentially on the backend if a search term was received the back end could make the calls to the API to index each page of the results into the database also.

### Conclusion

Overall I have really enjoyed crafting this app and having a chance to tie together all the knowledge I have learned in the past year. I hope this walk through my thought processes can be of use to current and future developers looking to tackle such challenges as well. I hope this outlines some of the considerations and trickier aspects of designing, implementing and deploying a full stack application.

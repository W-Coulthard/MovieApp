const hamburgerButton = document.getElementById('hamburger')
const navList = document.getElementById('nav-list')

function toggleButton() {
    navList.classList.toggle('show')
}

hamburgerButton.addEventListener('click', toggleButton)

//let mybutton = document.getElementById("myBtn");

/*Retrieved Data*/

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');
const movieTitle = urlParams.get('title');
const API_KEY = '25afca5b22e187755c2665b7a304437e'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

console.log(`Movie ID: ${movieId}`);
console.log(`Movie Title: ${movieTitle}`);

const movieContainer = document.querySelector("#main");
const DETAILS_API = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`

function showMovieDetails(data) {
  // Get the movie details from the data returned from the API
  const { poster_path, title, vote_average, overview, cast, release_date, tagline, genres, backdrop_path, runtime, video  } = data
  

  // Create the HTML for the movie details and append to the main element
  movieContainer.innerHTML = `
    <div class="movieContainer">
    <div class="titleImg"><img src="${IMG_PATH + poster_path}" alt="${title}"></div>
    <div class="backdropImg"><img src="${IMG_PATH + backdrop_path}" alt="${title}"></div>
    <div class="movie-info">
      <h3>${title}</h3>
    
      <div class="overview">${overview}</div>
      <div class="rating">Rating: ${vote_average}</div>
      <div class="release_date">Release Date: ${release_date}</div>
      <div class="runtime">${runtime}min</div>
      <div class="genres">Genres: 
      ${genres.map(genre => `<p>${genre.name}</p>`).join('')}
      </div>
      <div class="tagline">${tagline}</div>
      <div class="cast">${cast}</div>
      <div class="video">${video}</div>
      

    </div>
    </div>`
    
    
}


async function getMovieDetails() {
  const res = await fetch(DETAILS_API)
  const data = await res.json()

  showMovieDetails(data)
}

// Call the function to get and show the movie details
getMovieDetails();

//END


const getMovies = (url) => {
  fetch(url)  
  .then(res => res.json())
  .then(data => {
      console.log(data.results)
      showMovies(data.results)
  })  
}

const showMovies = (movies) => {
  main.innerHTML = ''

  movies.forEach((movie) => {
      const { title, poster_path, vote_average, overview, id } = movie

      const movieEl = document.createElement('div')
      movieEl.classList.add('movie')

      movieEl.innerHTML = `
          <img src="${IMG_PATH + poster_path}" alt="${title}">
          <div class="movie-info">
              <h3>${title}</h3>`

      movieEl.addEventListener('click', () => {
        window.location.href = `details.html?id=${id}&title=${title}`
      })
      main.appendChild(movieEl)
  })
}

  /*search bar*/
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm && searchTerm !== '') {
      const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}&language=en-US`
      getMovies(SEARCH_API);
      search.value = '';
  } else {
      window.location.reload();
  }
})
console.log(DETAILS_API)

/*
//Trailer
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;

const trailerButton = document.getElementById("trailer-button");
const trailerContainer = document.getElementById("trailer-container");
const trailer = document.getElementById("trailer");

trailerButton.addEventListener("click", function() {
  trailerContainer.style.display = "block";
  trailer.src = "https://www.youtube.com/watch?v=Q0CbN8sfihY";
});
*/
/*
<button id="trailer-button">Watch Trailer</button>
<div id="trailer-container" style="display: none;">
    <video id="trailer" controls>
      <source src="">
      Your browser does not support the video tag.
    </video>
</div>
*/
/*
ToDo:
1. ...
2. Add trailer
3. css
*/

/*
//Trailer

const trailerButton = document.createElement('button');
trailerButton.innerHTML = 'Watch Trailer';
trailerButton.classList.add('trailer-button');

const movieInfo = document.querySelector('.movie-info');
movieInfo.appendChild(trailerButton);

// Add an event listener to the trailer button
trailerButton.addEventListener('click', () => {
  // Call the function to get the trailer URL from the API
  getTrailerUrl();
});

// Function to get the trailer URL from the API
async function getTrailerUrl() {
  const trailersApi = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`;
  const res = await fetch(trailersApi);
  const data = await res.json();

  // Get the first trailer URL
  const trailerUrl = data.results[0].key;
  console.log(trailerUrl);

  // Do something with the trailer URL, like opening it in a new window
  window.open(`https://www.youtube.com/watch?v=${trailerUrl}`);
}
//Trailer

const trailerButton = document.createElement('button');
trailerButton.innerHTML = 'Watch Trailer';
trailerButton.classList.add('trailer-button');

const movieInfo = document.querySelector('.movie-info');
movieInfo.appendChild(trailerButton);

// Add an event listener to the trailer button
trailerButton.addEventListener('click', () => {
  // Call the function to get the trailer URL from the API
  getTrailerUrl();
});

//Trailer

const trailerButton = document.getElementById("trailer-button");
const trailerContainer = document.getElementById("trailer-container");
const trailer = document.getElementById("trailer");

trailerButton.addEventListener("click", function() {
  trailerContainer.style.display = "block";
  trailer.src = `https://www.youtube.com/watch?v=${movieId}`;
});

//end

async function getTrailerUrl(movieId) {
  // Make a GET request to the API to retrieve the trailer URL
  const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`);
  const data = await response.json();
  const trailerUrl = data.trailerUrl;

  // Play the trailer using the retrieved URL
  const videoPlayer = document.getElementById('videoPlayer');
  videoPlayer.src = trailerUrl;
  videoPlayer.play();
}

        <video id="videoPlayer" width="320" height="240" controls>
            <source id="videoPlayer" src="" type="video/mp4">
            Your browser does not support the video tag.
        </video>

   //Trailer

const trailerButton = document.createElement('button');
trailerButton.innerHTML = 'Watch Trailer';
trailerButton.classList.add('trailer-button');

//const movieInfo = document.querySelector('.movie-info');
movieInfo.appendChild(trailerButton);
// Add an event listener to the trailer button
trailerButton.addEventListener('click', () => {
  getTrailerUrl();
});
// Function to get the trailer URL from the API
async function getTrailerUrl() {
  const trailersApi = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`;
  const res = await fetch(trailersApi);
  const data = await res.json();
  // Get the first trailer URL
  const trailerUrl = data.results[0].key;

  // Do something with the trailer URL, like opening it in a new window
  window.open(`https://www.youtube.com/watch?v=${trailerUrl}`, '_blank');
}
window.open(`https://www.youtube.com/watch?v=${trailers}`, '_blank');
     
//Trailer


const watchTrailer = document.createElement('button');
watchTrailer.innerHTML = 'Watch Trailer';
watchTrailer.classList.add('watch-trailer');
watchTrailer.addEventListener('click', () => {
  const trailer = document.createElement('iframe');
  trailer.src = `https://www.youtube.com/embed/${movieId}`;
  trailer.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
  trailer.frameborder = "0";
  trailer.width = "560";
  trailer.height = "315";
  movieContainer.appendChild(trailer);
});


const detailsSection = document.querySelector(".movie-info");
detailsSection.appendChild(watchTrailer);
      

//Trailer

const trailerButton = document.createElement('button');
trailerButton.innerHTML = 'Watch Trailer';
trailerButton.classList.add('trailer-button');

//const movieInfo = document.querySelector('.movie-info');
movieInfo.appendChild(trailerButton);
// Add an event listener to the trailer button
trailerButton.addEventListener('click', () => {
  getTrailerUrl();
});
// Function to get the trailer URL from the API
async function getTrailerUrl() {
  const trailersApi = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`;
  const res = await fetch(trailersApi);
  const data = await res.json();
  // Get the first trailer URL
  const trailerUrl = data.results[0].key;

  // Do something with the trailer URL, like opening it in a new window
  window.open(`https://www.youtube.com/watch?v=${trailerUrl}`, '_blank');
}
window.

https://www.youtube.com/watch?v=Q0CbN8sfihY
*/ 



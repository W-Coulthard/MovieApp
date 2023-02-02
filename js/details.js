/*hamburger*/

const hamburgerButton = document.getElementById('hamburger')
const navList = document.getElementById('nav-list')

function toggleButton() {
    navList.classList.toggle('show')
}

hamburgerButton.addEventListener('click', toggleButton)



let mybutton = document.getElementById("myBtn");

/*search bar*/

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm && searchTerm !== '') {
        const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=25afca5b22e187755c2665b7a304437e&query=${searchTerm}`
        getMovies(SEARCH_API);
        search.value = '';
    } else {
        window.location.reload();
    }
})

/*Retrived Data*/

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');
const movieTitle = urlParams.get('title');


console.log(`Movie ID: ${movieId}`);
console.log(`Movie Title: ${movieTitle}`);

const movieContainer = document.querySelector("#main");
const API_URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=25afca5b22e187755c2665b7a304437e&language=en-US`

async function getMovieDetails() {
  const res = await fetch(API_URL)
  const data = await res.json()

  showMovieDetails(data)
}

function showMovieDetails(data) {
  // Get the movie details from the data returned from the API
  const { poster_path, title, vote_average, overview, cast, release_date, genres  } = data

  // Create the HTML for the movie details and append to the main element
  movieContainer.innerHTML = `
    <img src="${IMG_PATH + poster_path}" alt="${title}">
    <div class="movie-info">
      <h3>${title}</h3>
      <div class="overview">${overview}</div>
      <div class="rating">${vote_average}</div>
      <div class="cast">${cast}</div>
      <div class="release_date">${release_date}</div>
      <div class="genres">${genres}</div>
    </div>`
}

// Call the function to get and show the movie details
getMovieDetails();





/*API*/
/*
const API_URL = 'https://api.themoviedb.org/3/trending/tv/week?api_key=25afca5b22e187755c2665b7a304437e'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'

const info = document.getElementById('info')
const form = document.getElementById('form')
const search = document.getElementById('search')

// Get initial movies
//getMovies(API_URL)


async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movies) {
    info.innerHTML = ''

    movies.forEach((movie) => {
        const { poster_path, title, vote_average, overview } = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')
        movieEl.innerHTML = `
          <img src="${IMG_PATH + poster_path }" alt="${title}">
          <div class="movie-info">
            <h3>${title}</h3>
            <div class="overview">${overview}</div>
            <div class="rating">${vote_average}</div>
            </div>

          </div>`
        info.appendChild(movieEl)
    })
}

const movieContainer = document.querySelector(".movies");

const displayMovieDetails = movieId => {
  fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=25afca5b22e187755c2665b7a304437e`)
    .then(response => response.json())
    .then(data => {
      // Display the movie details on a separate page
      movieId.innerHTML = `
        <img src="${IMG_PATH + data.poster_path}" alt="${data.title}">

        <div class="movie-info">
            <h3>${data.title}</h3>
            <div class="overview">${data.overview}</div>
            <div class="rating">${data.vote_average}</div>
        </div>
        `;
      console.log(data);
     // showMovies(data.results)
    })
    .catch(error => {
      console.error('An error occurred:', error);
    });
};

const displayMovies = movies => {
  movies.forEach(movie => {
    const movieDiv = document.createElement("div");
    movieDiv.innerHTML = `<img src="${movie.image}" alt="${movie.title}">`;
    movieDiv.addEventListener('click', () => displayMovieDetails(movie.id));
    movieContainer.appendChild(movieDiv);
  });
};

*/


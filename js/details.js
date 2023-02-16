const hamburgerButton = document.getElementById('hamburger')
const navList = document.getElementById('nav-list')

function toggleButton() {
    navList.classList.toggle('show')
}

hamburgerButton.addEventListener('click', toggleButton)

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
const CAST_API = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
const TRAILER_API = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`

function showMovieDetails(data) {
  // Get the movie details from the data returned from the API
  const { poster_path, title, vote_average, overview, cast = [], release_date, tagline, genres, backdrop_path, runtime } = data
  
  let castList = ''
  cast.forEach(actor => {
    castList += `<p>${actor.name}</p>`
  })

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
      <div class="runtime">Runtime: ${runtime}min</div>
      <div class="genres">Genres: 
      ${genres.map(genre => `<p>${genre.name}</p>`).join(', ')}</div>
      <div class="tagline">"${tagline}"</div>
      <div class="cast-list">Cast: </div>
      
    </div>
    </div>`
  
  // Create a "Watch Trailer" button
const trailerButton = document.createElement('button');
trailerButton.innerHTML = 'Watch Trailer';
trailerButton.classList.add('trailer-button');

const movieInfo = document.querySelector('.movie-info');

if (movieInfo) {
  movieInfo.appendChild(trailerButton);
} else {
  console.error('Movie info element not found.');
}

// Function to get the trailer URL from the API
async function getTrailerUrl() {
  const trailersApi = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`;
  const res = await fetch(trailersApi);
  const data = await res.json();

  // Get the first trailer URL
  const trailerUrl = `https://www.youtube.com/watch?v=${data.results[0].key}`;
  console.log(trailerUrl);

  // Do something with the trailer URL, like opening it in a new window
  window.open(trailerUrl);
  
}

// Add event listener to the "Watch Trailer" button
trailerButton.addEventListener('click', getTrailerUrl);

/*Cast API*/
setTimeout(() => {
  fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`)
  .then(response => response.json())
  .then(data => {
  // console.log(data);
  // do something with the cast data
    const cast = data.cast;

const castList = document.createElement('div');
castList.classList.add('cast-list');



cast.forEach(actor => {
  const actorEl = document.createElement('p');
  actorEl.classList.add('actor');
  actorEl.innerText = actor.name;
  castList.appendChild(actorEl);
});

const movieInfoEl = movieContainer.querySelector('.movie-info');
movieInfoEl.appendChild(castList);

  })
  .catch(error => {
    console.error('Error fetching cast data:', error);
  });
}
, 1000);
}
//END

// Function to get the movie details from the API

async function getMovieDetails() {
  const res = await fetch(DETAILS_API)
  const data = await res.json()

  showMovieDetails(data)
}
// Call the function to get and show the movie details
getMovieDetails();

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
      const { title, poster_path, vote_average, overview, id, cast = [] } = movie

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


/*Cast API*/
/*
fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`)
  .then(response => response.json())
  .then(data => {
   // console.log(data);
    // do something with the cast data
    const cast = data.cast;

const castList = document.createElement('div');
castList.classList.add('cast-list');

cast.forEach(actor => {
  const actorEl = document.createElement('p');
  actorEl.classList.add('actor');
  actorEl.innerText = actor.name;
  castList.appendChild(actorEl);
});

const movieInfoEl = movieContainer.querySelector('.movie-info');
movieInfoEl.appendChild(castList);

  })
  .catch(error => {
    console.error('Error fetching cast data:', error);
  });

*/



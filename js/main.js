/*hamburger*/

const hamburgerButton = document.getElementById('hamburger')
const navList = document.getElementById('nav-list')

function toggleButton() {
    navList.classList.toggle('show')
}

hamburgerButton.addEventListener('click', toggleButton)

//Dependencies

const API_URL = 'https://api.themoviedb.org/3/discover/movie?api_key=25afca5b22e187755c2665b7a304437e&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// Get initial movies

getMovies(API_URL);

async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();

    showMovies(data.results);
}

async function getMovieDetails(id) {
    const detailsURL = `https://api.themoviedb.org/3/movie/${id}?api_key=25afca5b22e187755c2665b7a304437e&append_to_response=credits`;
    const detailsRes = await fetch(detailsURL);
    const detailsData = await detailsRes.json();

    return detailsData;
}

function showMovies(movies) {
    main.innerHTML = '';

    movies.forEach(async (movie) => {
      const { id, poster_path, title, vote_average, overview, release_date, media_type } = movie;
      const details = await getMovieDetails(id);
      const cast = details.credits.cast.map(actor => actor.name).slice(0, 5).join(', ');
      const genres = details.genres.map(genre => genre.name).join(', ');
      
      const movieEl = document.createElement('div');
      movieEl.classList.add('movie');
      movieEl.innerHTML = `
        <img src="${IMG_PATH + poster_path}" alt="${title}" data-type="${media_type}">
        <div class="movie-info">
          <h3>${title}</h3>
          <div class="overview">${overview}</div>
          <div class="rating">${vote_average}</div>
          <div class="cast">${cast}</div>
          <div class="release_date">${release_date}</div>
          <div class="genres">${genres}</div>
        </div>`;
      
      movieEl.setAttribute('data-id', id);
      movieEl.setAttribute('data-title', title);
      main.appendChild(movieEl);
      
    });
}

const movieContainer = document.querySelector('.movie-container');

/*Image Links*/

const imgButton = document.querySelector('.main');

imgButton.addEventListener('click', (event) => {
  const target = event.target;
  if (target.tagName === 'IMG') {
    const movieId = target.parentElement.getAttribute('data-id');
    const movieTitle = target.parentElement.getAttribute('data-title');
    const url = `details.html?id=${movieId}&title=${movieTitle}`;
    window.location.href = url;
  }
});

/*search bar*/

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm && searchTerm !== '') {
      const SEARCH_API = `https://api.themoviedb.org/3/search/multi?api_key=25afca5b22e187755c2665b7a304437e&language=en-US&page=1&include_adult=false&query=${searchTerm}`
      getMovies(SEARCH_API);
      search.value = '';
  } else {
      window.location.reload();
  }
})



/*scroll to top*/
/*
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
*/


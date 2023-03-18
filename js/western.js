/*hamburger*/

const nav = document.querySelector(".nav-container");

if (nav) {
  const toggle = nav.querySelector(".nav-toggle");
  
  if (toggle) {
    toggle.addEventListener("click", () => {
      if (nav.classList.contains("is-active")) {
        nav.classList.remove("is-active");
      }
      else {
        nav.classList.add("is-active");
      }
    });
    
    nav.addEventListener("blur", () => {
      nav.classList.remove("is-active");
    });
  }
}

//Dependencies

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');
const movieTitle = urlParams.get('title');
const API_URL = 'https://api.themoviedb.org/3/discover/movie?api_key=25afca5b22e187755c2665b7a304437e&language=en-US&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&page=1&with_genres=37';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

let currentPage = 1;
let totalPages = null;
let isLoading = false;

const navToggle = document.getElementById('nav-toggle');
const navItems = document.querySelector('.nav-items');

navToggle.addEventListener('click', () => {
  navItems.classList.toggle('show');
});

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

async function showMovies(movies) {
  for (const movie of movies) {
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
  }
}


const movieContainer = document.querySelector('.movie-container');

/*scroll to load more*/


let fetching = false;

window.addEventListener('scroll', () => {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight && !fetching) {
    fetching = true;
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=25afca5b22e187755c2665b7a304437e&language=en-US&include_adult=false&include_video=false&page=${currentPage + 1}&with_genres=37`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        showMovies(data.results);
        currentPage++;
        fetching = false;
      })
      .catch(err => console.log(err));
  }
});


function displayMovies(movies) {
  const movieContainer = document.querySelector('.movie-container');
  let movieHTML = '';

  movies.forEach(movie => {
    const { title, poster_path, vote_average } = movie;
    const imageUrl = `https://image.tmdb.org/t/p/w500/${poster_path}`;

    const movieElement = `
      <div class="movie">
        <img src="${imageUrl}" alt="${title}">
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
      </div>
    `;
    movieHTML += movieElement;
  });

  movieContainer.innerHTML += movieHTML;
}


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
      const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=25afca5b22e187755c2665b7a304437e&language=en-US&page=1&include_adult=false&query=${searchTerm}`
      main.innerHTML = ''; // clear existing movies from the main container
      currentPage = 1; // reset current page to 1
      getMovies(SEARCH_API);
      search.value = '';
    } else {
      window.location.reload();
    }
  })
  

//* Scroll to top button*//


document.getElementById("myBtn").style.display = "none";


window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    myBtn.style.display = "block";
  } else {
    myBtn.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


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

const API_URL = 'https://api.themoviedb.org/3/discover/movie?api_key=25afca5b22e187755c2665b7a304437e&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

let currentPage = 1;
let totalPages = null;
let isLoading = false;


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

/*scroll to load more*/

function loadMoreData() {
  if (isLoading || currentPage >= totalPages) {
    return;
  }

  isLoading = true;

  // Make a request to the API to load the next page of data
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=25afca5b22e187755c2665b7a304437e&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&page=${currentPage + 1}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Update the UI with the new data
      const results = data.results;
      results.forEach(result => {
        // Create an HTML element to display the result
        const element = document.createElement('div');
        element.textContent = result.title;
        document.getElementById('results').appendChild(element);
      });

      // Update the variables
      currentPage += 1;
      totalPages = data.total_pages;
      isLoading = false;
    })
    .catch(error => {
      console.error(error);
      isLoading = false;
    });
}

window.addEventListener('scroll', () => {
  const scrollPosition = window.innerHeight + window.scrollY;
  const bodyHeight = document.body.offsetHeight;
  if (scrollPosition >= bodyHeight && !isLoading) {
    loadMoreData();
  } else {
    console.log('Loading more data...');
  }
});

      // Set a flag to track if content is currently being fetched
      let fetching = false;
    
      // Detect when the user has scrolled to the bottom of the page
      window.addEventListener('scroll', () => {
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight && !fetching) {
          // Fetch more content
          fetching = true;
          const resultsContainer = document.getElementById('results');
          const loadingSpinner = document.createElement('div');
          loadingSpinner.classList.add('loading-spinner');
          resultsContainer.appendChild(loadingSpinner);
          fetch('/more-results') // Replace this with the URL of your API endpoint that returns more content
            .then(response => response.json())
            .then(data => {
              // Append the new content to the existing content
              data.forEach(result => {
                const resultElement = document.createElement('div');
                // Populate the resultElement with the new data
                resultsContainer.appendChild(resultElement);
              });
            })
            .catch(error => console.error(error))
            .finally(() => {
              // Remove the loading spinner and reset the fetching flag
              resultsContainer.removeChild(loadingSpinner);
              fetching = false;
            });
        } else if (scrollTop + clientHeight < scrollHeight && fetching) {
          // Stop fetching content if the user has scrolled back up
          fetching = false;
        } else if (scrollTop + clientHeight >= scrollHeight && fetching) {
          // Do nothing if the user has scrolled to the bottom of the page and content is already being fetched
        } else {
          // Do nothing if the user has not scrolled to the bottom of the page
          console.log('Not at the bottom of the page');
        }
      });

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


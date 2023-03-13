//Hamburger Menu

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

/*Retrieved Data*/

const urlParams = new URLSearchParams(window.location.search);
const tv_id = urlParams.get('id');
const movieTitle = urlParams.get('title');
const API_KEY = '25afca5b22e187755c2665b7a304437e'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

console.log(`Movie ID: ${tv_id}`);
console.log(`Movie Title: ${movieTitle}`);

const movieContainer = document.querySelector("#main");
const DETAILS_API = `https://api.themoviedb.org/3/tv/${tv_id}?api_key=${API_KEY}&language=en-US`
const CAST_API = `https://api.themoviedb.org/3/tv/${tv_id}/credits?api_key=${API_KEY}&language=en-US`
const TRAILER_API = `https://api.themoviedb.org/3/tv/${tv_id}/videos?api_key=${API_KEY}&language=en-US`

function showMovieDetails(data) {
  // Get the movie details from the data returned from the API
  const { poster_path, title, first_air_date, original_name, seasons, vote_average, overview, release_date, tagline, genres, backdrop_path, runtime } = data;

  // Create the HTML for the movie details and append to the main element
  movieContainer.innerHTML = `
    <div class="movieContainer">
      <div class="titleImg"><img src="${IMG_PATH + poster_path}" alt="${title}"></div>
      <div class="backdropImg"><img src="${IMG_PATH + backdrop_path}" alt="${title}"></div>
      <div class="movie-info">
        <h3>${original_name}</h3>
        <div class="overview">${overview}</div>
        <div class="rating">Rating: ${vote_average}</div>
        <div class="genres">Genres: ${genres.map(genre => `<p>${genre.name}</p>`).join(', ')}</div>
        <div class="first_air_date"> First Air Date: ${first_air_date}</div> 
        <div class="seasons"> Seasons: ${seasons.length}</div>
      </div>
    </div>
  `;
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
    const trailersApi = `https://api.themoviedb.org/3/tv/${tv_id}/videos?api_key=25afca5b22e187755c2665b7a304437e&language=en-US`;
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

} // End showMovieDetails()

//Cast List
setTimeout(() => {
  fetch(CAST_API)
    .then(response => response.json())
    .then(data => {
      const cast = data.cast;

      // Create the HTML for the cast list and append to the main element

      const castListEl = document.createElement('div');
      castListEl.classList.add('cast-list');
      
      const castHeading = document.createElement('h4');
      castHeading.innerText = 'Cast:';
      castListEl.appendChild(castHeading);
      
      let castList = '';
      cast.forEach((actor, index) => {
        castList += `<p class="cast-member ${index >= 5 ? 'hidden' : ''}">${actor.name}</p>`;
      });
      castListEl.innerHTML += castList;
      

      const moreLink = document.createElement('a');
      moreLink.classList.add('more-link');
      if (cast.length > 5) {
        moreLink.innerText = 'More...';
      } else {
        moreLink.classList.add('hidden');
      }
      castListEl.appendChild(moreLink);

      const movieContainer = document.querySelector('#main');
      const movieInfoEl = movieContainer.querySelector('.movie-info');
      movieInfoEl.appendChild(castListEl);

      // Add a click event listener to the "More..." link
      moreLink.addEventListener('click', event => {
        event.preventDefault();

        // Toggle the "hidden" class on the actors
        castListEl.querySelectorAll('.cast-member:nth-child(n+6)').forEach(actor => {
          actor.classList.toggle('hidden');
        });

        // Toggle the text of the "More..." link
        if (moreLink.innerText === 'More...') {
          moreLink.innerText = 'Less...';
        } else {
          moreLink.innerText = 'More...';
        }
      });
    })
    .catch(error => {
      console.error('Error fetching cast data:', error);
    });
}, 100);


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
      const { title, poster_path, id, } = movie

      const movieEl = document.createElement('div')
      movieEl.classList.add('movie')

      movieEl.innerHTML = `
          <img src="${IMG_PATH + poster_path}" alt="${tv_id}">`

      movieEl.addEventListener('click', () => {
        window.location.href = `details.html?id=${id}&title=${tv_id}`
      })
      main.appendChild(movieEl)
  })
}

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
console.log(DETAILS_API)

//* Scroll to top button*//

// When the user scrolls down 20px from the top of the document, show the button
document.getElementById("myBtn").style.display = "none";


window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    myBtn.style.display = "block";
  } else {
    myBtn.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


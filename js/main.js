
/*hamburger*/

const hamburgerButton = document.getElementById('hamburger')
const navList = document.getElementById('nav-list')

function toggleButton() {
    navList.classList.toggle('show')
}

hamburgerButton.addEventListener('click', toggleButton)



let mybutton = document.getElementById("myBtn");

/*API*/

const API_URL = 'https://api.themoviedb.org/3/trending/movie/week?api_key=25afca5b22e187755c2665b7a304437e'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

// Get initial movies
getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        const { poster_path, title, vote_average, overview, cast, release_date, genres  } = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')
        movieEl.innerHTML = `
          <img src="${IMG_PATH + poster_path}" alt="${title}">
          <div class="movie-info">
            <h3>${title}</h3>
            <div class="overview">${overview}</div>
            <div class="rating">${vote_average}</div>
            <div class="cast">${cast}</div>
            <div class="release_date">${release_date}</div>
            <div class="genres">${genres}</div>
          
          </div>`
        main.appendChild(movieEl)
    })
}

const movieContainer = document.querySelector(".movies");

const displayMovies = movies => {
  movies.forEach(movie => {
    const movieDiv = document.createElement("div");
    movieDiv.innerHTML = `<img src="${movie.image}" alt="${movie.title}">`;
    movieContainer.appendChild(movieDiv);
  });
};

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

/*Image Links*/

const imgButton = document.querySelector('.main');
const url = `details.html`;

imgButton.addEventListener('click', () => {
    window.location.href = url;
    
 //   const movieId = '12345';
 //   const movieTitle = 'The Matrix';
    showMovies;
    
});
console.log(showMovies);








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

/*trending tv api*/
/*
fetch("https://api.themoviedb.org/3/trending/tv/week?api_key=25afca5b22e187755c2665b7a304437e")
  .then(response => response.json())
  .then(data => {
    const list = data.results;
      
    list.map(item => {
      const title = item.name;
      const poster = item.poster_path;
      const tv = `<li><img src="https://image.tmdb.org/t/p/w500${poster}" alt="${title}"></li>`;
      document.querySelector(".tv").innerHTML += tv;
    });
  })
  .catch(error => console.error(error));



/*trending movies api*/
/*
fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=25afca5b22e187755c2665b7a304437e")
  .then(response => response.json())
  .then(data => {
    const list = data.results;

    list.map(item => {
      const title = item.title;
      const poster = item.poster_path;
      const movie = `<li><img src="https://image.tmdb.org/t/p/w500${poster}" alt="${title}"></li>`;
      document.querySelector(".movies").innerHTML += movie;
    });
  })
  .catch(error => console.error(error));
*/

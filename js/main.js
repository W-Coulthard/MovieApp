
/*trending movies api*/

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

/*hamburger*/

const hamburgerButton = document.getElementById('hamburger')
const navList = document.getElementById('nav-list')

function toggleButton() {
    navList.classList.toggle('show')
}

hamburgerButton.addEventListener('click', toggleButton)



let mybutton = document.getElementById("myBtn");





const APIURL =
"https://api.themoviedb.org/4/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const SEARCHAPI =
"https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");



toGetMovies(APIURL);
async function toGetMovies(theUrl){
    await fetch(theUrl)
    .then((response) => response.json())
    .then((data) => {
        // let newDigimon = new Digimon(data[0].name , data[0].level , data[0].img)
       + showMovies(data.results)
       
    });
}


function showMovies(movies) {
    // clear main
    main.innerHTML = "";

    movies.forEach((movie) => {
        const { poster_path, title, vote_average, release_date} = movie;
movie.release_date = movie.release_date.substring(0,4);
console.log(movie.release_date)
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `
            <img
                src="${IMGPATH + poster_path}"
                alt="${title}"
            />
            <div class="movie-info">
                <h3>${title}</h3>
                <p class="Year">${movie.release_date}</p>
                <p class="${getClassByRate(
                    vote_average
                )}  vote">${vote_average} imdb</p>
            </div>
        `;

        main.appendChild(movieEl);
    });
}


function getClassByRate(vote){
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}


form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        toGetMovies(SEARCHAPI + searchTerm);

        search.value = "";
    }
});
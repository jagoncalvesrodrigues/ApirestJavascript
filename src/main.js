const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    },
});

//Utils
function createMovies(movies, container){
    container.innerHTML="";

    movies.forEach(movie => {
        
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
        //esta parte hace que al hacer click en una pelicula cambie el hash del link redirigiendos a
        //la pelicula deseada
        movieContainer.addEventListener('click', () => {
            location.hash = 'movie=' + movie.id;
        })

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path,);

        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer);
    });
}

function createCategories(categories,container){
    container.innerHTML="";

    categories.forEach(category => {


        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', 'id' + category.id);
        categoryTitle.addEventListener('click', ()=>{
            location.hash=(`#category=${category.id}-${category.name}`)
        });
        const categoryTitleText = document.createTextNode(category.name)

        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        container.appendChild(categoryContainer);
    });
}

async function getTrendingMoviesPreview() {
    //ya no hace falta transformar el res a ,json. la variable data la igualamos a la respuesta y es lo mismo
    const { data } = await api('trending/movie/day');
    const movies = data.results;
    console.log(data);

    createMovies(movies,trendingMoviesPreviewList);
}

async function getCategoriesPreview() {
    const { data } = await api('genre/movie/list');

    const categories = data.genres;
    console.log(data);
    
    createCategories(categories,categoriesPreviewList);
}

async function getMoviesByCategory(id){
    const { data } = await api('discover/movie',{
        params:{
            'with_genres': id,
        },
    });
    const movies = data.results;
    console.log(data);

    createMovies(movies,genericSection);
}

async function getMoviesBySearch(query){
    const { data } = await api('search/movie',{
        params:{
            'query':query,
        },
    });
    const movies = data.results;
    console.log(data);

    createMovies(movies,genericSection);
}

async function getTrendingMovies() {
    //ya no hace falta transformar el res a ,json. la variable data la igualamos a la respuesta y es lo mismo
    const { data } = await api('trending/movie/day');
    const movies = data.results;
    console.log(data);

    createMovies(movies,genericSection);
}

async function getMovieById(id) {
    //ya no hace falta transformar el res a ,json. la variable data la igualamos a la respuesta y es lo mismo
    //renovamos el objeto data con el valor Movie
    const { data : movie } = await api('movie/'+id);
    console.log(movie);

    movieImgUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path,
    console.log(movieImgUrl);
    //introducimos la imagen directamente con css
    headerSection.style.background=`
    linear-gradient(
        180deg, 
        rgba(0, 0, 0, 0.35) 19.27%, 
        rgba(0, 0, 0, 0) 29.17%
    ),
        url(${movieImgUrl}
    `;

    movieDetailTitle.textContent=movie.title;
    movieDetailDescription.textContent=movie.overview;
    movieDetailScore.textContent=movie.vote_average;
    
    createCategories(movie.genres, movieDetailCategoriesList);
    getRelatedMoviesId(id);
}

async function getRelatedMoviesId(id){
    const { data } = await api(`movie/${id}/recommendations`);
    const relatedMovies=data.results;

    createMovies(relatedMovies,relatedMoviesContainer);

}
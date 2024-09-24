//estos botones nos van a redirigir a los distintos hash eliminando o haciendo aparecer elementos
//en el html asi parecen distintas paginas
searchFormBtn.addEventListener('click', () => {
    
    location.hash = '#search='+searchFormInput.value;
})

trendingBtn.addEventListener('click', () => {
    location.hash = '#trends';
})

arrowBtn.addEventListener('click', () => {
    //con esto no me regresa al home si no a la pagina anterior 
    history.back();
    //location.hash = '#home';
})

window.addEventListener('DOMContentLoaded', navigator, false);
//para que pueda escuchar el cambio de hash
window.addEventListener('hashchange', navigator, false);

function navigator() {
    console.log({ location })

    if (location.hash.startsWith('#trends')) {
        trendsPage();
    } else if (location.hash.startsWith('#search=')) {
        searchPage();
    } else if (location.hash.startsWith('#movie=')) {
        movieDetailsPage();
    } else if (location.hash.startsWith('#category=')) {
        categoriesPage();
    } else {
        homePage();
    }

    window.scrollTo(0, 0);
}

function homePage() {
    console.log('HOME');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerCategoryTitle.classList.add('inactive');
    headerTitle.classList.remove('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    getCategoriesPreview();
    getTrendingMoviesPreview();
}
function categoriesPage() {
    console.log('CATEGORIES');

    headerSection.classList.remove('header-container--long');
    headerSection.computedStyleMap.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerCategoryTitle.classList.remove('inactive');
    headerTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

      // ['#category', 'id-name']
      //sacamos el id del hash para usarlo en la api
    const [_, categoryData] = location.hash.split('=');
    const [categoryId, categoryName] = categoryData.split('-');

    headerCategoryTitle.innerHTML=categoryName;

    getMoviesByCategory(categoryId);
}
function movieDetailsPage() {
    console.log('MOVIE');

    headerSection.classList.add('header-container--long');
    // headerSection.computedStyleMap.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerCategoryTitle.classList.add('inactive');
    headerTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');

    const [_, id] = location.hash.split('=');
    getMovieById(id);
}
function searchPage() {
    console.log('SEARCHPAGE');

    headerSection.classList.remove('header-container--long');
    headerSection.computedStyleMap.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerCategoryTitle.classList.add('inactive');
    headerTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    // ['#search', 'busqueda']
    const [_, query] = location.hash.split('=');
    getMoviesBySearch(query);
}
function trendsPage() {
    console.log('TRENDS');

    headerSection.classList.remove('header-container--long');
    headerSection.computedStyleMap.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerCategoryTitle.classList.remove('inactive');
    headerTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    headerCategoryTitle.innerHTML='Tendecias';

    getTrendingMovies();
}
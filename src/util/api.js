const fetch = require('node-fetch');
// AWS: 
const baseUrl = 'http://popcornapi-env.vpidtmte25.us-east-2.elasticbeanstalk.com/';
// Local:
// const baseUrl = 'http://localhost:5000/';

const converter = (fetchedMovies) => {
    let movieArray = [];
    for (let j = 0; j < fetchedMovies.movies.length; j++) {
        console.log('Passing through the loop')
        let index = fetchedMovies.movies[j];
        let minusWildCard = index.plot.replace('*', "'")
        movieArray.push({
            id: index.id,
            title: index.title,
            poster: index.poster,
            ratings: {
                imdb: index.rating,
                metaCritic: index.metascore
            },
            runTime: index.runtime + ' mins',
            releaseDate: index.year,
            plot: minusWildCard
        })
    }
    return {movies: movieArray};
};

const Api = {
    async getMovieData(genre, minRating, startYear, endYear, sortOption) {
            console.log(genre, minRating, startYear, endYear, sortOption);
            const response = await fetch(baseUrl+`?genre=${genre}&minrating=${minRating}&startYear=${startYear}&endYear=${endYear}&sortOption=${sortOption}`, {mode: 'cors'})
            .then(response => response.json())
            .then(async jsonResponse => {
                if (!jsonResponse.movies[0] && endYear < 2019) {alert('There are no movies that meet your search criteria! We suggest you make one =). P.S. To buy a time machine from us please contact sales'); return []}
                if (!jsonResponse.movies[0] && endYear === 2019) {alert('There are no movies that meet your search criteria. Hollywood awaits your debut next year!'); return []}
                try {
                    // console.log(jsonResponse);
                    let convertedResponse = converter(jsonResponse);
                    // console.log('Converted Response:'); console.log(convertedResponse)
                    return convertedResponse.movies;
                } catch (error) {console.log(error)}
            });
            return response;
    }
};

export default Api;
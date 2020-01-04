const fetch = require('node-fetch');
// AWS: 
// const baseUrl = 'http://popcornapi-env.vpidtmte25.us-east-2.elasticbeanstalk.com/';
// Local:
const baseUrl = 'http://localhost:5000/';

const converter = (fetchedMovie) => {
    let minusWildCard = fetchedMovie.plot.replace('*', "'")

    return {
        id: fetchedMovie.id, 
        title: fetchedMovie.title, 
        poster: fetchedMovie.poster, 
        ratings: {
            imdb: fetchedMovie.rating, 
            metaCritic: fetchedMovie.metascore
        },
        runTime: fetchedMovie.runtime + ' mins',
        releaseDate: fetchedMovie.year,
        plot: minusWildCard
    }
};

const Api = {
    async getMovieData(genre, minRating, startYear, endYear) {

            const response = await fetch(baseUrl+`?genre=${genre}&minrating=${minRating}&startYear=${startYear}&endYear=${endYear}`, {mode: 'cors'})
            .then(response => response.json())
            .then(async jsonResponse => {
                console.log(jsonResponse)
                if (!jsonResponse.movies[0] && endYear < 2019) {alert('There are no movies that meet your search criteria! We suggest you make one =). P.S. We can lend you a time machine'); return []}
                if (!jsonResponse.movies[0] && endYear === 2019) {alert('There are no movies that meet your search criteria! Hollywood awaits your debut next year!!'); return []}

                try {
                    const movieOne = await jsonResponse.movies[0];
                    const movieTwo = await jsonResponse.movies[1];
                    const movieThree = await jsonResponse.movies[2];

                    console.log(movieOne); console.log(movieTwo); console.log(movieThree); 
                // let queriedResponse = [popcornConversion(await movieOne.json()), popcornConversion(await movieTwo.json()), popcornConversion(await movieThree.json())];
                let convertedResponse = [await converter(movieOne), await converter(movieTwo), await converter(movieThree)];
                console.log(convertedResponse)
                return convertedResponse;
                } catch (error) {console.log(error)}
            });
            return response;
    }
};

export default Api;
import React from 'react';
import Movie from '../Movie/Movie';
import './MovieResults.css';

class MovieResults extends React.Component {
    render() {
        return (
            <div id='MovieResults'>
                {this.props.movies ? this.props.movies.map(movie => <Movie key={movie.id} style={{display: (this.props.poster) ? 'flex': 'block'}} title={movie.title} releaseDate={movie.releaseDate} runTime={movie.runTime} poster={movie.poster} plot={movie.plot} ratings={movie.ratings}/>): null}
            </div>
        )
    }
}


export default MovieResults;
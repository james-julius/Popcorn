import React from 'react';
import './Movie.css';
import IMDb from '../../Resources/IMDb.png' ;
import MetaCritic from'../../Resources/MetaCritic.png';

class Movie extends React.Component {
    getAverage() {
        if (this.props.ratings.metaCritic === 'N/A') {return this.props.ratings.imdb}
        let sum =  (Number(this.props.ratings.imdb) + (Number(this.props.ratings.metaCritic))/10)/2;
        return Math.round(sum * 10)/10;
    }
    

    render() { return (
        <div id='movie-container' key={this.props.id}>
            <div id='info-container'>
                <div className="headsection">
                    <h1 className="left_headsection">{this.props.title}</h1>
                    <span className="header right"><strong id="ratingheader">Rating:</strong></span>
                </div>

                <div className='midsection'> 
                    <span className="left plot"><p className ="flex">{this.props.plot}</p></span>
                    <span className="rating right"><p className="flex">{this.getAverage()}/10</p></span>
                </div>

                <div className="lowsection">
                    <div className="left dateandtime">
                        <span><strong>Release Date:</strong> {this.props.releaseDate}</span> |
                        <span><strong>Runtime:</strong> {this.props.runTime}</span>
                    </div>
                    <div className="right logos">
                        <span><img src={IMDb} height="40em" width="40em" alt="IMDb: "></img> {(this.props.ratings.imdb) ? this.props.ratings.imdb :'N/A'}</span>
                        <span><img src={MetaCritic} height="40em" width="40em" alt="MetaCritic: "></img> {(this.props.ratings.metaCritic) ? this.props.ratings.metaCritic :'N/A'}</span>
                    </div>
                </div>
                
            </div>
            {(this.props.poster) ? <img className="image-container" src={this.props.poster} alt="No poster available"></img>: null}
            
        </div>
        )
    } if 
}

export default Movie;
import React from 'react';
import './Movie.css';
import IMDb from '../../Resources/IMDb.png' ;
import MetaCritic from'../../Resources/MetaCritic.png';

class Movie extends React.Component {
    getAverage() {
        if (this.props.ratings.metaCritic === 'null' || this.props.ratings.metaCritic === 'null\r') {return this.props.ratings.imdb}
        let sum =  (Number(this.props.ratings.imdb) + (Number(this.props.ratings.metaCritic))/10)/2;
        return Math.round(sum * 10)/10;
    }
    

    render() { return (
        <div id='movie-container' key={this.props.id}>
            <div className='left flex-stretch'>
                    <h1 className="header flex-center">{this.props.title}</h1>
                    <span className="left body plot"><p className ="flex">{this.props.plot}</p></span>
                    <div className ="left footer releaseruntime">
                        <span><strong className="releaseDate">Release Date:</strong> {this.props.releaseDate}</span> <span className="separator">|</span> <span><strong>Runtime:</strong> {this.props.runTime}</span>
                    </div>
            </div>

            <div className="middle flex-stretch">
                <span className="header ratingheader flex-center"><h2>Rating:</h2></span>
                <span className="body mainrating-container flex-center"><p className="mainrating flex-center">{this.getAverage()}/10</p></span>
                <div className="footer ratings">
                    <span className="flex-center logos"><img src={IMDb} height="40em" width="40em" alt="IMDb: "></img> {(this.props.ratings.imdb) ? this.props.ratings.imdb :'N/A'}</span>
                    <span className="flex-center logos"><img src={MetaCritic} height="40em" width="40em" alt="MetaCritic: "></img> {(!this.props.ratings.metaCritic || this.props.ratings.metaCritic === 'null\r') ? 'N/A': this.props.ratings.metaCritic}</span>
                </div>
            </div>

            <div className="right poster flex-center">
                {(this.props.poster) ? <img className="right poster" src={this.props.poster} alt="No poster available"></img>: null}
            </div>
        </div>
        )
    } if 
}

export default Movie;
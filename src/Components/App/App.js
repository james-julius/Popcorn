import React from 'react';
import './App.css';
import Api from '../../util/api';
import GenreSelector from '../GenreSelector/GenreSelector';
import RatingSelector from '../RatingSelector/RatingSelector';
import YearSelector from '../YearSelector/YearSelector';
import MovieResults from '../MovieResults/MovieResults';
import PageButtons from '../PageButtons/PageButtons';
import Popcorn from './popcornsmooth.png';
import LoadingGif from '../../Resources/loadingicon.svg';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchActive: false,
      loading: false,
      searchTimeout: false,
      genreSelected: 'Action',
      minRating: 7,
      startYear: 1901,
      endYear: 2019,
      grammar: 'an',
      suggestions: [],
      multipleSuggestions: false,
      allSuggestions: [],
      results: false
    }

    this.changeGenre = this.changeGenre.bind(this);
    this.changeGrammar = this.changeGrammar.bind(this);
    this.changeRating = this.changeRating.bind(this);
    this.getMovies = this.getMovies.bind(this);
    this.handlePopcornClick = this.handlePopcornClick.bind(this);
    this.changeStartYear = this.changeStartYear.bind(this);
    this.changeEndYear = this.changeEndYear.bind(this);
    this.searchTimeout = this.searchTimeout.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  async getMovies() {
    if (this.checkYearParameters()) {
      // Code to make search button disappear
      this.setState({searchTimeout: true, loading: true})
      // Getting results through omdb.js
      const results = await Api.getMovieData(this.state.genreSelected, this.state.minRating, this.state.startYear, this.state.endYear);
      // console.log(results);
      if (this.state.allSuggestions.length > 0) {this.setState({multipleSuggestions: true})}
      const addToAllSuggestions = (newResults) => {
        let workingArray = this.state.allSuggestions
        workingArray.push(newResults);
        this.setState({allSuggestions: workingArray})
        // console.log(this.state.allSuggestions)
      }
      if (results === []) {this.setState({searchActive: false})}
      if (results.length <= 3) {
        addToAllSuggestions(results)
        this.setState({
          suggestions: results,
          searchActive: true,
          loading: false
        })
      }
      else {
        console.log('Results length is not three!')
        let max3Results = results[0] + results[1] + results[2];
        addToAllSuggestions(max3Results)
        this.setState({
          suggestions: max3Results,
          searchActive: true,
          loading: false
        })
      }
      // Once results in, begins 5 sec timer for button to re-appear
      setTimeout(() => {this.searchTimeout()}, 2000)
  } else {alert('You have entered an incorrect year range!')}
  }

  checkYearParameters() {
    return (this.state.endYear > this.state.startYear)
  }

  changeGenre(genre) {
    this.setState({
      genreSelected: genre
    })
    // console.log(this.state)
  }

  changeGrammar(input) {
    this.setState({
      grammar: input
    })
  }

  changeRating(rating) {
    this.setState({minRating: rating})
  }

  changeStartYear(start) {
    this.setState({
      startYear: start
    })
  }

  changeEndYear(end) {
    this.setState({
      endYear: end
    })
  }

  handlePopcornClick(){
    this.setState({
      suggestions: [],
      searchActive: false,
      searchTimeout: false,
      multipleSuggestions: false,
      allSuggestions: []
    })
  }

  handlePageClick(suggestionsIndex) {
    console.log(suggestionsIndex)
    this.setState({suggestions: this.state.allSuggestions[suggestionsIndex -1]})
  }
//SearchTimeout should be set to 4000 when ready
  searchTimeout() {
    setTimeout(() => {
      this.setState({searchTimeout: false})
    }, 100)
  }

  render() {
  return (
    <div className="App">
      <div>
        <img src={Popcorn} style={{height: 150, width: 150}}className={(this.state.searchActive) ?'logo pointer' :'logo'} alt="A popcorn icon with smiley face" onClick={this.handlePopcornClick}></img>
        <h1 style={{cursor: 'default'}}>Welcome to Popcorn</h1>
      </div>
      <div id="optionselector">
        <GenreSelector changeGenre={this.changeGenre} changeGrammar={this.changeGrammar} genre={this.state.genreSelected} grammar={this.state.grammar} />
        <RatingSelector changeRating={this.changeRating} />
        <YearSelector changeStartYear={this.changeStartYear} changeEndYear={this.changeEndYear} startYear={this.state.startYear} endYear={this.state.endYear} />
      </div>
      <button id="getmoviesbutton" onClick={this.getMovies}  className={(this.state.searchActive) ? 'pointer': null} style={{ width: (this.state.searchActive) ? 200: 180, height: (this.state.searchActive) ? 50: 40, display: (this.state.searchTimeout) ? 'none' : 'block'}}> {this.state.searchActive ? "I don't like these. Show me more!" : 'Show me the movies!'}</button>
      <img src={LoadingGif} alt='Bouncing loading icon' style={{height: 80, width: 80, display: (this.state.loading) ? 'inline': 'none'}}/>
      <MovieResults movies={this.state.suggestions}/>
      <PageButtons allSuggestions={this.state.allSuggestions} handleClick={this.handlePageClick} multipleSuggestions={this.state.multipleSuggestions} />
      <span id="githublink" style={{position: (this.state.searchActive) ? 'static' : 'fixed'}}>Created by <a href="https://github.com/Waterways12/">James Darby</a></span>
    </div>
  );
}};

export default App;
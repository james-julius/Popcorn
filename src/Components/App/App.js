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
import SearchOptions from '../SearchOptions/SearchOptions';

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
      sortOption: 'rating DESC',
      pageNum: 0,
      lastPage: null,
      suggestionsPerPage: 5,
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
    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.handleSearchOptionChanges = this.handleSearchOptionChanges.bind(this);
  }

  async getMovies() {
    if (this.checkYearParameters()) {
      // Code to make search button disappear
      this.setState({searchTimeout: true, loading: true})
      // Getting results through api.js
      const results = await Api.getMovieData(this.state.genreSelected, this.state.minRating, this.state.startYear, this.state.endYear, this.state.sortOption);
      console.log(results);
      if (this.state.allSuggestions.length > 0) {this.setState({multipleSuggestions: true})}
        if (results === []) {this.setState({searchActive: false})}
        else {
          this.setState({
            allSuggestions: results,
            searchActive: true,
            loading: false
          })
          this.changePage()
        }
        // Once results in, begins 5 sec timer for button to re-appear
        setTimeout(() => {this.searchTimeout()}, 3000)
      } else {alert('You have entered an incorrect year range!')}
  }

  checkYearParameters() {
    return (this.state.endYear > this.state.startYear)
  }

  changeGenre(genre) {
    this.setState({
      genreSelected: genre
    })
  }

  changeGrammar(input) {
    this.setState({
      grammar: input
    })
  }

  changePage(pageNum) {
    if (this.state.allSuggestions.length < this.state.suggestionsPerPage) {
      console.log('Not enough suggestions to display pages')
      console.log(this.state)
      this.setState({suggestions: this.state.allSuggestions})
    } else {
    let startingIndex = (pageNum) ? pageNum * this.state.suggestionsPerPage : 0;
    let indexesToDisplay = [startingIndex];
    for (let i = 1; i < this.state.suggestionsPerPage; i++) {
      indexesToDisplay.push(startingIndex + i);
    }
    console.log('Indexes to Display: ')
    console.log(indexesToDisplay)
    let mappedMovies = indexesToDisplay.map(index => this.state.allSuggestions[index]).filter(Boolean);
    console.log('Mapped Movies: '+ mappedMovies)
    // console.log(mappedMovies)
    // console.log('Page Num in State:')
    // console.log(this.state.pageNum)
    this.setState({
      suggestions: mappedMovies
    })
  }
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

  handlePageClick(pageNum) {
    // console.log('Handle page click. pageNum = ' + pageNum)
    if (pageNum > -1) {
    this.setState({pageNum: pageNum});
    this.changePage(pageNum);
    console.log(this.state)
    }
  }

  handleSearchOptionChanges(input) {
    // console.log(input)
    if (Number(input) * 0 === 0) {
      this.setState({
        suggestionsPerPage: Number(input)
      }, () => this.getMovies())
    } else {
      this.setState({
        sortOption: input
      }, () => this.getMovies())
      
    }
    console.log(this.state) 
  }

//SearchTimeout should be set to 4000 when ready
  searchTimeout() {
    setTimeout(() => {
      this.setState({searchTimeout: false})
    }, 3000)
  }

  nextPage() {
    let pagesNeeded= Math.floor(this.state.allSuggestions.length / this.state.suggestionsPerPage);
    if (this.state.pageNum < pagesNeeded -1) {
      // console.log(this.state.allSuggestions.length)
      this.setState({pageNum: this.state.pageNum + 1})
      this.handlePageClick(this.state.pageNum + 1)
    }
  }

  prevPage() {
    if (this.state.pageNum > 0) {
      this.setState({pageNum: this.state.pageNum -1})
      this.handlePageClick(this.state.pageNum -1)
    }
  }

  render() {
    return (
      <div className="App">
        <div>
          <img src={Popcorn} style={{height: 150, width: 150}} className={(this.state.searchActive) ?'logo pointer' :'logo'} alt="A popcorn icon with smiley face" onClick={this.handlePopcornClick}></img>
          <h1 style={{cursor: 'default'}}>Welcome to Popcorn</h1>
        </div>
        <div id="optionselector">
          <GenreSelector changeGenre={this.changeGenre} changeGrammar={this.changeGrammar} genre={this.state.genreSelected} grammar={this.state.grammar} />
          <RatingSelector changeRating={this.changeRating} />
          <YearSelector changeStartYear={this.changeStartYear} changeEndYear={this.changeEndYear} startYear={this.state.startYear} endYear={this.state.endYear} />
        </div>
        <div id="search-container">
          <button id="getmoviesbutton" onClick={this.getMovies}  className={(this.state.searchActive) ? 'pointer': null} style={{ width: (this.state.searchActive) ? 200: 180, height: (this.state.searchActive) ? 50: 40, display: (this.state.searchTimeout) ? 'none' : 'block'}}> {this.state.searchActive ? "Search for other movies!" : 'Show me the movies!'}</button>
          <img src={LoadingGif} alt='Bouncing loading icon' style={{height: 80, width: 80, display: (this.state.loading) ? 'inline': 'none'}}/>
          <SearchOptions searchActive={this.state.searchActive} handleSearchOptionChanges={this.handleSearchOptionChanges}/>
        </div>
        <PageButtons allSuggestions={this.state.allSuggestions} needPagination={this.state.allSuggestions.length > this.state.suggestionsPerPage} handleClick={this.handlePageClick} suggestionsPerPage={this.state.suggestionsPerPage} pageNum={this.state.pageNum} nextPage={this.nextPage} prevPage={this.prevPage} changeLastPage={this.changeLastPage}/>
        <MovieResults movies={this.state.suggestions}/>
        <PageButtons allSuggestions={this.state.allSuggestions} needPagination={this.state.allSuggestions.length > this.state.suggestionsPerPage} handleClick={this.handlePageClick} suggestionsPerPage={this.state.suggestionsPerPage} pageNum={this.state.pageNum} nextPage={this.nextPage} prevPage={this.prevPage} changeLastPage={this.changeLastPage}/>
        <span id="githublink" style={{position: (this.state.searchActive) ? 'static' : 'fixed'}}>Created by <a href="https://github.com/Waterways12/">James Darby</a></span>
      </div>
    );
  }
};

export default App;
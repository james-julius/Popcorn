import React from 'react';
import './SearchOptions.css';

class SearchOptions extends React.Component {
    constructor(props) {
        super(props);
        this.handleOptionChanges = this.handleOptionChanges.bind(this);
    }

    handleOptionChanges(event) {
        console.log(typeof(event.target.value))
        this.props.handleSearchOptionChanges(event.target.value)
    }

    render() {
        return (
            <div id="searchoptions" style={{display: (this.props.searchActive) ? 'block' : 'none'}}>
                <span id="results-dropdown">
                    <h3>Results Per Page: </h3>
                    <select onChange={this.handleOptionChanges}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                    </select>
                </span>
                <span id="sortby-dropdown">
                    <h3>Sort By: </h3>
                    <select onChange={this.handleOptionChanges}>
                        <option value='rating DESC'>Rating (High-Low)</option>
                        <option value='rating ASC'>Rating (Low-High)</option>
                        <option value='title ASC'>Title (A-Z)</option>
                        <option value='title DESC'>Title (Z-A)</option>
                        <option value='year DESC'>Release Date (New-Old)</option>
                        <option value='year ASC'>Release Date(Old-New)</option>
                        <option value='runtime DESC'>Runtime (Long-Short)</option>
                        <option value='runtime ASC'>Runtime (Short-Long)</option>
                    </select>
                </span>
          </div>
        )
    }
};

export default SearchOptions;
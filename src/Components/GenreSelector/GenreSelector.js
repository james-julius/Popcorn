import React from 'react';
import '../../Resources/dropdown.css';

class GenreSelector extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.setState = this.setState.bind(this);
    }

    handleChange(event) {
        this.props.changeGenre(event.target.value);
        if (event.target.value === 'Adventure' || event.target.value === 'Animation' || event.target.value === 'Action') {this.props.changeGrammar('an')}
        else { this.props.changeGrammar('a');}
        this.forceUpdate();
    }

    render() { return (
        <div className="dropdown-container">
            <h3>I feel like watching {this.props.grammar}</h3>
            <select onChange={this.handleChange}>
                <option value="Action">Action</option>
                <option value="Adventure">Adventure</option>
                <option value="Animation">Animation</option>
                <option value="Biography">Biography</option>
                <option value="Comedy">Comedy</option>
                <option value="Crime">Crime</option>
                <option value="Drama">Drama</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Family">Family</option>
                <option value="History">History</option>
                <option value="Music">Music</option>
                <option value="Mystery">Mystery</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Romance">Romance</option>
                <option value="Thriller">Thriller</option>
                <option value="War">War</option>
                <option value="Western">Western</option>
                <option value="sci-fi">Sci-Fi</option>
                <option value="horror">Horror</option>
            </select>
            <h3>movie.</h3>
        </div>
    )}
}

export default GenreSelector;
import React from 'react';
import './../../Resources/dropdown.css';

class RatingSelector extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        console.log(event.target.value)
        this.props.changeRating(event.target.value)
    }

    render() { return (
        <div className="dropdown-container">
            <h3>I only want to watch movies with a rating of </h3>
            <select defaultValue="7" onChange={this.handleChange}>
                <option value="1">1/10</option>
                <option value="2">2/10</option>
                <option value="3">3/10</option>
                <option value="4">4/10</option>
                <option value="5">5/10</option>
                <option value="6">6/10</option>
                <option value="7" >7/10</option>
                <option value="8">8/10</option>
                <option value="9">9/10</option>
            </select>
            <h3>and above.</h3>
        </div>
    )}
}

export default RatingSelector;
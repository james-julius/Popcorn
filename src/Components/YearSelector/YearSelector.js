import React from 'react';
import '../../Resources/dropdown.css';

let yearArray = [];
for (let y = 2019; y > 1900; y--) {
    yearArray.push(y);
}
let reverseArray = [];
for (let n = yearArray.length-1; n > -1; n--) {
    reverseArray.push(yearArray[n])
}

class YearSelector extends React.Component {
    constructor(props) {
        super(props);
        this.handleStartChange = this.handleStartChange.bind(this);
        this.handleEndChange = this.handleEndChange.bind(this);
    }

    handleStartChange(event) {
        this.props.changeStartYear(Number(event.target.value));
    }

    handleEndChange(event) {
        this.props.changeEndYear(Number(event.target.value));
    }
    
    render() {
        return (
        <div className="dropdown-container">
            <h3>I only want to watch movies created after</h3>
            <select onChange={this.handleStartChange}>
                    {reverseArray.map(year => <option key={year} value={year}>{year}</option>)}
                </select>
            <h3>and before</h3>
                <select onChange={this.handleEndChange}>
                    {yearArray.map(year => <option key={year} value={year}>{year}</option>)}
                </select>
            <h3>.</h3>
        </div>
    )}
}

export default YearSelector;
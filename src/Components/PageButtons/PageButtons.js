import React from 'react';
import './PageButtons.css';

class PageButtons extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.createButtons = this.createButtons.bind(this);
    }

    handleClick(event) {
        event.persist()
        let toPass = Number(event.target.innerHTML);
        this.props.handleClick(toPass)
    }

    createButtons() {
        let buttonArray = [];
            for (let index = 0; index < this.props.allSuggestions.length; index++) {
                buttonArray.push(index)
            }
        return buttonArray;
    }

    render() {
        return (
            <div id="pagebutton-container" style={{display: (this.props.multipleSuggestions) ? 'inline-flex': 'none'}}>
                {this.createButtons().map(index => {return <button className="pagebutton" onClick={this.handleClick} key={index}>{index+1}</button>})}
            </div>
        )
    }
}
export default PageButtons;
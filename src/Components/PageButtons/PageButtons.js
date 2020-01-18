import React from 'react';
import './PageButtons.css';

class PageButtons extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.createButtons = this.createButtons.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
    }

    handleClick(event) {
        // console.log(event)
        event.persist()
        let pageNumber = Number(event.target.value);
        this.props.handleClick(pageNumber)
    }

    handleNext() {
        this.props.nextPage()
    }

    handlePrev() {
        this.props.prevPage()
    }

    createButtons(startingIndex) {
        console.log(startingIndex)
        let buttonArray = [];
        let pagesNeeded= Math.ceil(this.props.allSuggestions.length / this.props.suggestionsPerPage);
        console.log('Pages Needed: ' +  pagesNeeded)
        // console.log(this.props.allSuggestions); console.log(this.props.suggestionsPerPage);
        // console.log(pagesNeeded);
        if (startingIndex >= 3) {
            for (let index = startingIndex -3; index < pagesNeeded; index++) {
                if (buttonArray.length < 5) {
                    buttonArray.push(index)
                }
            }
        }
        else if (startingIndex < 3) {
            for (let index = 0; index < pagesNeeded; index++) {
                if (buttonArray.length < 5) {
                    buttonArray.push(index)
                }
            }
        }
        else if (startingIndex > pagesNeeded -3) {
            for (let index = pagesNeeded -5; index < pagesNeeded; index++) {
                if (buttonArray.length < 5) {
                    buttonArray.push(index)
                }
            }
        }
        return buttonArray;
    }

    render() {
        return (
            <div id="pagebutton-container">
                <button style={{display: (this.props.needPagination) ? 'block' : 'none'}} className="prevnext" onClick={this.handlePrev}>Prev</button>
                    {this.createButtons(this.props.pageNum).map(index => {return <button className="pagebutton" id={(index === this.props.pageNum) ? 'selected': null} onClick={this.handleClick} key={index} value={index}>{index+1}</button>})}
                <button style={{display: (this.props.needPagination) ? 'block' : 'none'}} className="prevnext" onClick={this.handleNext}>Next</button>
            </div>
        )
    }
}
export default PageButtons;
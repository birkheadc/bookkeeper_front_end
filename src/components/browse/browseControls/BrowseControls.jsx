import React from 'react';
import './BrowseControls.css'

function BrowseControls(props) {

    const handleDateChange = (e) => {
        const date = e.target.value;
        props.handleDateChange(date);
    }

    const handleModeChange = (e) => {
        const mode = e.target.getAttribute('data-mode');
        props.handleModeChange(mode);
    }

    const handleBackButton = () => {
      props.handleDateBack();
    }

    const handleForwardButton = () => {
      props.handleDateForward();
    }

    function highlightActiveButton() {
        const buttons = document.getElementsByClassName('browse-controls-button');
        for (let i = 0; i < buttons.length; i++) {
            const buttonMode = buttons[i].getAttribute('data-mode');
            if (props.mode === buttonMode) {
                buttons[i].classList.add('browse-controls-button-active');
            }
            else {
                buttons[i].classList.remove('browse-controls-button-active');
            }
        }
    }

    highlightActiveButton();
    return(
        <form className='browse-controls-form'>
            <div className='browse-controls-mode-buttons'>
                <button className='browse-controls-button' data-mode='day' onClick={handleModeChange} type='button'>Day</button>
                <button className='browse-controls-button' data-mode='week' onClick={handleModeChange} type='button'>Week</button>
                <button className='browse-controls-button' data-mode='month' onClick={handleModeChange} type='button'>Month</button>
            </div>
            <div className='browse-controls-mode-buttons'>
              <button onClick={handleBackButton} type='button'>{"<"}</button>
              <input onChange={handleDateChange} type='date' value={props.date}></input>
              <button onClick={handleForwardButton} type='button'>{">"}</button>
            </div>
        </form>
    );
}

export default BrowseControls;
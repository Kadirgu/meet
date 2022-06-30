<<<<<<< Updated upstream
import React, { Component } from 'react';

export class NumberOfEvents extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            numberOfEvents: '12'
        })
    }
    changeNumOfEvents = (e) => {
        let newValue = parseInt(e.target.value);
        if ((newValue > 33) || (newValue < 1)) {
            this.setState({
                numberOfEvents: newValue,
                infoText: 'Please choose a number between 1 and 32',
            })
        } else {
            this.setState({
                numberOfEvents: newValue,
                infoText: ' ',
            })
        }
        this.props.updateEvents(undefined, newValue);
    }
=======
import React, { Component } from "react";

class NumberOfEvents extends Component {
    state = {
        numberOfEvents: 32,
    };

    handleInputChanged = (event) => {
        const value = event.target.value;
        this.props.updateNumberOfEvents(value);
        this.setState({ numberOfEvents: value });
    };
>>>>>>> Stashed changes

    render() {
        const { numberOfEvents } = this.state;
        return (
<<<<<<< Updated upstream
            <div className='numberOfEvents' >
                NumberOfEvents
                <input className='number events_number__input'
                    type='number'
                    value={this.state.numberOfEvents}
                    onChange={this.changeNumOfEvents}
=======
            <div className='numberOfEvents'>
                <label>Number of Events: </label>
                <input
                    type='number'
                    id='numberOfEvents__input'
                    value={numberOfEvents}
                    onChange={this.handleInputChanged}
>>>>>>> Stashed changes
                />
            </div>
        )
    }
}

export default NumberOfEvents;
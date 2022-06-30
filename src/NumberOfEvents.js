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

    render() {
        return (
            <div className='numberOfEvents' >
                NumberOfEvents
                <input className='number events_number__input'
                    type='number'
                    value={this.state.numberOfEvents}
                    onChange={this.changeNumOfEvents}
                />
            </div>
        )
    }
}

export default NumberOfEvents;
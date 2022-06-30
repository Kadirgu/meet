import React, { Component } from 'react';
import Event from '../Event'; // in src/__tests__/EventList.test.js

class EventList extends Component {
    render() {
        return (
            <div className="App">
                <CitySearch />
                <EventList events={this.state.events} />
            </div>
        );
    }
}

export default EventList;
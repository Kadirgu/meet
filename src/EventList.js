import React, { Component } from 'react';
<<<<<<< Updated upstream
import Event from '../Event'; // in src/__tests__/EventList.test.js
=======

import Event from '../src/Event'; // in src/EventList.js

>>>>>>> Stashed changes

class EventList extends Component {
    render() {
        const { events } = this.props;
        return (
            <div className="App">
                <CitySearch />
                <EventList events={this.state.events} />
            </div>
        );
    }
}

export default EventList;
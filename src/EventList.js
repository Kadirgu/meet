import React, { Component } from 'react';

import Event from '../src/Event'; // in src/EventList.js


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
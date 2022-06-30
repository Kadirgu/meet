<<<<<<< Updated upstream
import React from 'react';
import './App.css';
import { getEvents, extractLocations } from './api';
=======
import React, { Component } from "react";
import { extractLocations, getEvents } from "./api";
import "./App.css";
import CitySearch from "./CitySearch";
import EventList from "./EventList";
import "./nprogress.css";
import NumberOfEvents from "./NumberOfEvents";
>>>>>>> Stashed changes

class App extends Component {
  state = {
    events: [],
<<<<<<< Updated upstream
    locations: []
  }

  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents
      });
    });
  }
=======
    locations: [],
    currentLocation: "Everywhere",
    numberOfEvents: 32,
  };
>>>>>>> Stashed changes

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

<<<<<<< Updated upstream
  render() {
    return (
      <div className="App">
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
=======
  updateEvents = (
    location = this.state.currentLocation,
    eventCount = this.state.numberOfEvents
  ) => {
    getEvents().then((events) => {
      const locationEvents =
        location === "Everywhere"
          ? events
          : events.filter((event) => event.location === location);

      this.setState({
        events: locationEvents.slice(0, eventCount),
        currentLocation: location,
      });
    });
  };

  updateNumberOfEvents = (numberOfEvents) => {
    this.setState({ numberOfEvents });
    this.updateEvents(this.currentLocation, numberOfEvents);
  };

  render() {
    return (
      <div className='App'>
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <NumberOfEvents updateNumberOfEvents={this.updateNumberOfEvents} />
>>>>>>> Stashed changes
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
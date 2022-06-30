import React, { Component } from "react";
import { extractLocations, getEvents } from "./api";
import "./App.css";
import CitySearch from "./CitySearch";
import EventList from "./EventList";
import "./nprogress.css";
import NumberOfEvents from "./NumberOfEvents";

class App extends Component {
  state = {
    events: [],
    locations: [],
    currentLocation: "Everywhere",
    numberOfEvents: 32,
  };

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
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
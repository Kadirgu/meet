import React, { Component } from "react";
import { extractLocations, getEvents } from "./api";
import "./App.css";
import CitySearch from "./CitySearch";
import EventList from "./EventList";
import "./nprogress.css";
import NumberOfEvents from "./NumberOfEvents";
import { OfflineAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';
import { getEvents, extractLocations, checkToken, getAccessToken } from
'./api';

class App extends Component {
  state = {
    events: [],
    locations: [],
    currentLocation: "all",
    numberOfEvents: 32,
    warningText: '',
    showWelcomeScreen: undefined
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
        location === "all"
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
    if (this.state.showWelcomeScreen === undefined) return <div classname="App" />
    return (
      <div className="App">
      {/* Other components such as CitySearch, EventList,...etc */}
      <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
      getAccessToken={() => { getAccessToken() }} />
      </div>
      );
  }
}

export default App;
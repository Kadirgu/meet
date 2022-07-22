import React, { Component } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import './App.css';
import EventGenre from './EventGenre';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';
import { getEvents, extractLocations, checkToken, getAccessToken } from
  './api';
import { OfflineAlert } from './Alert';
import './nprogress.css';

class App extends Component {
  state = {
    events: [],
    locations: [],
    currentLocation: 'all',
    numberOfEvents: 32, // default value
    warningText: '',
    showWelcomeScreen: undefined
  }

  updateNumberOfEvents = (eventCount) => {
    this.setState({
      numberOfEvents: eventCount
    })
    this.updateEvents(this.state.currentLocation, eventCount);
  }

  updateEvents = (location, eventCount) => {
    getEvents().then((events => {
      if (eventCount !== undefined) {
        this.setState({
          numberOfEvents: eventCount
        })
      }
      // filter event list by location
      let eventList = location !== 'all' ?
        events.filter(event => event.location === location) :
        events

      // Shorten event list
      let shortEventList = eventList.slice(0, this.state.numberOfEvents)

      // Assign value to events state, assign currentLocation
      this.setState({
        events: shortEventList,
        currentLocation: location
      });
    }));
  }

  async componentDidMount() {
    this.mounted = true;
    if (navigator.onLine && !window.location.href.startsWith('http://localhost')) {
      const accessToken = localStorage.getItem('access_token');
      const isTokenValid = (await checkToken(accessToken)).error ? false : true;
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get("code");
      this.setState({ showWelcomeScreen: !(code || isTokenValid) });
      if ((code || isTokenValid) && this.mounted) {
        getEvents().then((events) => {
          if (this.mounted) {
            this.setState({
              events,
              locations: extractLocations(events),
              warningText: ''
            });
          }
        });
      }
    } else {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({
            events,
            locations: extractLocations(events),
            warningText: 'You are offline. The displayed event list may not be up to date.',
            showWelcomeScreen: false
          });
        }
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return { city, number };
    })
    return data;
  };

  render() {
    const { showWelcomeScreen, locations, warningText, events } = this.state;
    if (showWelcomeScreen === undefined) return <div className="App" />
    return (
      <>
        <div className='topBar'>
          <h4 className='appTitle'>Meet App</h4>
          <CitySearch locations={locations} updateEvents={this.updateEvents} />
          <NumberOfEvents updateNumberOfEvents={this.updateNumberOfEvents} />
        </div>
        <div className="App">
          <OfflineAlert id='offlineAlert' text={warningText} />
          <div className='data-vis-wrapper'>
            <EventGenre events={events} />
            <ResponsiveContainer height={400} >
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }} >
                <CartesianGrid />
                <XAxis type="category" dataKey="city" name="city" />
                <YAxis type="number" dataKey="number" name="number of events" allowDecimals={false} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter data={this.getData()} fill="#4A84DA" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <EventList events={events} />
        </div>
        <WelcomeScreen showWelcomeScreen={showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
      </>
    );
  }
}

export default App;
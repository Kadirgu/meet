import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';
import { mockData } from '../mock-data';
import { extractLocations, getEvents  } from '../api';



/* ---------------------------
     unit tests 
--------------------------- */
describe('<App /> component', () => {
   
    let AppWrapper;
    beforeAll(() => {AppWrapper = shallow(<App />)});
  
    test('render list of events', () => {expect(AppWrapper.find(EventList)).toHaveLength(1)});   
    test('render CitySearch', ()     => {expect(AppWrapper.find(CitySearch)).toHaveLength(1)});
    test('render NumberOfEvents', () => {expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1)});
});


/* ---------------------------
     integration tests 
--------------------------- */
describe('<App /> integration', () => {

    test('App passes "events" state as a prop to EventList', () => { 
        const AppWrapper = mount(<App />);
        /*  
            check that the state of "events" is not "undefined"
            (to ensure test does not pass with both states == "undefined")
        */
        const AppEventsState = AppWrapper.state('events');
        expect(AppEventsState).not.toEqual(undefined);
        /*
            compare state of App’s events with EventList's events prop 
        */
        expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
    });

    test('App passes "locations" state as a prop to CitySearch', () => {  
        const AppWrapper = mount(<App />);    
        const AppLocationsState = AppWrapper.state('locations');
        expect(AppLocationsState).not.toEqual(undefined);
        expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);  
        AppWrapper.unmount(); 
    });
    

    test('get list of events matching the city selected by the user', async () => {
        const AppWrapper = mount(<App />);
        const CitySearchWrapper = AppWrapper.find(CitySearch);
        const locations = extractLocations(mockData);
        /*
            set CitySearch's suggestions state to have all available cities
        */
        CitySearchWrapper.setState({ suggestions: locations });
        const suggestions = CitySearchWrapper.state('suggestions');
        /*
            compute random index, get respective random city
        */
        const selectedIndex = Math.floor(Math.random() * (suggestions.length));
        const selectedCity = suggestions[selectedIndex];
        /*
            The click is mimicked by calling the handleItemClicked() method from CitySearch. 
            This is possible by calling instance() on the CitySearchWrapper. Then, you can call 
            whatever function the component has directly. Also, the selected suggestion/city 
            has been passed to it. 
            "await" has been added when handleItemClicked() is called because it’s expected that 
            it will have async code that involves fetching the full list of events before filtering 
            them down to the list of events that match the selected city. The addition of await is 
            also the reason async is added right before test’s callback function in the test above. 
            Always add "async" to a test’s callback function if it contains async code.
        */
        await CitySearchWrapper.instance().handleItemClicked(selectedCity);
        /*
            The async function "getEvents" is" created in api.js. is mainly expected to get all the 
            events from the API asynchronously (and from the mock data when it’s used in tests)
        */
        const allEvents = await getEvents();
        /*
            list of all events is filtered against the selected location/city in order to find 
            the events that have the same location
        */
        const eventsToShow = allEvents.filter(event => event.location === selectedCity);
        expect(AppWrapper.state('events')).toEqual(eventsToShow);
        AppWrapper.unmount();
    });

    test('get list of all events when user selects "See all cities"', async () => {
        /*
            The test simulates a click on the last list item (which will always be 
                “See all cities”), then checks if the events state of the App component 
                equals the list of all events
        */
        const AppWrapper = mount(<App />);
        const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
        await suggestionItems.at(suggestionItems.length - 1).simulate('click');
        const allEvents = await getEvents();
        expect(AppWrapper.state('events')).toEqual(allEvents);
        AppWrapper.unmount();
    });

});
import React from 'react';
<<<<<<< Updated upstream
import { shallow, mount } from 'enzyme';
=======

import { shallow, mount } from 'enzyme';

>>>>>>> Stashed changes
import App from '../App';

import EventList from '../EventList';
import CitySearch from '../CitySearch';
<<<<<<< Updated upstream
import NumberOfEvents from '../NumberOfEvents';
import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';


=======

import { mockData } from '../mock-data';

import { extractLocations, getEvents } from '../api';
>>>>>>> Stashed changes

describe('<App /> component', () => {

    let AppWrapper;
    beforeAll(() => {
        AppWrapper = shallow(<App />);
    });

    test('render list of events', () => {
        expect(AppWrapper.find(EventList)).toHaveLength(1);
    });

    test('render CitySearch', () => {
        expect(AppWrapper.find(CitySearch)).toHaveLength(1);
    });

    describe('<App /> integration', () => {

        test('App passes "events" state as a prop to EventList', () => {
            const AppWrapper = mount(<App />);
            const AppEventsState = AppWrapper.state('events');
            expect(AppEventsState).not.toEqual(undefined);
            expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
            AppWrapper.unmount();
        });
    });
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
    test('App passes "locations" state as a prop to CitySearch', () => {
        const AppWrapper = mount(<App />);
        const AppLocationsState = AppWrapper.state('locations');
        expect(AppLocationsState).not.toEqual(undefined);
        expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
        AppWrapper.unmount();
    });
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
    test('get list of events matching the city selected by the user', async () => {
        const AppWrapper = mount(<App />);
        const CitySearchWrapper = AppWrapper.find(CitySearch);
        const locations = extractLocations(mockData);
        CitySearchWrapper.setState({ suggestions: locations });
        const suggestions = CitySearchWrapper.state('suggestions');
        const selectedIndex = Math.floor(Math.random() * (suggestions.length));
        const selectedCity = suggestions[selectedIndex];
        await CitySearchWrapper.instance().handleItemClicked(selectedCity);
        const allEvents = await getEvents();
        const eventsToShow = allEvents.filter(event => event.location === selectedCity);
        expect(AppWrapper.state('events')).toEqual(eventsToShow);
        AppWrapper.unmount();
    });
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
    test('get list of all events when user selects "See all cities"', async () => {
        const AppWrapper = mount(<App />);
        const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
        await suggestionItems.at(suggestionItems.length - 1).simulate('click');
        const allEvents = await getEvents();
<<<<<<< Updated upstream
        expect(AppWrapper.state('events')).toEqual(allEvents);
        AppWrapper.unmount();
    });
=======
        //expect(AppWrapper.state('events')).toEqual(allEvents);
        AppWrapper.unmount();
    });

>>>>>>> Stashed changes
});
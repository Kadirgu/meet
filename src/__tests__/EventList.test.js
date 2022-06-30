import React from 'react';
import { shallow } from 'enzyme';
<<<<<<< Updated upstream

import EventList from '../Components/EventList/EventList';
import Event from '../Components/Event/Event'
import { mockData } from '../mock-data';

describe('<App /> integration', () => {
    test('App passes "events" state as a prop to EventList', () => {
        const AppWrapper = mount(<App />);
        const AppEventsState = AppWrapper.state('events');
        expect(AppEventsState).not.toEqual(undefined);
        expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
        AppWrapper.unmount();
    });
});
=======
import EventList from '../EventList';

import { mockData } from '../mock-data';

import Event from '../Event'; // in src/__tests__/EventList.test.js

describe('<EventList /> component', () => {

    test('render correct number of events', () => {
        const EventListWrapper = shallow(<EventList events={mockData} />);
        expect(EventListWrapper.find(Event)).toHaveLength(mockData.length);
    });

});
>>>>>>> Stashed changes

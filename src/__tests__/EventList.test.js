import React from 'react';
import { shallow } from 'enzyme';

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

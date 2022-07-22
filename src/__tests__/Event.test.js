import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {

    let EventWrapper;
    // run tests on first mockData element
    beforeAll(() => {
        EventWrapper = shallow(<Event event={mockData[0]} />);
    });

    /* -------------------------------------------------------------------
            FEATURE 2: SHOW / HIDE AN EVENT'S DETAILS
    ---------------------------------------------------------------------*/

    /* ----------------- SCENARIO 1 --------------------------------------: 
    An event element is collapsed by default.
    ---------------------------------------------------------------------*/
    test('render event', () => {
        expect(EventWrapper.find('.event')).toHaveLength(1);
    });

    test('render title', () => {
        expect(EventWrapper.find('.title')).toHaveLength(1);
    });

    test('render start time', () => {
        expect(EventWrapper.find('.start-time')).toHaveLength(1);
    });

    test('render location', () => {
        expect(EventWrapper.find('.location')).toHaveLength(1);
    });

    test('render button for details', () => {
        expect(EventWrapper.find('.btn-toggle-details')).toHaveLength(1);
    });

    test('event is collapsed by default', () => {
        expect(EventWrapper.state('collapsed')).toBe(true);
    });


    /* ----------------- SCENARIO 2 --------------------------------------: 
    User can expand an event to see its details.
    ---------------------------------------------------------------------*/
    test('expand event details on click', () => {
        EventWrapper.setState({ collapsed: true });
        EventWrapper.find('.btn-toggle-details').simulate('click');
        expect(EventWrapper.state('collapsed')).toBe(false);
    });


    /* ----------------- SCENARIO 3 --------------------------------------: 
    User can collapse an event to hide its details.
    ---------------------------------------------------------------------*/
    test('collapse event details on click', () => {
        EventWrapper.setState({ collapsed: false });
        EventWrapper.find('.btn-toggle-details').simulate('click');
        expect(EventWrapper.state('collapsed')).toBe(true);
    });
    
}); 



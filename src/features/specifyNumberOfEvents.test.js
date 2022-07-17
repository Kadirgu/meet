import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount } from 'enzyme';
import App from '../App';
import { mockData } from '../mock-data';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {

    let AppWrapper;
    test('When user hasnt specified a number, 32 is the default number.', 
        ({ given, when, then }) => {
            given('the user has started a search', () => { });

            when('the users did not specify a number', () => { 
                AppWrapper = mount(<App />);
            });

            then('thirtytwo should be the default number', () => {
                AppWrapper.update();
                expect(AppWrapper.find(".event")).toHaveLength(mockData.length);
            });
        }
    );

  
    test('User can change the number of events they want to see.', 
        ({ given, when, then }) => {
            given('the user has started a search', async () => {
                AppWrapper = await mount(<App />);
            });

            when('the user enters a number into the \'show max\' field', () => {
                AppWrapper.update();
                AppWrapper.find('.number-of-events').simulate('change', {target: {value: 2}})
            });

            then('the number of listed events should update accordingly', () => {
                expect(AppWrapper.find('.event')).toHaveLength(2);
            });
        }
    );

});
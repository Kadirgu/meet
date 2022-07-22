import React, { Component } from 'react';
import { InfoAlert } from './Alert';

class CitySearch extends Component {
    state = {
        query: '',
        suggestions: [],
        showSuggestions: undefined,
        infoText: ''
    };

    handleInputChanged = event => {
        const value = event.target.value;
        const suggestions = this.props.locations.filter((location) => {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        });
        // If no suggestions are found, display info text, else set the suggestions variable
        if (suggestions.length === 0) {
            this.setState({
                query: value,
                infoText: 'We cannot find the city you are looking for. Please try another city.'
            })
        } else {
            return this.setState({
                query: value,
                suggestions,
                infoText: ''
            });
        }
    }

    handleItemClicked = (suggestion) => {
        this.setState({
            query: suggestion,
            showSuggestions: false,
            infoText: ''
        });
        this.props.updateEvents(suggestion, undefined);
    }

    render() {
        return (
            <div className='CitySearch'>
                <InfoAlert id='infoAlert' text={this.state.infoText} />
                <input
                    type='text'
                    className='city'
                    placeholder='Search for location'
                    value={this.state.query}
                    onChange={this.handleInputChanged}
                    onFocus={() => { this.setState({ showSuggestions: true }) }}
                />
                <ul className='suggestions' style={this.state.showSuggestions ? {} : { display: 'none' }}>
                    {this.state.suggestions.map(suggestion => (
                        <li key={suggestion} onClick={() => this.handleItemClicked(suggestion)}>{suggestion}</li>
                    ))}
                    <li key='all' onClick={() => this.handleItemClicked('all')}>
                        <b>See all cities</b>
                    </li>
                </ul>
            </div>
        )
    }
}

export default CitySearch;
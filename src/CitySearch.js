import React, { Component } from 'react';

<<<<<<< Updated upstream
/*Component where User can select a city from the list of suggestions*/
class CitySearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            suggestions: [],
            showSuggestions: undefined
        }
    }
=======

class CitySearch extends Component {
    state = {
        query: '',
        suggestions: [],
        showSuggestions: undefined
    };
>>>>>>> Stashed changes

    handleInputChange = (event) => {
        const value = event.target.value;
        const suggestions = this.props.locations.filter((location) => {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        })
        this.setState({
            query: value,
            suggestions,
        });
<<<<<<< Updated upstream
    }

    handleItemClick = (suggestion) => {
        this.setState({
            query: suggestion,
            showSuggestions: false
        })
        //triggers function of parent component <App/>
        this.props.updateEvents(suggestion)
    }
=======
    };
>>>>>>> Stashed changes

    handleItemClicked = (suggestion) => {
        this.setState({
            query: suggestion,
            showSuggestions: false
        });

        this.props.updateEvents(suggestion);
    }

    render() {
        return (
<<<<<<< Updated upstream
            <div className='CitySearch' >
                <input type='text'
                    className='city'
                    value={this.state.query}
                    onChange={this.handleInputChange}
                    onFocus={() => { this.setState({ showSuggestions: true }) }}
                />
                <ul
                    className='suggestions'
                    style={this.state.showSuggestions ? {} : { display: 'none' }}>
                    {this.state.suggestions.map((suggestion) => (
                        <li key={suggestion}
                            onClick={() => this.handleItemClick(suggestion)} >
                            {suggestion}</li>
                    ))
                    } <li onClick={() => this.handleItemClick('all')} >
                        <b> See all cities </b>
=======
            <>
                <div className="CitySearch text-muted">In which city would you like to join?</div>
                <input
                    type="text"
                    className="city mt-3"
                    value={this.state.query}
                    onChange={this.handleInputChanged}
                    onFocus={() => { this.setState({ showSuggestions: true }) }}
                />
                <ul className="suggestions" style={this.state.showSuggestions ? {} : { display: 'none' }}>
                    {
                        this.state.suggestions.map((suggestion) => (
                            <li
                                key={suggestion}
                                onClick={() => this.handleItemClicked(suggestion)}>{suggestion}</li>
                        ))}
                    <li onClick={() => this.handleItemClicked("Everywhere")}>
                        <b>See all cities</b>
>>>>>>> Stashed changes
                    </li>

                </ul>
<<<<<<< Updated upstream
            </div >
        )
=======
            </>
        );
>>>>>>> Stashed changes
    }
}

export default CitySearch;
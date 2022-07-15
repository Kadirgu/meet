import React, { Component } from 'react';

class Event extends Component {
    state = {
        collapsed: true
    };

    handleClick = () => {
        this.setState({ collapsed: !this.state.collapsed })
    };


    toggleBtnText = () => {
        return `${this.state.collapsed 
            ? 'SHOW DETAILS' 
            : 'HIDE DETAILS'
        }`;
    };

    render() {
        const { event } = this.props;

        return (
            <div className="event">
                <h3 className="title">{event.summary}</h3>
                <div className="fb-date-location">
                    <p className="start-time">
                        {event.start.dateTime.slice(0,10)}                  
                    </p>
                    
                    <p className="location">{event.location}</p>  

                </div>

                <button 
                    className="btn-toggle-details" 
                    onClick={this.handleClick}>
                    {this.toggleBtnText()}
                </button>            
                {!this.state.collapsed && (
                    <div className="event-details">
                        {event.description}
                        <p>
                            <a className="link" 
                                target="_blank" 
                                href="{event.htmlLink}"> 
                                Add to my Calendar
                            </a>
                        </p>                       
                    </div>                   
                )}               
            </div>
        );
    }
}
export default Event;
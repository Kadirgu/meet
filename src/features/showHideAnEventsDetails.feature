Feature: Show/hide an events details

Scenario: An event element is collapsed by default.
Given user hasnt searched for any city
When the user opens the app
Then all resulting elements should be collapsed by default

Scenario: User can expand an event to see its details.
Given the user has started a search
When the user clicks on the 'show details' button
Then the user should see the details
	
Scenario: User can collapse an event to hide its details.
Given the user has opened an events' details
When the user clicks the 'hide details' button
Then events' details should collapse
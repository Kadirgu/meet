Feature: Specify numver of events

Scenario: When user hasnt specified a number, 32 is the default number.
Given the user has started a search
When the users did not specify a number
Then thirtytwo should be the default number
	
Scenario: User can change the number of events they want to see.
Given the user has started a search
When the user enters a number into the 'show max' field
Then the number of listed events should update accordingly
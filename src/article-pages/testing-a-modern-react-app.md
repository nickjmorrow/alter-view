---
path: '/testing-a-modern-react-app'
date: '2020-06-20'
title: 'Testing a modern react app.'
---

## Why

-   build confidence / help you sleep at night
-   save time / "scream" as soon as a regression happens, right next to the regression

## Essentials

-   unit testing complex logic that you can't reason through at a glance
-   integration testing the whole application

## PreTesting

-   prettier, formatting
-   linting / code quality

## Testing Categories

JavaScript-focused

1. Unit testing pure logic

React-focused

1. Rendering component trees and asserting output
2. Visual regressions of the component
3. Running a complete app (end-to-end)

Redux-focused

3. Testing whether an action creator made the correct action
4. Testing async logic, like "given a mocked API that returns x data from y endpoint, when I dispatch w redux action, is z data eventually loaded into the store"
5. Testing reducers, like "given this series of actions that are applied through the reducer to the store, let me assert the end result of the store"
6. Testing a contract between the FE and BE - given a set of API endpoints, is all the actual data that is coming back what I expect it to be? This lets you not have to suss out contract breakage via e2e tests that could fail due to changes in the UI

"Output"/external focused

7. Web performance test
8. Accessibility test

TODO: styled components testing?

## Testing Scenarios and how we'd break them down

"I want to give different inputs to this password text input and test the results it shows and that it blocks the user"

"I want to know whether my app will fundamentally load for a user"

"I want to test that all authenticated routes are really off-limits to the user and that they're redirected to a login route if they try to go to them."

"I just changed my button component so that it doesn't have any margin. I want to be forced to recheck every component that used a button so I can ensure they still look normal."

"I just wrote a checkbox-group component, where when the user clicks a checkbox, that checkbox is selected or deselected, and I want to assert the behavior of the component when it lists out all of the checkboxes"

"When I click the submit button on my CreateTodo component, I want to assert that the current redux state is updated"

"I want to unit test that after some action is dispatched, that a redux-saga makes a request to a fake API and gets back some info and puts it into Redux state"

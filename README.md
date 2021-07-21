# HashiCorp Humans!

## Overview

This project follows the spec at this [Figma link](https://www.figma.com/file/xGicP4qkXbMhte4LAYxC4X/HashiCorp---Technical-Screen?node-id=2%3A973) in order to build a mock page to render an employee directory for HashiCorp. It consumes a GraphQL API that returns the first 100 people from an endpoint, as well as a list of the departments at HashiCorp.

This app has the following features built:

- Collapsed department list sidebar that handles expansion on sub-departments recursively
- Departments are organized on frontend recursively to sort by sub-department with Lodash
- People are rendered in view with fallback default Avatar image
- A checkbox input filters people with no profile image out
- An individual department chosen via clicking the sidebar filters people to just that department
- Filtered results update as you type, searching by name only, with a debounce so the page does not refresh too rapidly per keystroke (1sec debounce)
- Multiple filters can be used simultaneously including search
- Views on mobile are responsive (can see them shown in the demo)

## How to run the app locally

Run `npm install` then `npm start`, and visit `http://localhost:3000/people` for the directory.

## App Demo

![GIF of PR 1 progress](https://media.giphy.com/media/WzkUIfJ6MsLsssT56J/giphy.gif)

## Issues and other considerations

I spent the bulk of my time (~10 hours) meeting the Figma spec and coding the baseline functionality. The only issue from the baseline spec that I had at the end was getting a list item image to use a custom caret image png asset. I used a `>` character as the placeholder instead in the interest of time.

Had I had more time, the first area I would've focused was testing. I've used [Enzyme](https://enzymejs.github.io/enzyme/), often with [Jest]() for testing React components, and it would be my tool of choice for ensuring each component renders correctly in various scenarios depending on what props are passed to it. I would test basic scenarios with no people passed to the `<PeopleCards />` component, for the empty result set view, and 1 to many people rendering.

I would also cover with an event-based interaction test the usage of each type of filter, from department sidebar filtering to typing in the search bar to filtering out people without profile images, both individually and filtered in combinations. Jest provides many types of assertions and test running scenarios we can run for frontend testing.

From an accessibility standpoint, I would also take this app a step further.

### A note on the repository name

I took Github's first repository name suggestion!

![Github's repository name suggestion](https://user-images.githubusercontent.com/10353221/125868090-42829ca4-6a6e-401b-8724-a62ff0f0f28d.png)

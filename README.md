# HashiCorp Humans!

## Overview

This project follows the spec at this [Figma link](https://www.figma.com/file/xGicP4qkXbMhte4LAYxC4X/HashiCorp---Technical-Screen?node-id=2%3A973) in order to build a mock page to render an employee directory for HashiCorp. It consumes a GraphQL API that returns the first 100 people from an endpoint, as well as a list of the departments at HashiCorp.

This app has the following features built:

- Collapsed department list sidebar that handles expansion on sub-departments recursively
- Departments are organized on frontend recursively to sort by sub-department with Lodash
- People are rendered in view with fallback default Avatar image
- A checkbox input filters people with no profile image out
- An individual department chosen via clicking the sidebar filters people to just that department
- Filtered results update as you type, searching by name only, with a debounce so the page does not refresh too rapidly per keystroke (1 second debounce)
- Multiple filters can be used simultaneously including search
- Views on mobile are responsive (can see them shown in the demo), for both tablet and phone sizes

## How to run the app locally

Run `npm install` then `npm start`, and visit `http://localhost:3000/people` for the directory.

## App Demo

![GIF of HashiCorp Humans App Demo](hashicorp-humans-demo.gif)

## Issues and other considerations

I spent the bulk of my time (~10-12 hours) meeting the Figma spec and coding the baseline functionality. The only issue from the baseline spec that I had at the end was getting a list item image or background to use a custom caret image png asset. I used a `>` character as the placeholder instead in the interest of time.

With more time, I would also like to tighten up the styling as a whole, look at many mobile responsiveness scenarios (to ensure no text on the people cards bleed past the card borders), and write cleaner HTML. My CSS as a whole could use more specificity to match the Figma spec more closely.

Above all, the two big issues I would focus on with more time are testing and accessibility.

### Testing

Had I had more time, the first area I would've focused was testing. I've used [Enzyme](https://enzymejs.github.io/enzyme/), often with [Jest](https://jestjs.io/) for testing React components, and it would be my tool of choice for ensuring each component renders correctly in various scenarios depending on what props are passed to it. I would test basic scenarios with no people passed to the `<PeopleCards />` component, for the empty result set view, and 1 to many people rendering.

I would also cover with an event-based interaction test the usage of each type of filter, from department sidebar filtering to typing in the search bar to filtering out people without profile images, both individually and filtered in combinations. Jest provides many types of assertions and test running scenarios we can run for frontend testing.

### Accessibility

From an accessibility standpoint, I would also take this app a step further. The search bar has a placeholder, but that's not accessible to screen readers, so we would likely add a hidden label to make this more accessible.

Searching as you type also poses an accessibility issue, given that without a full-page refresh, screen reader users may not see the list items change. If we wrote an announcer component that was also visually hidden and given an [ARIA live region](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions) we could have the number of list items announced to users of screen reader software.

These are just two accessibility issues among multiple I would like to tackle.

## Tech Stack

This project uses [React](https://reactjs.org/), [Next](https://nextjs.org/), [DatoCMS](https://www.datocms.com/), [GraphQL](https://graphql.org/), and other technologies.

## A note on the repository name

I took Github's first repository name suggestion! It's a fun one.

![Github's repository name suggestion](https://user-images.githubusercontent.com/10353221/125868090-42829ca4-6a6e-401b-8724-a62ff0f0f28d.png)

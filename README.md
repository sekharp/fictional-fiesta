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

I spent the bulk of my time meeting the Figma spec and coding the baseline functionality. Had I had more time, I would've...

## A note on the repository name

I took Github's first repository name suggestion!

![Github's repository name suggestion](https://user-images.githubusercontent.com/10353221/125868090-42829ca4-6a6e-401b-8724-a62ff0f0f28d.png)

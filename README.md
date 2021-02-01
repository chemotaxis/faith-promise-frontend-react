# Faith Promise tally display

The app is running at: <https://faith-promise-cff8c.web.app/>

This is a web app to display and update the fundraising total.  There is an
"admin" page that contains a form to update the display.  There's also a
"display" page that can be put on a separate screen to display the total.

## User instructions

The "admin" page has a button at the top, "Show display".  This opens the
"display" page in a separate browser tab.  You can move this tab to a different
display to be projected to an audience.

The "admin" page has a form for changing the title and total on the "display"
page.

The title is updated automatically whenever a new title is typed.

The total can be updated by pressing `Enter` while the new total form is
selected. The "Refresh" button will do the same thing.  On each update, the
"display" page will run a scrolling animation between the old number and the new
number.

For added effect (i.e. a final grand total), you can update with fireworks using
the "Refresh with fireworks" button.  In addition to the scrolling animation,
the background darkens to show fireworks.  The fireworks will continue until you
press the "Turn off fireworks" button.

## Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Deployment

This project is deployed using Firebase, but you could deploy anywhere.  Run
`npm run build` and the app should be packaged into a directory named `build`.

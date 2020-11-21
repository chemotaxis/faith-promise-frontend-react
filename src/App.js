import React, { useEffect, useState } from 'react';
import { Link } from '@reach/router';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import './App.css';

const useStyles = makeStyles({
  text: {
    display: 'flex',
    flexDirection: 'column',
  }
})

const store = localStorage;
const keys = Object.freeze({
  'displayTotal': 'displayTotal',
  'title': 'title',
  'fireworks': 'fireworks',
})

// Number of decimal places to parse
const storagePrecision = 0;

function Spacer({height}) {
  return (
    <div style={{height: height}}/>
  )
}


/**
 * This is an app split into 3 equal columns with a form on the right side. This
 * will eventually be split into components, but I'm just playing around at the
 * moment.
 *
 * When the form submits, state variables are updated and then an alert displays
 * the state variables.
 *
 * The form will eventually send its contents to a different webpage for
 * display.
 */
function App() {
  // This uses the fairly new React hook api for adding state variables.
  const classes = useStyles();

  // displayTotal is a string that holds
  const [displayTotal, setDisplayTotal] = useState(
    store.getItem(keys.displayTotal) || (0).toFixed(storagePrecision)
  );

  const [title, setTitle] = useState('Faith Promise 2021');
  useEffect(() => {
    store.setItem(keys.fireworks, false);
  }, []);
  React.useEffect(() => {
    store.setItem(keys.displayTotal, displayTotal);
    store.setItem(keys.title, title);
  });

  const [newTotal, setNewTotal] = useState('');

  function FireworksButton() {

    function handleSubmit(event) {
      event.preventDefault();
      const total = parseFloat(newTotal).toFixed(storagePrecision);
      if (!isNaN(total)) {
        setDisplayTotal(total);
      }
      let trigger = store.getItem(keys.fireworks)
      trigger = trigger === 'true'? false: true;
      store.setItem(keys.fireworks, trigger);
    }

    return (
      <Button onClick={handleSubmit} type="submit" color="primary" fullWidth>
        Fireworks!
      </Button>
    )
  }

  /**
   * handleSubmit converts the form data into a new number for the current tally
   *
   * @param {event} event form submit event
   */
  function handleSubmit(event) {
    event.preventDefault();
    const total = parseFloat(newTotal).toFixed(storagePrecision);
    if (!isNaN(total)) {
      setDisplayTotal(total);
    }
  }

  /**
   * handleChange handles changes in form input and stores new data as a string
   * @param {event} event form change event
   */
  function handleChange(event) {
    setNewTotal(event.target.value);
  }

  /**
   * handleClick opens resource in a new tab
   * @param {event} event click event
   */
  function handleClick(event) {
    event.preventDefault();
    const el = document.getElementById("display-button");
    const href = el.attributes.href.value;
    window.open(href, "displayTab", "noreferrer");
  }

  function handleChangeTitle(event) {
    setTitle(event.target.value);
  }

  function handleSubmitTitle(event) {
    event.preventDefault();
  }

  return (
    <div className="App">
      <Spacer height="2vh"/>
      <Button id="display-button" size="large" variant="outlined"
      component={Link} to="display"
      onClick={handleClick}>
        Show display
      </Button>
      <Grid container className="App-body">
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Spacer height="15vh"/>
          <Paper>
            <form onSubmit={handleSubmitTitle} autoComplete="off">
              <TextField className={classes.text} id="title" label="Title"
                variant="outlined" value={title}
                onChange={handleChangeTitle}
              />
            </form>
            <p>
              Displayed total: ${displayTotal}
            </p>
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className={classes.text}>
                <TextField id="display" label="New total"
                  variant="outlined" onChange={handleChange}
                />
              </div>
              <Button type="submit" color="primary" fullWidth>Refresh</Button>
            </form>
          </Paper>
          <Spacer height="10vh"/>
          <Paper>
            <FireworksButton/>
          </Paper>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </div>
  );
}

export default App;

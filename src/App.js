import React, { useState } from 'react';
import { Link } from '@reach/router';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
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
  'count': 'count',
})

const decimalPlaces = 2;
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
  const [count, setCount] = useState(
    store.getItem(keys.count) || (0).toFixed(decimalPlaces)
  );
  React.useEffect(() => {
    store.setItem(keys.count, count);
  });
  const [displayTotal, setDisplayTotal] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const total = parseFloat(displayTotal).toFixed(decimalPlaces);
    if (!isNaN(total)) {
      setCount(total);
    }
  }

  function handleChange(event) {
    setDisplayTotal(event.target.value);
  }

  return (
    <div className="App">
      <nav>
        <Link to="/">Home</Link>
        <Link to="display">Display</Link>
      </nav>
      <Grid container className="App-header">
        <Grid item xs={4}>
          <Paper>Hi</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper>Hi</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper>
            <form onSubmit={handleSubmit}>
              <div className={classes.text}>
                <label for="display">Display total</label>
                <input type="text" id="display" name="display_total"
                autocomplete="off" onChange={handleChange}/>
              </div>
              <div className="button">
                <button type="submit">Refresh</button>
              </div>

            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;

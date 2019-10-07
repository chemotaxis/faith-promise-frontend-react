import React, { useState } from 'react';

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
  const [count, setCount] = useState(0);
  const [displayTotal, setDisplayTotal] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    setCount(count + 1);
    alert(`Display total: ${displayTotal}\n Count: ${count}`);
  }

  function handleChange(event) {
    setDisplayTotal(event.target.value);
  }

  return (
    <div className="App">
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

import React, { useState } from 'react';
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
})

// Number of decimal places to parse
const storagePrecision = 0;
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
  React.useEffect(() => {
    store.setItem(keys.displayTotal, displayTotal);
  });
  const [newTotal, setNewTotal] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const total = parseFloat(newTotal).toFixed(storagePrecision);
    if (!isNaN(total)) {
      setDisplayTotal(total);
    }
  }

  function handleChange(event) {
    setNewTotal(event.target.value);
  }

  return (
    <div className="App">
      <Button id="display-button" size="large" variant="outlined"
      component={Link} to="display"
      onClick={handleClick}>
        Show display
      </Button>
      <Grid container className="App-body">
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Paper>
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
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </div>
  );
}

export default App;

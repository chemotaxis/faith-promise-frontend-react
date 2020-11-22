/**
 * This is a small web app that was originally created to display the total
 * amount donated for a fundraiser called "Faith Promise".
 *
 *
 * It consists of an "admin" page (this file) where the total can be updated.
 * It also has buttons to open a "display" page that can be projected on a
 * separate screen or monitor without showing the "admin" page.
 */
import React, { useEffect, useState } from 'react';
import { Link } from '@reach/router';

import { store, keys, get } from './components/database';

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



// Number of decimal places to parse
const storagePrecision = 0;

/**
 * The Spacer component is used to add vertical space between other components.
 *
 * @param {Object} height a string specifying vertical height
 */
function Spacer({height}) {
  return (
    <div style={{height: height}}/>
  )
}

function DisplayButton() {
  const id = 'display-button';

  function handleClick(event) {
    event.preventDefault();
    const el = document.getElementById(id);
    const href = el.attributes.href.value;
    window.open(href, "displayTab", "noreferrer");
  }

  return (
    <Button id={id} size="large" variant="outlined"
    component={Link} to="display"
    onClick={handleClick}>
      Show display
    </Button>
  )
}

function TitleForm(props) {
  const classes = useStyles();

  function handleChangeTitle(event) {
    console.log('Change title');
    props.updateMethod(event.target.value);
  }

  function handleSubmitTitle(event) {
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmitTitle} autoComplete="off">
      <TextField
        value={props.value}
        onChange={handleChangeTitle}
        className={classes.text}
        id="title"
        label="Title"
        variant="outlined"
      />
    </form>
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
  const classes = useStyles();

  // This controls the header on the display page
  const [title, setTitle] = useState('Faith Promise 2021');

  function updateTitle(value) {
    store.setItem(keys.title, value);
    setTitle(value);
  }

  // This is the number being displayed on the display page
  const [displayTotal, setDisplayTotal] = useState(0);

  function updateDisplayTotal(value, precision) {
    const total = parseFloat(value).toFixed(precision);
    if (!isNaN(total)) {
      store.setItem(keys.displayTotal, total);
      setDisplayTotal(total);
    }
  }

  // newTotal is the new total that has *not* been submitted to the display page
  const [newTotal, setNewTotal] = useState('');

  // Code to run once component is loaded.  Runs once.
  useEffect(() => {
    console.log('Initializing...');

    store.setItem(keys.fireworks, false);
    store.setItem(keys.displayTotal, displayTotal);
    store.setItem(keys.title, title);
  }, []); // eslint-disable-line


  function FireworksButton() {
    const [activeFireworks, setActiveFireworks] = useState(get.fireworks());

    function updateActiveFireworks(value) {
      store.setItem(keys.fireworks, value);
      setActiveFireworks(value);
    }

    function handleClick(event) {
      event.preventDefault();

      updateDisplayTotal(newTotal, storagePrecision);

      const toggle = get.fireworks()? false: true;
      updateActiveFireworks(toggle);

    }

    return (
      <Button
      variant={activeFireworks?"contained": "text"}
      onClick={handleClick}
      type="submit"
      color="secondary"
      fullWidth>
        {activeFireworks? "Turn off fireworks": "Refresh with fireworks"}
      </Button>
    )
  }

  function handleSubmit(event) {
    event.preventDefault();
    updateDisplayTotal(newTotal, storagePrecision);
  }

  function handleChange(event) {
    setNewTotal(event.target.value);
  }


  return (
    <div className="App">
      <Spacer height="2vh"/>
      <DisplayButton />
      <Grid container className="App-body">
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Spacer height="15vh"/>
          <Paper>
            <TitleForm
              value={title}
              updateMethod={updateTitle}/>
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

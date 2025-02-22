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
 * height (string): vertical height of spacer component
 */
function Spacer({height}) {
  return (
    <div style={{height: height}}/>
  )
}

/**
 * DisplayButton opens a new tab to display a tally total and title
 */
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

/**
 * TitleForm updates the title on the display page
 *
 * It updates display page on change.  Submit event is disabled.
 *
 */
function TitleForm(props) {

  function handleChangeTitle(event) {
    props.updateMethod(event.target.value);
  }

  function handleSubmitTitle(event) {
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmitTitle} autoComplete="off">
      <TextField
        fullWidth
        value={props.value}
        onChange={handleChangeTitle}
        id="title"
        label="Title"
        variant="outlined"
      />
    </form>
  )
}

/**
 * TotalForm updates the total being displayed on the display page
 *
 * The total on the display page won't be updated until a submit event is fired.
 * It provides two buttons: one to just submit the new total; the other button
 * toggles fireworks which can be used for the final total.  It will also update
 * the total when submitted.
 *
 */
function TotalForm(props) {
  const classes = useStyles();

  // newTotal is the new total that has *not* been submitted to the display page
  const [newTotal, setNewTotal] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    props.updateDisplayTotal(newTotal);
  }

  function handleChange(event) {
    setNewTotal(event.target.value);
  }

  return (
    <form className={classes.text} onSubmit={handleSubmit} autoComplete="off">
      <TextField id="display" label="New total"
        variant="outlined" onChange={handleChange}
      />
      <Spacer height="5vh" />
      <Button
        type="submit"
        variant="outlined"
        size="large"
        color="primary"
      >
        Refresh
      </Button>
      <FireworksButton onSubmit={handleSubmit}/>
    </form>
  )
}

/**
 * FireworksButton provides a button for toggling fireworks
 *
 * The button text and style will change depending on whether the fireworks are
 * active or not.
 */
function FireworksButton(props) {
  const [activeFireworks, setActiveFireworks] = useState(get.fireworks());

  function updateActiveFireworks(value) {
    store.setItem(keys.fireworks, value);
    setActiveFireworks(value);
  }

  function handleClick(event) {
    event.preventDefault();

    props.onSubmit(event);

    const toggle = get.fireworks()? false: true;
    updateActiveFireworks(toggle);

  }

  return (
    <Button
    variant={activeFireworks?"contained": "text"}
    onClick={handleClick}
    type="submit"
    color="secondary"
    >
      {activeFireworks? "Turn off fireworks": "Refresh with fireworks"}
    </Button>
  )
}

/**
 * App provides an "admin" page to update the values on the Display page
 *
 * This app is split into three columns.  Everything is centered in the second
 * column.
 */
function App() {

  // This controls the header on the display page
  const [title, setTitle] = useState('Faith Promise 2021');

  function updateTitle(value) {
    store.setItem(keys.title, value);
    setTitle(value);
  }

  // This is the number being displayed on the display page
  const [displayTotal, setDisplayTotal] = useState(0);

  function updateDisplayTotal(value) {
    const total = parseFloat(value).toFixed(storagePrecision);
    if (!isNaN(total)) {
      store.setItem(keys.displayTotal, total);
      setDisplayTotal(total);
    }
  }


  // Code to run once component is loaded.
  useEffect(() => {
    console.log('Initializing...');

    store.setItem(keys.fireworks, false);
    store.setItem(keys.displayTotal, displayTotal);
    store.setItem(keys.title, title);
  }, []); // eslint-disable-line
  // Runs once.


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
            <TotalForm
              updateDisplayTotal={updateDisplayTotal}
            />
          </Paper>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </div>
  );
}

export default App;

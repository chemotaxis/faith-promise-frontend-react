import React, { useState } from 'react';
import Odometer from 'react-odometerjs-no-prop-types';
import 'odometer/themes/odometer-theme-default.css'

import { FIREWORKS } from './fireworks';
import {store, keys, get} from './database';

import './Display.css';

/**
 * Display provides a page that displays a title and number
 *
 * The number has an odometer animation to transition between different totals.
 */
function Display() {
  const [displayTotal, setDisplayTotal] = useState(
    store.getItem(keys.displayTotal) || 0
  );

  const [title, setTitle] = useState(
    store.getItem(keys.title) || ''
  );

  const [Fire, setFire] = useState(false);

  React.useEffect(() => {
    document.title = 'Faith Promise: Display';
    let fire = get.fireworks();
    let fireworks = undefined;

    setInterval(() => {
      setTitle(store.getItem(keys.title));

      const currentTotal = store.getItem(keys.displayTotal);
      if (currentTotal !== displayTotal) {
        setDisplayTotal(currentTotal);
      }

      fire = get.fireworks();
      setFire(fire);
      if (fire) {
        console.log('fire');

        if (!fireworks) {
          fireworks = new FIREWORKS({full_screen: true});
          fireworks.start_burst();
        }
      } else {
        if (fireworks) {
          fireworks.stop();
          fireworks = undefined;
        }
      }
    }, 500);
  }, []); // eslint-disable-line
  // This array is empty because I only want to run this effect once.


  return (
    <div className="Display" style={{
      minHeight: "90vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: Fire? "white": "black",
      }}>
      <div style={{ fontSize: "60px", fontWeight: "500",}}>
        {title}
      </div>
      <div style={{
      display: "flex",
      fontSize: "250px",
      fontWeight: "500",}}>
        <span className="odometer-digit">$</span>
        <Odometer value={displayTotal} options={{
          format:'(,ddd)',
          duration: 3000,
        }}/>
      </div>
    </div>
  )
}

export default Display

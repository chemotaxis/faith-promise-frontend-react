import React, { useState } from 'react';
import Odometer from 'react-odometerjs-no-prop-types';
import 'odometer/themes/odometer-theme-default.css'

import { FIREWORKS } from './fireworks';

import './Display.css';

const store = localStorage;
const keys = Object.freeze({
  'displayTotal': 'displayTotal',
  'title': 'title',
  'fireworks': 'fireworks',
})

function Display() {
  const [displayTotal, setDisplayTotal] = useState(
    store.getItem(keys.displayTotal) || 0
  );

  const [title, setTitle] = useState(
    store.getItem(keys.title) || ''
  );

  const [Fire, setFire] = useState(false);

  React.useEffect(() => {
    // const node = document.getElementsByClassName('Display')[0];
    let fire = store.getItem(keys.fireworks) === 'true'? true: false;
    let fireworks = undefined;

    setInterval(() => {
      const c = store.getItem(keys.displayTotal);
      if (c !== displayTotal) {
        setDisplayTotal(c);
      }

      setTitle(store.getItem(keys.title));

      fire = store.getItem(keys.fireworks) === 'true'? true: false;
      setFire(fire);
      if (fire) {
        console.log('fire');
        // store.setItem(keys.fireworks, false);

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
  }, []);


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

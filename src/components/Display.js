import React, { useState } from 'react';
import Odometer from 'react-odometerjs-no-prop-types';
import 'odometer/themes/odometer-theme-default.css'

import './Display.css';

const store = localStorage;
const keys = Object.freeze({
  'displayTotal': 'displayTotal',
})

function Display() {
  const [displayTotal, setDisplayTotal] = useState(
    store.getItem(keys.displayTotal) || 0
  );
  React.useEffect(() => {
    setInterval(() => {
      const c = store.getItem(keys.displayTotal);
      if (c !== displayTotal) {
        setDisplayTotal(c);
      }
    }, 200)
  }, [displayTotal]);

  return (
    <div className="Display" style={{
      minHeight: "90vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      }}>
      <div style={{ fontSize: "60px", fontWeight: "500",}}>
        Faith Promise 2020
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

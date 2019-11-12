import React, { useState } from 'react';
import { Link } from '@reach/router';
import Odometer from 'react-odometerjs-no-prop-types';
import 'odometer/themes/odometer-theme-default.css'

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
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      }}>
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <h1>Faith Promise 2019</h1>
      <h2 style={{display: "flex"}}>
        <div className="odometer-auto-theme">$</div>
        <Odometer value={count} options={{
          format:'(,ddd)',
          duration: 3000,
        }}/>
      </h2>
    </div>
  )
}

export default Display

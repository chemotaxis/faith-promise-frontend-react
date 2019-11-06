import React, { useState } from 'react';
import { Link } from '@reach/router';
import Odometer from 'react-odometerjs-no-prop-types';
import 'odometer/themes/odometer-theme-default.css'

const store = localStorage;
const keys = Object.freeze({
  'count': 'count',
})

function Display() {
  const [count, setCount] = useState(
    store.getItem(keys.count) || 0
  );
  React.useEffect(() => {
    setInterval(() => {
      const c = store.getItem(keys.count);
      if (c !== count) {
        setCount(c);
      }
    }, 200)
  }, [count]);

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

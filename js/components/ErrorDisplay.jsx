import React from 'react';
import 'styles/404';
const ErrorDisplay = () => (
    <div className="error-display">
        <h1>Something went wrong</h1>
        <p>Seems like Darth Vader just hits our website and drops it down</p>
        <p>Please press refresh button and everything should be fine</p>
        <button onClick={() => location.reload(true)} className="landing__refresh">
            refresh
        </button>
    </div>
);

export default ErrorDisplay;

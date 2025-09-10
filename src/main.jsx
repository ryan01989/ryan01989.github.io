import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import ReactGA from "react-ga4";

ReactGA.initialize("G-GNJ6ZE9LG0"); // your GA ID
ReactGA.send("pageview");

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
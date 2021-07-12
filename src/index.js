import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import App from './components/App';
import State from "./context/State";

ReactDOM.render(
    <State>
        <App/>
    </State>,
    document.getElementById('root')
);
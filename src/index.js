import React from 'react';
import ReactDOM from 'react-dom';
//import App from './App';
import * as serviceWorker from './serviceWorker';
import Wrapper from './components/wrapper';

ReactDOM.render(<Wrapper />, document.getElementById('root'));
serviceWorker.register();


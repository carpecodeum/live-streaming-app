import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import 'bootstrap';
import Root from './components/Root.js';
require('./index.scss');
 

function App() {
  return (<BrowserRouter>
    <Root/>
    <div className="App">
      
    </div>
    </BrowserRouter>
    
  );
}

export default App;

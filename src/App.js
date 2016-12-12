import React, { Component } from 'react';
import logo from './logo.svg';
import ImageList from './ImageList.jsx';
import OfflineNotice from './OfflineNotice.jsx';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>xckd list</h2>
          <OfflineNotice />
        </div>
        <ImageList />
      </div>
    );
  }
}

export default App;

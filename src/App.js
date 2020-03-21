import React from 'react';
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import { StickyContainer } from 'react-sticky';

import Header from './components/Header';
import AddBar from './components/AddBar';
import BarMap from './components/BarMap';

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <StickyContainer>
      <main className="Application">
        <Header />
        <div className="fb">
          <Switch>
            <Route exact path ="/" component = {BarMap} />
            <Route exact path ="/add-bar" component = {AddBar} />
          </Switch>
        </div>
      </main>
    </StickyContainer>
  );
}

export default App;

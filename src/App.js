import React from 'react';
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import { StickyContainer } from 'react-sticky';

import Header from './components/Header';
import AddBar from './components/AddBar';
import BarMap from './components/BarMap';
import BarPage from './components/BarPage';

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <StickyContainer>
      <main className="Application">
        <div className="fb">
          <Switch>
            <Route exact path ="/" component = {BarMap} />
            <Route exact path ="/bars" component = {BarMap} />
            <Route exact path ="/add-bar" component = {AddBar} />
            <Route exact path ="/bars/:id" component = {BarPage} />
          </Switch>
        </div>
      </main>
    </StickyContainer>
  );
}

export default App;

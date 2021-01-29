import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import Header from './Header';
import LoginPage from './LoginPage';
import ClassSearchPage from './ClassSearchPage';
import GenerateSchedulesPage from './GenerateSchedulesPage';
import SavedSchedulesPage from './SavedSchedulesPage';

function App() {
  return (
    <div>
      <Header/>
      <Switch>
        <Route path="/search">
          <ClassSearchPage />
        </Route>
        <Route path="/generate">
          <GenerateSchedulesPage />
        </Route>
        <Route path="/saved">
          <SavedSchedulesPage />
        </Route>
        <Route path="/">
          <LoginPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
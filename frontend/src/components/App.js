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
import { AuthProvider } from "../contexts/AuthContext";

function App() {
  return (
    <div>
      <Header/>
        <AuthProvider>
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
        </AuthProvider>
    </div>
  );
}

export default App;
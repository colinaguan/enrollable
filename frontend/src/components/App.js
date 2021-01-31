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

    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Login</Link>
            </li>
            <li>
              <Link to="/search">Class Search</Link>
            </li>
            <li>
              <Link to="/generate">Generate</Link>
            </li>
            <li>
              <Link to="/saved">Saved Schedules</Link>
            </li>
          </ul>
        </nav>

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
    </Router>

  );
}

export default App;
import React, { useState } from 'react';
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
  const [favList, setFavList] = useState([]);
  return (
    <div>
      <Header/>
        <AuthProvider>
          <Switch>
            <Route path="/search">
              <ClassSearchPage favList={favList} setFavList={setFavList} />
            </Route>
            <Route path="/generate">
              <GenerateSchedulesPage favList={favList} setFavList={setFavList} />
            </Route>
            <Route path="/saved">
              <SavedSchedulesPage />
            </Route>
            <Route path="/">
              <LoginPage setFavList={setFavList}/>
            </Route>
          </Switch>
        </AuthProvider>
    </div>
  );
}

export default App;
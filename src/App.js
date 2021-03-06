import React, { createContext, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Book from './components/Book/Book';
import Header from './components/Header/Header';
import PriavteRoute from './components/PriavteRoute/PriavteRoute';

export const UserContext = createContext();

function App() {
  const user = {displayName: 'Tuhin', email: 'tuhin@gmail.com'};
  const [loggedInUser, setLoggedInUser] = useState(user);
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <p>Name : {loggedInUser.displayName}</p>
      <Router>
          <Header/>
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <PriavteRoute path="/book/:bedType">
              <Book />
            </PriavteRoute>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
      </Router>
    </UserContext.Provider>
      
  );
}

export default App;

import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';
import Form from '../../Form/Form';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}


const Login = () => {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [user, setUser] = useState({})
  const handleFb = () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // The signed-in user info.
        var user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var accessToken = credential.accessToken;
        console.log('fb', user);
        setUser(user);
        history.replace(from);
        setLoggedInUser(user);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        // ...
      });
  }

  const handleGoogle = () => {
    var gProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
      .signInWithPopup(gProvider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        setUser(user);
        setLoggedInUser(user);
        history.replace(from);
        console.log('google', user.displayName)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  }
  return (
    <div>
      <h1>This is Login</h1>
      <p>Name : {user.displayName}</p>
      <Form></Form>
      <button onClick={handleFb}>Facebook</button>
      <br />
      <br />
      <button onClick={handleGoogle}>Google</button>

    </div>
  );
};

export default Login;
import * as firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyBzFiwOFJ1RQ-zT0nTJily4FiK6V3fEUWs",
  authDomain: "apod-appreciation-board.firebaseapp.com",
  databaseURL: "https://apod-appreciation-board.firebaseio.com",
  projectId: "apod-appreciation-board",
  storageBucket: "apod-appreciation-board.appspot.com",
  messagingSenderId: "839913363974"
});

export const database = firebase.database();
export const auth = firebase.auth();

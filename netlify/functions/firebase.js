const firebase = require("firebase/app")
require("firebase/firestore")

const firebaseConfig = {
  apiKey: "AIzaSyAv0lr1CN8ZO0OkJ6aqWBcbwpt3F5ZUD9s",
  authDomain: "kiei-451-77c51.firebaseapp.com",
  projectId: "kiei-451-77c51",
  storageBucket: "kiei-451-77c51.appspot.com",
  messagingSenderId: "760543567154",
  appId: "1:760543567154:web:5281bcadcf9209fe7d4b2b"
} // replace

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

module.exports = firebase
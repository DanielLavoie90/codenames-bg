import firebase from 'firebase'
import 'firebase/database'

// firebase init goes here
const config = {
  apiKey: "AIzaSyAwzf8xPDsPygyf8p7Wio1k81K83h-uScE",
  authDomain: "codenames-bg.firebaseapp.com",
  databaseURL: "https://codenames-bg.firebaseio.com",
  projectId: "codenames-bg",
  storageBucket: "codenames-bg.appspot.com",
  messagingSenderId: "18077563759",
  appId: "1:18077563759:web:077bc55d43aa2908fb869a"
}
firebase.initializeApp(config)

// firebase utils
const db = firebase.database()

export default db
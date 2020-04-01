import firebase from 'firebase'
import 'firebase/firestore'

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
const db = firebase.firestore()
// const auth = firebase.auth()
// const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
  timestampsInSnapshots: true
}
db.settings(settings)

// firebase collections
// const usersCollection = db.collection('users')
// const postsCollection = db.collection('posts')
// const commentsCollection = db.collection('comments')
// const likesCollection = db.collection('likes')

export {
  db,
  // auth,
  // currentUser,
  // usersCollection,
  // postsCollection,
  // commentsCollection,
  // likesCollection
}
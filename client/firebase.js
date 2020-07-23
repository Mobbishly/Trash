import * as firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyDtMFxbfkOfn4j5ytgMRPjPz8KHH1Kr-fs",
  authDomain: "trash-2b5de.firebaseapp.com",
  databaseURL: "https://trash-2b5de.firebaseio.com",
  projectId: "trash-2b5de",
  storageBucket: "trash-2b5de.appspot.com",
  messagingSenderId: "872407724723",
  appId: "1:872407724723:web:e9010bd428ba9de43536c6"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCWb3EI_lV_lcrgzS3KQuhhTyc1rhv4A-Y",
    authDomain: "photo-gallery-d03d4.firebaseapp.com",
    projectId: "photo-gallery-d03d4",
    storageBucket: "photo-gallery-d03d4.appspot.com",
    messagingSenderId: "7093717672",
    appId: "1:7093717672:web:1dd80d077cf0ce3810909d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore().collection('images');

export {projectStorage, projectFirestore};
import firebase from "firebase/app";
import "firebase/firestore";
const config = {
    apiKey: "AIzaSyD2cA7ewxbcxX0UWJF6gFdnkmCHRbIhqdU",
    authDomain: "burger-builder-fb26d.firebaseapp.com",
    databaseURL: "https://burger-builder-fb26d.firebaseio.com",
    projectId: "burger-builder-fb26d",
    storageBucket: "burger-builder-fb26d.appspot.com",
    messagingSenderId: "342785783618",
    appId: "1:342785783618:web:053c053dd7b2615b067adb",
    measurementId: "G-STV7R2NXK2"
};
firebase.initializeApp(config);
export default firebase;

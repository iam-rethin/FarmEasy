// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIN04OKV3bCYgWVrYVDfprSmc_GQIovKM",
  authDomain: "farmeasy-ea788.firebaseapp.com",
  projectId: "farmeasy-ea788",
  storageBucket: "farmeasy-ea788.appspot.com",
  messagingSenderId: "786399180847",
  appId: "1:786399180847:web:ffa7f0ecba871f8f5ceeda"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const storage = getStorage(app)
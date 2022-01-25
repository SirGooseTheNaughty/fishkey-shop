import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore"

import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCXgwH9PCaVxzfDjAYwAOG6ZRr4DIrazig",
  authDomain: "fishkey-f2468.firebaseapp.com",
  projectId: "fishkey-f2468",
  storageBucket: "fishkey-f2468.appspot.com",
  messagingSenderId: "847682680086",
  appId: "1:847682680086:web:f13536168a1b23e3f34c37",
  measurementId: "G-VY2GW26WKH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();

export default app;
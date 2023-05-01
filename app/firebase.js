import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js"



const firebaseConfig = {
  apiKey: "AIzaSyAtYqhO1G7qz3afVUT8HUvbBOkya3YIWaI",
  authDomain: "dataresurante.firebaseapp.com",
  projectId: "dataresurante",
  storageBucket: "dataresurante.appspot.com",
  messagingSenderId: "55270366856",
  appId: "1:55270366856:web:bb89c4d3f792b887af893d"
};


// Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app)
  export const db = getFirestore(app)
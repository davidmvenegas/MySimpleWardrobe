import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCmsoE5hWdm6y4LTWiVx7PZK9SfPjN7rSs",
    authDomain: "the-red-planet-shop.firebaseapp.com",
    projectId: "the-red-planet-shop",
    storageBucket: "the-red-planet-shop.appspot.com",
    messagingSenderId: "673517657887",
    appId: "1:673517657887:web:801100d43e6f4203e91a2a"
}

const app = initializeApp(firebaseConfig)

export default app

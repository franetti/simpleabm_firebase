import { initializeApp } from "firebase/app";

// esto no habria que dejar ela rchivo en produccion
const firebaseConfig = {
    apiKey: "AIzaSyDyeOFMfr5nyLRR6QxAbb4pHERv0DKNJmk",
    authDomain: "product-hunt-clone-677fa.firebaseapp.com",
    projectId: "product-hunt-clone-677fa",
    storageBucket: "product-hunt-clone-677fa.appspot.com",
    messagingSenderId: "317203792255",
    appId: "1:317203792255:web:7c9dae7fd07fc037209a4a"
};

const app = initializeApp(firebaseConfig);
export default app;
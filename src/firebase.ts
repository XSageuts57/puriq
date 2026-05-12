import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA85zkGW4exTLiNlt304MN4LPsykgxcD3o",
  authDomain: "puriq-40a2a.firebaseapp.com",
  projectId: "puriq-40a2a",
  storageBucket: "puriq-40a2a.firebasestorage.app",
  messagingSenderId: "491395123339",
  appId: "1:491395123339:web:0caae93fc7cc20bd526c8e"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Opcional: para que el popup de Google se vea mejor
googleProvider.setCustomParameters({
  prompt: 'select_account'
});
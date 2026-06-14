import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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

// Funciones de autenticación
export const loginWithEmail = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const registerWithEmail = async (email: string, password: string, displayName: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  // Actualizar el nombre del usuario - usando updateProfile importado
  await updateProfile(userCredential.user, {
    displayName: displayName
  });
  return userCredential;
};

// Storage
export const storage = getStorage(app);

// Función para subir imágenes a Firebase Storage
export const uploadImage = async (file: File, path: string): Promise<string> => {
  try {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileName = `${timestamp}_${randomString}.jpg`;
    const storageRef = ref(storage, `${path}/${fileName}`);
    
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error al subir imagen:", error);
    throw error;
  }
};

// Función para subir múltiples imágenes
export const uploadMultipleImages = async (files: File[], path: string): Promise<string[]> => {
  const uploadPromises = files.map(file => uploadImage(file, path));
  return await Promise.all(uploadPromises);
};

googleProvider.setCustomParameters({
  prompt: 'select_account'
});
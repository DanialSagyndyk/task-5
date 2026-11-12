import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider, firebaseReady, authPersistence } from "./firebase.js";

function ensureFirebase() {
  if (!firebaseReady || !auth) {
    throw new Error("Firebase is not configured. Add your Firebase values to .env.local and restart the dev server.");
  }
}
export async function signUp(email, password) {
  ensureFirebase();
  await authPersistence;
  return createUserWithEmailAndPassword(auth, email, password);
}
export async function signIn(email, password) {
  ensureFirebase();
  await authPersistence;
  return signInWithEmailAndPassword(auth, email, password);
}
export async function signInWithGoogle() {
  ensureFirebase();
  await authPersistence;
  return signInWithPopup(auth, googleProvider);
}
export async function logOut() {
  ensureFirebase();
  return signOut(auth);
}

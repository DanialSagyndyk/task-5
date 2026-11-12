import { createContext, useContext, useEffect, useState } from "react";
import { auth, firebaseReady } from "../services/firebase.js";
import { signUp, signIn, signInWithGoogle, logOut } from "../services/authService.js";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!firebaseReady || !auth) { setLoading(false); return; }
    const unsubscribe = onAuthStateChanged(auth, currentUser => { setUser(currentUser); setLoading(false); setError(""); }, err => { setError(err.message); setLoading(false); });
    return unsubscribe;
  }, []);
  const run = async action => { setError(""); try { return await action(); } catch (err) { setError(err.message || "Authentication failed."); throw err; } };
  const value = {
    user, loading, error, firebaseReady,
    signup: (email, password) => run(() => signUp(email, password)),
    login: (email, password) => run(() => signIn(email, password)),
    googleLogin: () => run(signInWithGoogle),
    logout: () => run(logOut),
    clearError: () => setError(""),
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() { const value = useContext(AuthContext); if (!value) throw new Error("useAuth must be used inside AuthProvider"); return value; }

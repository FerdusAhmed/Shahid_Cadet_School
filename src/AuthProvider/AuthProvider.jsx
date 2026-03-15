import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase.config";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const register = async (email, password, role = 'student') => {
        setLoading(true);
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // create a user document so we can store roles or other metadata
        await setDoc(doc(db, "users", userCredential.user.uid), {
            email,
            role,
            createdAt: new Date(),
        });
        return userCredential;
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    const fetchRole = async (firebaseUser) => {
        if (!firebaseUser) return null;
        try {
            const docRef = doc(db, "users", firebaseUser.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                return data.role || null;
            }
        } catch (err) {
            console.error("failed to fetch role", err);
        }
        return null;
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setLoading(true);
            if (currentUser) {
                try {
                    const r = await fetchRole(currentUser);
                    setRole(r);
                    console.log("User logged in:", currentUser.email, "Role:", r);
                } catch (err) {
                    console.error("Error fetching role:", err);
                    setRole(null);
                }
            } else {
                setRole(null);
                console.log("User logged out");
            }
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const authInfo = { user, role, loading, login, logOut, register };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, User, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

interface AdditionalInfo {
    displayName?: string;
}

const firebaseConfig = {
  apiKey: "AIzaSyAvJPXfnk1PL6W8F8IoiEVg14eJXj6ACXk",
  authDomain: "mypabox-admin-v2.firebaseapp.com",
  projectId: "mypabox-admin-v2",
  storageBucket: "mypabox-admin-v2.appspot.com",
  messagingSenderId: "58794515174",
  appId: "1:58794515174:web:2daa229b1b08ab5f593927",
  measurementId: "G-ZFJ2E8ETHB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Instantiate Auth
export const auth = getAuth();

// Instantiate Firestore 
export const db = getFirestore();

// Creates new user doc from authenticated user 
export const createUserDocumentFromAuth = async (userAuth: User, additionalInfo = {} as AdditionalInfo) => {
    if(!userAuth) return;

    // Grabs entire User doc 
    const userDocRef = doc(db, 'users', userAuth.uid);

    // Grabs User doc containing specific user 
    const userSnapshot = await getDoc(userDocRef);

    // If user does not exist, create new user doc 
    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName, 
                email,
                createdAt, 
                ...additionalInfo,
            })
        } catch (error: any) {
            console.log('error creating user', error.message)
        }
    }

    return userDocRef;
}

// Creates new authenticated user 
export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

// Signs in authenticated user
export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

// Signs out authenticated user
export const signOutUser = async () => await signOut(auth)

// Auth state listener
export const onAuthStateChangedListener = (callback: (user: User | null) => void) => onAuthStateChanged(auth, callback)
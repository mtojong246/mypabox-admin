import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, User, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, query, getDocs, where, addDoc } from 'firebase/firestore'

import { School } from "../../types/schools.types";

interface AdditionalInfo {
    displayName?: string;
}

// interface SchoolDataType {
//     name: string,
//     state: string,
//     city: string,
// }

// Config values moved to .env file
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Instantiate Auth
export const auth = getAuth();

// Instantiate Firestore 
export const db = getFirestore();

//  **************[SCHOOL DATA FUNCTION HANDLERS]**************

// Retrieves all documents inside schools collection
export const getSchoolsAndDocuments = async () => {
    const collectionRef = collection(db, 'schools');
    const q = query(collectionRef);

    try {
        // Gets documents based on query parameters 
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((docSnapshot) => docSnapshot.data())
    } catch (error: any) {
        if (error.code === 'permission-denied') {
            throw new Error(error.code);
        }

        console.log('error fetching school data' , error.code);
    }
}

// Retrieves schools by state 
export const getDocsByState = async (state: string) => {
    const collectionRef = collection(db, 'schools');
    const q = query(collectionRef, where('school_state', '==', state));

    try {
        // Gets documents based on query parameters 
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((docSnapshot) => docSnapshot.data())
    } catch (error: any) {
        console.log('error fetching school data by state' , error.message);
    }
}

// Retrieves schools by name
export const getDocsByName = async (name: string) => {
    const collectionRef = collection(db, 'schools');
    const q = query(collectionRef, where('school_name', '==', name));

    try {
        // Gets documents based on query parameters 
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((docSnapshot) => docSnapshot.data())
    } catch (error: any) {
        console.log('error fetching school data by name' , error.message);
    }
}

// Retrieves school by id 
export const getDocsById = async (id: number) => {
    const collectionRef = collection(db, 'schools');
    const q = query(collectionRef, where('id', '==', id));

    try {
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((docSnapshot) => docSnapshot.data())
    } catch (error: any) {
        console.log('error fetching school data by name' , error.message);
    }
}

// Adds individual school collection to school document 
export const addDocToSchoolCollection = async (data: School, id: number) => {
    const docRef = doc(db, 'schools', id.toString());

    try {
        // Adds data as a document to school collection or updates existing document
        await setDoc(docRef, data)
    } catch (error: any) {
        if (error.code === 'permission-denied') {
            throw new Error(error.code);
        }

        console.log('error adding school' , error.code);
    }
}

// **************[COURSES DATA FUNCTION HANDLERS]**************

// Retrieves all courses data 
export const getAllCourses = async () => {
    const collectionRef = collection(db, 'courses');
    const q = query(collectionRef);

    try {
        // Gets documents based on query parameters 
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((docSnapshot) => docSnapshot.data())
    } catch (error: any) {
        if (error.code === 'permission-denied') {
            throw new Error(error.code);
        }

        console.log('error fetching course data' , error.code);
    }
}

//  **************[USER DATA FUNCTION HANDLERS]**************

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

    try {
        return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
        throw new Error('Error creating user with email and password' + error.message);
    }
    
}

// Signs in authenticated user
export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if(!email || !password) return;

    try {
        return await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
        throw new Error('Error signing in user with email and password' + error.message)
    }
    
}

// Signs out authenticated user
export const signOutUser = async () => {
    try {
        await signOut(auth)
    } catch (error: any) {
        throw new Error('Error signing out user' + error.message)
    }
    
}

// Auth state listener
export const onAuthStateChangedListener = (callback: (user: User | null) => void) => onAuthStateChanged(auth, callback)
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, User, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, query, getDocs, where, deleteDoc, addDoc, updateDoc, arrayUnion } from 'firebase/firestore'

import { School } from "../../types/schools.types";
import { Course } from "../../types/courses.types";
import { CategoryCourse, CategoryType } from "../../types/categories.types";
import { UserObject } from "../../types/users.types";

interface AdditionalInfo {
    displayName: string,
    email: string,
    isSuperAdmin: boolean,
    permissions: {
        canEditWithoutVerificationNeeded: boolean,
        canEditWithVerificationNeeded: boolean,
        canVerify: boolean,
        canMakeLive: boolean,
        canAddOrDelete: boolean,
    },
}

// interface SchoolDataType {
//     name: string,
//     state: string,
//     city: string,
// }

// Config values moved to .env file
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
// };

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
export const addDocToSchoolCollection = async (data: School, id: string) => {
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
};

export const addSchoolDoc = async (data: School) => {
    const collectionRef = collection(db, 'schools');

    try {
        // Adds new doc to collection
        const newDoc = await addDoc(collectionRef, data);
        const docRef = doc(db, 'schools', newDoc.id);
        // Updates doc reference with newly-generated id 
        await updateDoc(docRef, {
            id: newDoc.id,
        })
        // Grabs and returns doc with updated id 
        const docSnap = await getDoc(docRef);
        return docSnap.data();

    } catch (error:any) {
        if (error.code === 'permission-denied') {
            throw new Error(error.code);
        }

        console.log('error adding school' , error.code);
    }
}

export const updateSchoolDoc = async (data: School, id: string) => {
    const docRef = doc(db, 'schools', id);

    try {
        // Adds data as a document to school collection or updates existing document
        await setDoc(docRef, data)
    } catch (error: any) {
        if (error.code === 'permission-denied') {
            throw new Error(error.code);
        }

        console.log('error updating school' , error.code);
    }
    
}

export const deleteSchoolDoc = async (id: string) => {
    const docRef = doc(db, 'schools', id);

    try {
        // Removes course from document 
        await deleteDoc(docRef);
    } catch (error: any) {
        if (error.code === 'permission-denied') {
            throw new Error(error.code);
        }

        console.log('error deleting school' , error.code);
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



// Adds new course to doc and returns new course with unique id 
export const addCoursesDoc = async (data: Course) => {
    const collectionRef = collection(db, 'courses');

    try {
        // Adds new doc to collection
        const newDoc = await addDoc(collectionRef, data);
        const docRef = doc(db, 'courses', newDoc.id);
        // Updates doc reference with newly-generated id 
        await updateDoc(docRef, {
            unique_id: newDoc.id,
        })
        // Grabs and returns doc with updated id 
        const docSnap = await getDoc(docRef);
        return docSnap.data();

    } catch (error:any) {
        if (error.code === 'permission-denied') {
            throw new Error(error.code);
        }

        console.log('error adding course' , error.code);
    }
}



// Adds or updates courses doc 
export const updateCoursesDoc = async (data: Course, id: string) => {
    const docRef = doc(db, 'courses', id);

        try {
            // Adds data as a document to school collection or updates existing document
            await setDoc(docRef, data)
        } catch (error: any) {
            if (error.code === 'permission-denied') {
                throw new Error(error.code);
            }
    
            console.log('error updating course' , error.code);
        }
    
}

export const deleteCoursesDoc = async (id: string) => {
    const docRef = doc(db, 'courses', id);

    try {
        // Removes course from document 
        await deleteDoc(docRef)
    } catch (error: any) {
        if (error.code === 'permission-denied') {
            throw new Error(error.code);
        }

        console.log('error deleting course' , error.code);
    }
}

// **************[CATEGORIES DATA FUNCTION HANDLERS]**************

// Retrieves all categories data 
export const getAllCategories = async () => {
    const collectionRef = collection(db, 'categories');
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

export const addCategoryDoc = async (data: CategoryType) => {
    const collectionRef = collection(db, 'categories');

    try {
        // Adds new doc to collection
        const newDoc = await addDoc(collectionRef, data);
        const docRef = doc(db, 'categories', newDoc.id);
        // Updates doc reference with newly-generated id 
        await updateDoc(docRef, {
            id: newDoc.id,
        })
        // Grabs and returns doc with updated id 
        const docSnap = await getDoc(docRef);
        return docSnap.data();

    } catch (error:any) {
        if (error.code === 'permission-denied') {
            throw new Error(error.code);
        }

        console.log('error adding category' , error.code);
    }

}



export const addCourseToCategoryDoc = async (id: string, course: CategoryCourse) => {
    const docRef = doc(db, 'categories', id);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();

    try {
        if (data) {
            await updateDoc(docRef, {
                courses: data.courses.concat(course)
            })
        }
    } catch (error:any) {
        if (error.code === 'permission-denied') {
            throw new Error(error.code);
        }

        console.log('error adding course to category' , error.code);
    }
}

export const addSubToCategoryDoc = async (id: string, sub: string, courses: CategoryCourse[]) => {
    const docRef = doc(db, 'categories', id);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
  

    try {
        if (data) {
            await updateDoc(docRef, {
                courses: arrayUnion(...courses),
                subcategories: data.subcategories.concat([sub]),
            })
        }
    } catch (error:any) {
        if (error.code === 'permission-denied') {
            throw new Error(error.code);
        }
        console.log('error adding subcategory to category' , error);
    }
}

export const deleteCategoryDoc = async (id: string) => {
    const docRef = doc(db, 'categories', id);

    try {
        // Removes category from doc
        await deleteDoc(docRef)
    } catch (error: any) {
        if (error.code === 'permission-denied') {
            throw new Error(error.code);
        }

        console.log('error deleting category' , error.code);
    }
}

export const deleteCourseFromCategoryDoc = async (id: string, course_id: string) => {
    const docRef = doc(db, 'categories', id);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();

    try {
        if (data) {
            await updateDoc(docRef, {
                courses: data.courses.filter((c: CategoryCourse) => c.course_id !== course_id),
            })
        }
    } catch (error:any) {
        if (error.code === 'permission-denied') {
            throw new Error(error.code);
        }

        console.log('error deleting course from category' , error.code);
    }
}

export const deleteSubFromCategoryDoc = async (id: string, courses: CategoryCourse[], subs: string[]) => {
    const docRef = doc(db, 'categories', id);

    try {
        await updateDoc(docRef, {
            courses: courses,
            subcategories: subs,
        })
    } catch (error:any) {
        if (error.code === 'permission-denied') {
            throw new Error(error.code);
        }

        console.log('error delete subcategory from category' , error.code);
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

        try {
            await setDoc(userDocRef, {
                id: userAuth.uid,
                displayName: additionalInfo.displayName,
                email: additionalInfo.email,
                isSuperAdmin: additionalInfo.isSuperAdmin,
                permissions: additionalInfo.permissions,
                activeTasks: [],
                completedTasks: [],
                archivedTasks: [],
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
export const onAuthStateChangedListener = (callback: (user: User | null) => void) => onAuthStateChanged(auth, callback);

// Gets all users
export const getAllUsers = async () => {
    const collectionRef = collection(db, 'users');
    const q = query(collectionRef);

    try {
        // Gets documents based on query parameters 
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((docSnapshot) => ({
            data: docSnapshot.data(),
            id: docSnapshot.id,
        }))
    } catch (error: any) {
        if (error.code === 'permission-denied') {
            throw new Error(error.code);
        }

        console.log('error fetching user data' , error.code);
    }
};

export const updateUsersDoc = async (data: UserObject, id: string) => {
    const docRef = doc(db, 'users', id);

        try {
            await setDoc(docRef, data)
        } catch (error: any) {
            if (error.code === 'permission-denied') {
                throw new Error(error.code);
            }
    
            console.log('error updating course' , error.code);
        }
    
}

export const deleteUserDoc = async (id:string) => {
    const docRef = doc(db, 'users', id);

    try {
        // Removes course from document 
        await deleteDoc(docRef);
    } catch (error: any) {
        if (error.code === 'permission-denied') {
            throw new Error(error.code);
        }

        console.log('error deleting user' , error.code);
    }
}
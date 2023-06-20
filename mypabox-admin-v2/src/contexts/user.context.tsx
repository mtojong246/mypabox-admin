import { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase.utils";
import { User } from "firebase/auth";

interface State {
    currentUser: User | null;
}

interface UserState extends State {
    setCurrentUser: Dispatch<SetStateAction<User| null>>
}

export const UserContext = createContext<UserState>({
    currentUser: null,
    setCurrentUser: () => {},
})

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [ currentUser, setCurrentUser ] = useState<User | null>(null);

    console.log(currentUser);

    // Listens to auth state and sets current user 
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user)
            }
            setCurrentUser(user)
        })
        return unsubscribe;
    }, [])

    const value = { currentUser, setCurrentUser };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    )
}
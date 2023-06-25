import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "../utils/firebase/firebase.utils";
import { User } from "firebase/auth";

// Typing for State
interface State {
  currentUser: User | null;
}

// Extending State to create UserState
interface UserState extends State {
  setCurrentUser: Dispatch<SetStateAction<User | null>>;
}

// Creating UserContext with default values
export const UserContext = createContext<UserState>({
  currentUser: null,
  setCurrentUser: () => {},
});

// UserProvider component, receives children as props
export const UserProvider = ({ children }: { children: ReactNode }) => {
  // Using state hook for currentUser
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // useEffect hook that listens to auth state and sets currentUser
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    // Clean up function to unsubscribe when component unmounts
    return unsubscribe;
  }, []); // Dependency array is empty, so this effect runs once on mount and cleanup on unmount

  // Creating value object that will be passed as value to UserContext.Provider
  const value = { currentUser, setCurrentUser };

  // UserContext.Provider with value and children
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Changes:

// Removed console.log(currentUser) - Logs should be removed in production code for performance and security reasons.
// Added more comments - Comments can help understand the purpose of the code and increase its readability.

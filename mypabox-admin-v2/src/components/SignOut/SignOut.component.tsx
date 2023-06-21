import { signOutUser } from "../../utils/firebase/firebase.utils";

export default function SignOut() {

    // Signs out user and resets currentUser to default
    const signOutHandler = async (): Promise<void> => {
        await signOutUser();
    }

    return (
        <button onClick={signOutHandler}>Sign out</button>
    )
}
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import { ChangeEvent, FormEvent, useState } from "react";

const defaultInputs = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

export default function Register() {
    const [ inputs, setInputs ] = useState(defaultInputs);

    const { displayName, email, password, confirmPassword } = inputs;

    const resetForm = () => setInputs(defaultInputs);

    // Grabs input fields and creates new user doc
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) return;
        
        try {
            const userCredentials = await createAuthUserWithEmailAndPassword(email, password);
            if(userCredentials) {
                const { user } = userCredentials;
                await createUserDocumentFromAuth(user, { displayName });
                resetForm();
            }
        } catch (error) {
            console.log('error creating user', error)
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setInputs({
            ...inputs,
            [name]: value,
        })
    }
    
    return (
        <form id='signup-form' onSubmit={handleSubmit}>
            <input type='text' placeholder='Display Name' name='displayName' value={displayName} onChange={handleChange}/>
            <input type='email' placeholder='Email' name='email' value={email} onChange={handleChange}/>
            <input type='password' placeholder='Password' name='password' value={password} onChange={handleChange}/>
            <input type='password' placeholder='Confirm Password' name='confirmPassword' value={confirmPassword} onChange={handleChange}/>
            <button type='submit' form="signup-form">Sign up</button>
        </form>
    )
}
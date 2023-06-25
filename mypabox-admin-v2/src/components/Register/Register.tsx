import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import { ChangeEvent, FormEvent, useState } from "react";

const defaultInputs = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function Register() {
  const [inputs, setInputs] = useState(defaultInputs);
  const [error, setError] = useState("");

  const { displayName, email, password, confirmPassword } = inputs;

  const resetForm = () => setInputs(defaultInputs);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!displayName || !email || !password || !confirmPassword) {
      setError("All fields must be filled");
      return;
    }

    try {
      const userCredentials = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      if (userCredentials) {
        const { user } = userCredentials;
        await createUserDocumentFromAuth(user, { displayName });
        resetForm();
      }
    } catch (error) {
      console.log("error creating user", error);
      setError("Error creating user");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
    setError(""); // reset error message upon changing inputs
  };

  return (
    <>
      {error && <p>{error}</p>}
      <form id="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Display Name"
          name="displayName"
          value={displayName}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
        />
        <button type="submit" form="signup-form">
          Sign up
        </button>
      </form>
    </>
  );
}

// Changes
// Error Messages: You could provide a feedback to the user when the password and the confirmPassword do not match.
// Input Validation: You could add some basic front-end validation for the fields. For instance, checking if the inputs are not empty before making a request.
// Separation of Concerns: Separating the business logic from the component could make it easier to read and maintain.

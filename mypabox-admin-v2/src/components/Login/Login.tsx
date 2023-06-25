// import { ChangeEvent, useState, FormEvent } from "react";
// import { signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
// import { useNavigate } from "react-router-dom";
// import logo from '../../My PA Box - Logo Polychrome Vertical.jpg'

// const defaultInputs = {
//   email: '',
//   password: '',
// }

// export default function Login() {
//   const [ inputs, setInputs ] = useState(defaultInputs);

//   const { email, password } = inputs;

//   //Clears form
//   const resetForm = () => setInputs(defaultInputs);

//   const navigate = useNavigate()

//   //Updates inputs when form is being typed in
//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;

//     setInputs({
//         ...inputs,
//         [name]: value,
//     })
// }

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     // eslint-disable-next-line no-lone-blocks
//     {/* If data from form matches with data from Firebase, the form is reset, the email & password
//     is saved in local storage, and the user is navigated to the main page */}
//     // If data from form doesn't match with data from Firebase, an error will appear in the console log
//     try {
//         const userCredentials = await signInAuthUserWithEmailAndPassword(email, password);
//         if(userCredentials) {
//             resetForm();
//         }
//         localStorage.setItem('email', email)
//         localStorage.setItem('password', password)
//         navigate('/main')
//     } catch (error) {
//         console.log('error creating user', error)
//     }
//   }

import { ChangeEvent, useState, FormEvent } from "react";
import { signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye } from 'react-icons/ai'
import logo from "../../My PA Box - Logo Polychrome Vertical.jpg";
import { AppDispatch } from "../../app/store";
import { useDispatch } from "react-redux/es/exports";
import { login } from "../../app/slices/login";

const defaultInputs = {
  email: "",
  password: "",
};

export default function Login() {
  const [inputs, setInputs] = useState(defaultInputs);
  const [showPassword, setShowPassword] = useState('password')
  // Using navigate hook from react-router-dom
  const navigate = useNavigate();
  // Dispatches action from redux
  const dispatch: AppDispatch = useDispatch()

  const { email, password } = inputs;

  //Updates inputs when form is being typed in
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [e.target.name]: e.target.value,
    }));
  };

  // Function runs when the eye icon is clicked
  const handleShowPassword = () => {
    if (showPassword === 'password') {
      // If the input type is password, it will be changed to text and the password will be shown
      setShowPassword('text')
    } else {
      // If the input type is text, it will be changed to password and the password will be hidden
      setShowPassword('password')
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userCredentials = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      if (userCredentials) {
        setInputs(defaultInputs);
        // The login action will be dispatched which updates the email and password in the login reducer
       // dispatch({ type: 'login', payload: { email, password }})
        dispatch(login({ email, password }))
        // User will be navigated to the main page via the main route
        navigate("/main");
      }
    } catch (error) {
      // If email or password is not found in the database, the error will appear in the console log
      console.log("Wrong email or password");
    }
  };

  // Changes:

  // Removed resetForm function. You don't need an extra function for setting the state to its default value. You can do it directly within the if condition in the handleSubmit function.
  // Moved the navigate hook above the destructuring of inputs as it doesn't depend on them.
  // When setting a new state that depends on the previous state, you should use a function as an argument to your state setter function. This ensures that you're always using the most recent state.
  // Additional Notes:

  // Storing sensitive data like a password in local storage is generally a bad idea. The data in local storage is accessible to any script running on the page and it persists even when the browser is closed and reopened. You might want to re-evaluate this part of your code.
  // In your catch block, you may want to provide a user-friendly error message to your users rather than simply logging the error. This is a better practice for handling errors and improving the user experience.

  return (
    <>
      <img src={logo} alt="My PA Box" className="w-[50%] ml-4 mt-4 z-10" />
      <form
        id="signin-form"
        onSubmit={handleSubmit}
        className="relative border ml-[784px] h-96 z-30 -mt-[500px] 
        border-l-16 border-gray-400 border-y-0 border-r-0 w-[660px]"
      >
        <p className="text-2xl ml-16 select-none font-semibold text-[#124967]">
          Log in to your account
        </p>

        <div className="relative mt-[30px] ml-16 w-[620px] z-20">
          <label className="font-bold select-none text-md">Email Address</label>
          <input
            type="email"
            className="block border focus:outline-none border-black mt-2
          rounded h-[45px] w-full"
            placeholder="Email"
            value={email}
            name="email"
            onChange={handleChange}
          />
        </div>

        <div className="mt-[20px] ml-16 w-[620px]">
          <label className="font-bold select-none text-md">Password</label>
          <input
            type={showPassword}
            className="block border border-black mt-2 w-full h-[45px] rounded 
          focus:outline-none bg-gray-200"
            placeholder="Password"
            value={password}
            name="password"
            onChange={handleChange}
          />
          <div className="ml-[590px] text-2xl -mt-8">
            <AiOutlineEye onClick={handleShowPassword}/>
          </div>
        </div>

        <button
          type="submit"
          form="signin-form"
          className="mt-[40px] text-xl border ml-16 bg-[#5B7E92] select-none
        text-white border-black w-[620px] h-[40px] rounded-full"
        >
          Login
        </button>
      </form>
    </>
  );
}

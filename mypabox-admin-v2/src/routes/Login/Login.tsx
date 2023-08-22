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
        dispatch(login({ email, password }))
        // User will be navigated to the main page via the main route
        navigate("/schools");
      }
    } catch (error) {
      // If email or password is not found in the database, the error will appear to the user
      alert("Wrong email or password");
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
    <div className='w-screen h-screen px-10 flex justify-center items-center'>
      <div className='w-full flex flex-col xl:flex-row justify-center items-center gap-10'>
        <img src={logo} alt="My PA Box" className="w-full max-w-[600px]" />
        <form
          id="signin-form"
          onSubmit={handleSubmit}
          className="border
          xl:border-l border-l-0 border-r-0 border-b-0 border-t border-gray-400 xl:border-y-0  max-w-[900px] xl:min-w-[600px] xl:pl-20 xl:pt-0 pt-20 w-full"
        >
          <p className="text-2xl select-none font-semibold text-[#124967]">
            Log in to your account
          </p>

          <div className="mt-[30px] w-full z-20">
            <label className="font-bold select-none text-md">Email Address</label>
            <input
              type="email"
              className="block border focus:outline-none border-black mt-2
            rounded p-4 w-full"
              placeholder="Email"
              value={email}
              name="email"
              onChange={handleChange}
            />
          </div>

          <div className="mt-[20px] w-full">
            <label className="font-bold select-none text-md">Password</label>
            <div className='block border border-black mt-2 w-full rounded 
            focus:outline-none bg-gray-200 flex justify-between items-center p-4'>
              <input
                type={showPassword}
                className="grow bg-gray-200"
                placeholder="Password"
                value={password}
                name="password"
                onChange={handleChange}
              />
              <div className="text-2xl hover:cursor-pointer">
                <AiOutlineEye onClick={handleShowPassword}/>
              </div>
            </div>
          </div>

          <button
            type="submit"
            form="signin-form"
            className="mt-[40px] text-lg border bg-[#5B7E92] select-none
          text-white border-black w-full p-2 rounded-full hover:bg-[#334652]"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
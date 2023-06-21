import { ChangeEvent, useState, FormEvent } from "react";
import { signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import { useNavigate } from "react-router-dom";

const defaultInputs = {
  email: '',
  password: '',
}

export default function Login() {
  const [ inputs, setInputs ] = useState(defaultInputs);

  const { email, password } = inputs;

  const resetForm = () => setInputs(defaultInputs);

  const navigate = useNavigate()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputs({
        ...inputs,
        [name]: value,
    })
}

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
        const userCredentials = await signInAuthUserWithEmailAndPassword(email, password);
        if(userCredentials) {
            resetForm();
        }
        localStorage.setItem('email', email)
        localStorage.setItem('password', password)
        navigate('/main')
    } catch (error) {
        console.log('error creating user', error)
    }
  }

  return (
    <form id='signin-form' onSubmit={handleSubmit}>
      <p className="text-4xl text-center font-semibold mt-40">Log In</p>
      <input type="email" className="block border focus:outline-none border-black ml-[600px] mt-8 
      rounded-md h-[45px] w-80" placeholder="Email"
      value={email} name='email'  onChange={handleChange} />
      <input type="text" className="block border border-black ml-[600px] mt-4 w-80 h-[45px] rounded-md 
      focus:outline-none bg-gray-200" placeholder="Password"
      value={password} name='password' onChange={handleChange} />

      <button type='submit' form='signin-form' className="mt-8 text-2xl border ml-[600px] bg-blue-400 text-white border-black w-80 h-[40px] rounded-lg">
        Log In
      </button>
    </form>
  )
}


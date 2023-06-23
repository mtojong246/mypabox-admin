import { ChangeEvent, useState, FormEvent } from "react";
import { signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import { useNavigate } from "react-router-dom";
import logo from '../../My PA Box - Logo Polychrome Vertical.jpg'

const defaultInputs = {
  email: '',
  password: '',
}

export default function Login() {
  const [ inputs, setInputs ] = useState(defaultInputs);

  const { email, password } = inputs;

  //Clears form
  const resetForm = () => setInputs(defaultInputs);

  const navigate = useNavigate()

  //Updates inputs when form is being typed in
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputs({
        ...inputs,
        [name]: value,
    })
}

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // eslint-disable-next-line no-lone-blocks
    {/* If data from form matches with data from Firebase, the form is reset, the email & password 
    is saved in local storage, and the user is navigated to the main page */}
    // If data from form doesn't match with data from Firebase, an error will appear in the console log
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
    <>
      <img src={logo} alt="My PA Box"  className="w-[50%] ml-4 mt-4" />
      <form id='signin-form' onSubmit={handleSubmit} className="border ml-[784px] h-96 z-30 -mt-[500px] 
      border-l-16 border-gray-400 border-y-0 border-r-0 w-[660px]">
        <p className="text-2xl ml-16 font-semibold text-[#124967]">Log in to your account</p>

        <div className="mt-[30px] ml-16 w-[620px]">
          <label className="font-bold text-md">Email Address</label>
          <input type="email" className="block border focus:outline-none border-black mt-2
          rounded h-[45px] w-full" placeholder="Email" value={email} name='email'  onChange={handleChange} />
        </div>

        <div className="mt-[20px] ml-16 w-[620px]">
          <label className="font-bold text-md">Password</label>
          <input type="password" className="block border border-black mt-2 w-full h-[45px] rounded 
          focus:outline-none bg-gray-200" placeholder="Password" value={password} name='password' onChange={handleChange} />
        </div>

        <button type='submit' form='signin-form' className="mt-[40px] text-xl border ml-16 bg-[#5B7E92]
        text-white border-black w-[620px] h-[40px] rounded-full">
          Login
        </button>
      </form>
    </>
  )
}


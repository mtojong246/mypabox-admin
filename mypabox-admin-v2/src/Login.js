import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const login  = () => {
    
    localStorage.setItem('email', email)
    localStorage.setItem('password', password)
    navigate('/main')
  }

  return (
    <form onSubmit={login}>
      <p className="text-4xl text-center font-semibold mt-40">Log In</p>
      <input type="email" className="block border focus:outline-none border-black ml-[600px] mt-8 
      rounded-md h-[45px] w-80" placeholder="Email"
      value={email} onChange={handleEmail} />
      <input type="text" className="block border border-black ml-[600px] mt-4 w-80 h-[45px] rounded-md 
      focus:outline-none bg-gray-200" placeholder="Password"
      value={password} onChange={handlePassword} />

      <button className="mt-8 text-2xl border ml-[600px] bg-blue-400 text-white border-black w-80 
      h-[40px] rounded-lg">
        Log In
      </button>
    </form>
  )
}

export default Login
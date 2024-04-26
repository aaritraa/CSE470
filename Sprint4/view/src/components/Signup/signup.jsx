import React from 'react'
import SignupImg from '../../assets/login.png';
import background from '../../assets/animal-background-vector-with-cute-pets-illustration_53876-127698.png'
import { Link } from 'react-router-dom'
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from "../../App.jsx"

const signup = () => {
  const { u, setU } = useContext(UserContext);
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()
  const [result, setResult] = useState()

  const handleSubmit = (e) => {  // form submit
    e.preventDefault()
    axios.post('http://localhost:5000/signup', { firstName, lastName, email, password }) // sending json body to server for uploading to DB
      .then((result) => {
        console.log(result.data)  // showing response which came back from the server
        setResult(result)
        if (result.data[0] !== "Email already exists") {
          setU([result.data[1].email], result.data[0], "", "")
          navigate("/profile")  // go to login page after registering          
        }

      })

      .catch(err => console.log(err))
  }



  return (
    <div className='bg-cover bg-center min-h-screen flex justify-center' style={{ backgroundImage: `url(${background})` }}>
      <div className=' flex justify-center items-center pt-100'>
        <div className='w-full h-500 md:w-3/4 lg:w-1/2 xl:w-2/5 '>
          <div className='flex flex-col md:flex-row'>
            <div className='md: w-1/2 bg-white rounded-l-xl p-8 flex flex-col items-center justify-center'>
              <h1 className='text-3x1 font-bold mb-4'>Welcome to PetConnect</h1>
              <img src={SignupImg} alt='Signup' className='w-64 mb-8' />
              <Link to='/login'>
                <button type='button' className='bg-slate-200 hover:bg-amber-300 text-lime-800 rounded-lg w-20 py-2 font-semibold text-medium cursor-pointer transition duration-300 ease-in-out'>Log in</button>
              </Link>
            </div>
            <div className="md: w-1/2 bg-white rounded-r-xl p-8 flex items-center justify-center">
              <form className='w-full' onSubmit={handleSubmit}>
                <h1 className='text-3x1 font-bold mb-6 text-black'>Create Account</h1>
                <input type='text' placeholder='First name' name='firstName' required onChange={(e) => setFirstName(e.target.value)} className='border border-amber-300 rounded py-2 px-4 mb-4 w-full' />
                <input type='text' placeholder='Last name' name='lastName' required onChange={(e) => setLastName(e.target.value)} className='border border-amber-300 rounded py-2 px-4 mb-4 w-full' />
                <input type='email' placeholder='Email' name='email' required onChange={(e) => setEmail(e.target.value)} className='border border-amber-300 rounded py-2 px-4 mb-4 w-full' />
                <input type='password' placeholder='Password' name='password' required onChange={(e) => setPassword(e.target.value)} className='border border-amber-300 rounded py-2 px-4 mb-4 w-full' id='passwordInput' />
                <button type='submit' className='bg-slate-200 hover:bg-amber-300 text-lime-800 rounded-lg w-full py-3 font-semibold text-medium cursor-pointer font-sans transition duration-300 ease-in-out hover:text-black'>Sign Up</button>

                <div id="login-error">
                  {
                    (result && result.data === "Email already exists") ? (<div>{result.data}</div>) : (<></>)
                  }

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default signup
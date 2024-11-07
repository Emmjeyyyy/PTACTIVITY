import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

const Signuppage = () => {
    const [signupinfo, setSignupinfo] = useState({
        email:'',
        password:'',
        confirmPassword:''
    });
    const navigate = useNavigate();

    const signUp = () => {
        if(signupinfo.password !== signupinfo.confirmPassword){
            alert("password is not the same")
            return
        }
        
        createUserWithEmailAndPassword(auth, signupinfo.email, signupinfo.password).then(() => {
            navigate('/')
        }).catch((err) => alert(err.message))
    }
  return (
    <div class="min-h-screen flex items-center justify-center bg-[#222f35] py-12 px-4">
      <div class="max-w-md w-full space-y-8 bg-[#16171b] p-[100px] rounded-[20px] font-mono">
        <div>
          <img class="mx-auto h-12 w-auto" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" alt="logo" />
          <h2 class="mt-6 text-center text-3xl font-extrabold text-white">Sign in to your account</h2>
        </div>
        <div class="mt-8 space-y-6">
          <div class="rounded-md shadow-sm">
            <div>
              <input 
              value={signupinfo.email} 
              onChange={(e) => setSignupinfo({...signupinfo, email: e.target.value})} 
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:border-[#000000] focus:z-10 sm:text-sm" placeholder="Email address" />
            </div>
            <div>
              <input 
              value={signupinfo.password}
              onChange={(e) => setSignupinfo({...signupinfo, password: e.target.value})} 
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-[#000000] focus:z-10 sm:text-sm" placeholder="Password" />
            </div>
            <div>
              <input 
              value={signupinfo.confirmPassword} 
              onChange={(e) => setSignupinfo({...signupinfo, confirmPassword: e.target.value})} 
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:border-[#000000] focus:z-10 sm:text-sm" placeholder="Confirm Password" />
            </div>
          </div>
            <button onClick={signUp} class="group relative w-full flex justify-center py-2 px-5 border border-transparent text-[15px] font-medium rounded-md text-white bg-[#38a0bd] hover:bg-[#3a5d85]">
              Sign up
            </button>
          </div>
          <div class="flex justify-end">
              <Link to='/' class="text-[20px] text-[#38a0bd] hover:text-[#59bfdb]">
                Go back
              </Link>
            </div>
          <div>
        </div>
      </div>
    </div>
  )
}

export default Signuppage

import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';

const Loginpage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const emailChange = (e) => {
    setEmail(e.target.value);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const signIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      if (user) {
        // Store user ID in Firestore collection
        const userDocRef = doc(db, 'users', user.uid);
        await setDoc(userDocRef, { uid: user.uid });
  
        navigate('/homepage');
        alert(user.email);
      } else {
        throw new Error('User not found.');
      }
    } catch (error) {
      console.error('Error signing in:', error.message);
    }
    setEmail('');
    setPassword('');
  };
  

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/homepage');
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#222f35] py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-[#16171b] p-[100px] rounded-[20px] font-mono">
        <div>
          <img className="mx-auto h-12 w-auto" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" alt="logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Sign in to your account</h2>
        </div>
        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm">
            <div>
              <input value={email} type="text" onChange={emailChange} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:border-[#000000] focus:z-10 sm:text-sm" placeholder="Email address" />
            </div>
            <div>
              <input value={password} type="password" onChange={passwordChange} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:border-[#000000] focus:z-10 sm:text-sm" placeholder="Password" />
            </div>
          </div>
          <div>
            <button onClick={signIn} className="mt-1 group relative w-full flex justify-center py-2 px-5 border border-transparent text-[15px] font-medium rounded-md text-white bg-[#38a0bd] hover:bg-[#3a5d85]">
              Sign in
            </button>
          </div>
          <div className="flex justify-end mr-2">
            <Link to="/signup" className="text-[20px] text-[#38a0bd] hover:text-[#59bfdb]">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;

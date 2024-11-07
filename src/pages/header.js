import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const HeaderPage = () => {
  const navigate = useNavigate();
  const [uid, setUid] = useState('');
  const [email, setEmail] = useState('');
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [showSignOutConfirmation, setShowSignOutConfirmation] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (auth.currentUser) {
          setUid(auth.currentUser.uid || '');
          setEmail(auth.currentUser.email || '');
        } else {
          setUid('');
          setEmail('');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSignOut = () => {
    setShowSignOutConfirmation(true);
  };

  const confirmSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch(err => {
        alert(err.message);
      });
  };

  const cancelSignOut = () => {
    setShowSignOutConfirmation(false);
  };

  return (
    <>
      <div className=' bg-[#282b36] flex gap-x-[50px] p-3 font-bold font-mono text-[20px] shadow-black'>
        <div className=' w-[50px] h-[45px] ml-10 '>
          <img src={'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png'} className=' w-[70px] h-[45px]' alt="logo" />
        </div>

        <div className='flex flex-row mt-[10px] gap-x-[100px]'>
          <div>
            <Link className='no-underline text-white hover:text-[#60c2ff] duration-300 ease-in-out' to='/homepage'>Home</Link>
          </div>

          <div>
            <Link className='no-underline text-white hover:text-[#60c2ff] duration-300 ease-in-out' to='/mylist'>My List</Link>
          </div>
        </div>

        <div className='ml-auto flex items-center gap-x-[20px]'>
          <button onClick={handleSignOut} className='no-underline text-white hover:text-[#60c2ff] duration-300 ease-in-out pr-[20px]'>Sign out</button>
          {showSignOutConfirmation && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
              <div className="bg-[#1e242b] text-white flex flex-col justify-center items-center w-[430px] h-[250px] p-5 rounded-lg shadow-lg border border-[#45dee3]">
                <p className="mb-4 text-[25px] font-semibold">Do you want to sign out?</p>
                <div className="flex gap-4">
                  <button onClick={confirmSignOut} className="bg-cyan-600 text-white py-2 px-4 rounded hover:bg-cyan-700 hover:scale-110 transition duration-200 w-[80px]">Yes</button>
                  <button onClick={cancelSignOut} className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 hover:scale-110 transition duration-200 w-[80px]">No</button>
                </div>
              </div>
            </div>
          )}

        </div>

        <div className='fixed bottom-0 text-white opacity-25 text-[20px]'>
          <span className='text-white'>{time}</span>
        </div>
        <div className='fixed flex flex-row justify-end bottom-0 right-0 pr-1 text-white opacity-25 text-[13px]'>
          <p>{email}_</p>
          <p>{uid}</p>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default HeaderPage;

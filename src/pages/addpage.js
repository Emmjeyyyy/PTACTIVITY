//        NOT USED
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../firebase';

const Addpage = ({ onClose, anime }) => {
  const [status, setStatus] = useState('');

  const curruser = auth.currentUser.uid;
  const collectionRef = collection(db, curruser);

  const addAnime = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await addDoc(collectionRef, {
          title: anime,
          status,
        });
       
        onClose();
      } else {
        console.error('User not found');
      }
    } catch (error) {
      console.error('Error adding anime:', error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75 z-10 font-mono">
      <div className="bg-white p-8 rounded-lg flex flex-col w-[450px] h-[600px] font-bold">
        <h2 className="text-2xl font-bold mb-4">Add Anime</h2>
        <p className="mb-4">Title: {anime}</p>
        <div class='flex flex-row'>
        <text class='mr-2'>Status:</text>
        <input
          type="text"
          placeholder="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-[250px] mb-4 p-2 border border-gray-300 rounded"
        />
        </div>
        
        
        
        
        <div className="flex justify-end">
          <button onClick={addAnime} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mr-2">
            Add
          </button>
          <button onClick={onClose} className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Addpage;

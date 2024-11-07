import React, { useEffect, useMemo, useState } from 'react';
import { auth, db } from '../firebase';
import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';

const Mylistpage = () => {
  const [animelist, setAnimelist] = useState([]);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editAnimeId, setEditAnimeId] = useState('');
  const [editAnimeStatus, setEditAnimeStatus] = useState('');
  const [editEpWatch, setEditEpWatch] = useState(0);
  const [editScore, setEditScore] = useState(0);
  const [editStart, setEditStart] = useState('');
  const [editFinish, setEditFinish] = useState('');
  const collectionRef = useMemo(() => collection(db, auth.currentUser.uid), []);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const querySnapshot = await getDocs(collectionRef);
        const d = [];
        querySnapshot.forEach((doc) => {
          const anime = { id: doc.id, ...doc.data() };
          d.push(anime);
        });
        setAnimelist(d);
      } catch (error) {
        console.error('Error', error);
        setAnimelist([]);
      }
    };
    fetchAnime();
  }, [collectionRef]); 

  const editAnime = async () => {
    try {
      const animeRef = doc(collectionRef, editAnimeId);
      await updateDoc(animeRef, {
        status: editAnimeStatus,
        epWatch: editEpWatch,
        score: editScore,
        start: editStart,
        finish: editFinish
      });
      setAnimelist(prevList =>
        prevList.map(anime =>
          anime.id === editAnimeId ? { ...anime, status: editAnimeStatus, epWatch: editEpWatch, score: editScore, start: editStart, finish: editFinish } : anime
        )
      );
      setIsEditPopupOpen(false);
    } catch (error) {
      console.error('Error updating anime:', error);
    }
  };

  const deleteAnime = async (animeId) => {
    try {
      await deleteDoc(doc(collectionRef, animeId));
      setAnimelist(prevList => prevList.filter(anime => anime.id !== animeId));
    } catch (error) {
      console.error('Error deleting anime:', error);
    }
  };

  const toggleEditPopup = (animeId, status, epWatch, score, start, finish) => {
    setEditAnimeId(animeId);
    setEditAnimeStatus(status);
    setEditEpWatch(epWatch);
    setEditScore(score);
    setEditStart(start);
    setEditFinish(finish);
    setIsEditPopupOpen(!isEditPopupOpen);
  };

  const generateImageUrl = (title) => {
    let imageUrl = ''; 
  
    if (title === "Naruto") {
      imageUrl = 'https://wallpapercave.com/wp/wp4992925.jpg'; 
    } else if (title === "One Piece") {
      imageUrl = 'https://wallpapers.com/images/featured/one-piece-desktop-idg4aqn5l0lh40dk.jpg'; 
    } else if (title === "Kaiju No.8") {
      imageUrl = 'https://m.media-amazon.com/images/M/MV5BMzUxOTBlNzMtYzAyZi00MDNhLWE3OGUtYWQ5MzQyZGE1OGYwXkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_.jpg'
    } else if (title === "Dr. Stone") {
      imageUrl = 'https://assetsio.reedpopcdn.com/Dr.-Stone-banner.jpg?width=1600&height=900&fit=crop&quality=100&format=png&enable=upscale&auto=webp'; 
    } else if (title === "Bucket List of the Dead") {
      imageUrl = 'https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABUGC6qQVLxJcZ5WSf1Wj21BJRQ1T_Fwe8Obyd847qVWo-w2a8oupeNSdzvy9URPsyw_nOyklpTIa4vc08o5oTbLBnS6vl6w3WL8K.jpg?r=b76'; 
    } else if (title === "Undead Unluck") {
      imageUrl = 'https://dwgkfo5b3odmw.cloudfront.net/img/manga_series_header/693-011920_Page_Header_2000x800_jpg_wm'; 
    } else if (title === "Solo Leveling") {
      imageUrl = 'https://theleonid.files.wordpress.com/2020/11/d9c2c9cc-75cb-4cc6-97dc-be2bc06484d3.jpg?w=707'; 
    } else if (title === "Frieren: Beyond Journey's End") {
      imageUrl = 'https://www.pinkvilla.com/images/2024-03/618109605_frieren-anime.jpg'; 
    } else if (title === "My Hero Academia") {
      imageUrl = 'https://anibproductions.files.wordpress.com/2017/07/wp1874080.png?w=1200';
    } else if (title === "Vinland Saga") {
      imageUrl = 'https://static1.srcdn.com/wordpress/wp-content/uploads/2023/04/vinland-saga-season-2-visual.jpg';
    } else if (title === "Hunter x Hunter") {
      imageUrl = 'https://cdn.oneesports.vn/cdn-data/sites/4/2023/10/Anime_HunterxHunter.jpg';
    } else if (title === "One Punch Man") {
      imageUrl = 'https://ew.com/thmb/MZNup35krW5mj3gS9G3fVteXA5Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/One-Punch-Man-766846e9dec5417cb1b32ac2f6735541.jpg'; 
    } else if (title === "Jujutsu Kaisen") {
      imageUrl = 'https://p325k7wa.twic.pics/high/jujutsu-kaisen/jujutsu-kaisen-cursed-clash/00-page-setup/JJK-header-mobile2.jpg?twic=v1/resize=760/step=10/quality=80'; 
    } else if (title === "Demon Slayer") {
      imageUrl = 'https://cdn.oneesports.gg/cdn-data/2023/01/Anime_DemonSlayer_AllHashira_2.jpg'; 
    } else if (title === "Bleach") {
      imageUrl = 'https://www.japanpowered.com/media/images/1952586-bleach_wallpaper_04.jpg'; 
    }
    
    
    return imageUrl; 
  };

  const filteredAnimeList = useMemo(() => {
    if (!selectedCategory) return animelist;
    return animelist.filter(anime => anime.status.toLowerCase() === selectedCategory.toLowerCase());
  }, [animelist, selectedCategory]);
  
  return (
    <>
      {animelist.length === 0 ? (
        <div class='flex flex-col justify-center items-center h-[100vh]'>

          <p className='text-white font-nunito m-3 text-[30px]'>Please add an Anime
            <span class="animate-[ping_1.5s_0.5s_ease-in-out_infinite]">.</span>
            <span class="animate-[ping_1.5s_0.7s_ease-in-out_infinite]">.</span>
            <span class="animate-[ping_1.5s_0.9s_ease-in-out_infinite]">.</span>
          </p>

        </div>
      ) : (
        <div className="bg-[#16171b] min-h-screen py-12 ">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#ffffff] sm:text-4xl">My Anime List</h2>


                  <div className="flex justify-start my-[20px] ml-[30px] space-x-4 ">

                    <button className={`text-white ${selectedCategory === '' ? 'bg-[#3ea8dd]' : 'hover:bg-gray-600 transition-colors duration-200'} px-4 py-2 rounded`} onClick={() => setSelectedCategory('')}>All</button>
                    <button className={`text-white ${selectedCategory === 'watching' ? 'bg-[#3ea8dd]' : 'hover:bg-gray-600 transition-colors duration-200'} px-4 py-2 rounded`} onClick={() => setSelectedCategory('watching')}>Watching</button>
                    <button className={`text-white ${selectedCategory === 'completed' ? 'bg-[#3ea8dd]' : 'hover:bg-gray-600 transition-colors duration-200'} px-4 py-2 rounded`} onClick={() => setSelectedCategory('completed')}>Completed</button>
                    <button className={`text-white ${selectedCategory === 'plan to watch' ? 'bg-[#3ea8dd]' : 'hover:bg-gray-600 transition-colors duration-200'} px-4 py-2 rounded`} onClick={() => setSelectedCategory('plan to watch')}>Plan to Watch</button>

                  </div>


            <div className="mt-6 grid gap-16 lg:grid-cols-2 xl:grid-cols-3 ">
            {filteredAnimeList.map((anime) => (
               <div key={anime.id} className="relative bg-[#21242a] rounded-lg shadow-lg  shadow-[#0d0d0d]  hover:shadow-[#404c58]  overflow-hidden border border-[#242424] transition-transform duration-300 transform hover:scale-105">
                  <div class='overflow-hidden w-full h-48'>
                      <img className="w-full h-full object-cover object-center" src={generateImageUrl(anime.title)} alt={anime.title} />
                  </div>
                  <div className="p-6">
                      <h3 className="text-[20px] font-semibold text-[#ffffff]">{anime.title}</h3>
                      <p className="mt-2 text-sm text-gray-400">Status: <span class='text-[#58c7ff]'> {anime.status}</span></p>
                      <p className="text-sm text-gray-400">Episodes Watched: <span class='text-[#58c7ff]'>{anime.epWatch}</span></p>
                      <p className="text-sm text-gray-400">Score: <span class='text-[#58c7ff]'>{anime.score}</span></p>
                      <p className="text-sm text-gray-400">Start Date: <span class='text-[#58c7ff]'>{anime.start}</span></p>
                      <p className="text-sm text-gray-400">Finish Date:  <span class='text-[#58c7ff]'>{anime.finish}</span></p>
                      <div className="mt-4 flex justify-end">
                          <button className="z-10 bg-[#378bd5] text-white px-4 py-2 rounded-md mr-2 hover:bg-[#264567] transition-colors duration-300 ease-in-out hover:shadow-md" onClick={() => deleteAnime(anime.id)}>Delete</button>
                          <button className="z-10 bg-[#16191f] text-white px-4 py-2 rounded-md hover:bg-[#404856] transition-colors duration-300 ease-in-out hover:shadow-md" onClick={() => toggleEditPopup(anime.id, anime.status, anime.epWatch, anime.score, anime.start, anime.finish)}>Edit</button>
                      </div>
                  </div>
              </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {isEditPopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75 z-10 font-mono">
          <div className="bg-[#121416] p-8 rounded-lg flex flex-col w-[450px] h-[560px] font-bold space-y-2 border border-[#47fdfa]">
            <h2 className="text-2xl font-bold mb-4 text-[#49cbff]">Edit Anime</h2>
            
            <label className='text-[#49cbff]'>Status:</label>
            <div className='flex flex-col p-1 bg-white rounded-[4px]'>
              <select className='rounded-[5px] p-1 outline-none' value={editAnimeStatus} onChange={(e) => setEditAnimeStatus(e.target.value)}>
                <option>-</option>
                <option>Watching</option>
                <option>Completed</option>
                <option>Plan to Watch</option>
              </select>
            </div>

            <label className='text-[#49cbff]'>Episodes Watched:</label>
            <div className='flex flex-col p-2 pl-[11px] bg-white rounded-[4px]'>
              <input
                className='outline-none'
                type="number"
                value={editEpWatch}
                onChange={(e) => setEditEpWatch(Math.max(0, parseInt(e.target.value)))}
              />
            </div>

            <label className='text-[#49cbff]'>Score:</label>
            <div className='flex flex-col p-1 bg-white rounded-[4px]'>
              <select class='rounded-[5px] p-1 outline-none' value={editScore} onChange={(e) => setEditScore(e.target.value)}>
                  <option>-</option>
                  <option>10</option>
                  <option>9</option>
                  <option>8</option>
                  <option>7</option>
                  <option>6</option>
                  <option>5</option>
                  <option>4</option>
                  <option>3</option>
                  <option>2</option>
                  <option>1</option>
              </select>
            </div>

            <label className='text-[#49cbff]'>Start Date:</label>
            <div className='flex flex-col p-1 bg-white rounded-[4px]'>
              <input className='outline-none' type="date" value={editStart} onChange={(e) => setEditStart(e.target.value)} />
            </div>

            <label className='text-[#49cbff]'>Finish Date:</label>
            <div className='flex flex-col p-1 bg-white rounded-[4px]'>
              <input className='outline-none' type="date" value={editFinish} onChange={(e) => setEditFinish(e.target.value)} />
            </div>

            <div className="flex justify-end pt-3">
              <button onClick={editAnime} className="bg-cyan-500 text-white py-2 px-4 rounded hover:bg-cyan-600 mr-2 duration-300 ease-in-out hover:shadow-md">
                Save
              </button>
              <button onClick={() => setIsEditPopupOpen(false)} className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400 duration-300 ease-in-out hover:shadow-md">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Mylistpage;

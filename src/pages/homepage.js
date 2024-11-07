import { useEffect, useMemo, useState } from 'react';
import { auth, db } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { addDoc, collection, getDocs } from 'firebase/firestore';

const Homepage = () => {
  //for avrage scores
  const [animeList, setAnimeList] = useState([]);
  const [naruto, setNaruto] = useState(null);
  const [onepiece, setOnepiece] = useState(null);
  const [kaiju, setKaiju] = useState(null);
  const [drstone, setDrstone] = useState(null);
  const [zom100, setZom100] = useState(null);
  const [undead, setUndead] = useState(null);
  const [solo, setSolo] = useState(null);
  const [frieren, setFrieren] = useState(null);
  const [mha, setMha] = useState(null);
  const [vinland, setVinland] = useState(null);
  const [hunter, setHunter] = useState(null);
  const [opm, setOpm] = useState(null);
  const [jjk, setJjk] = useState(null);
  const [demon, setDemon] = useState(null);
  const [bleach, setBleach] = useState(null);

  const [anime, setAnime] = useState('');
  const [showAnime, setShowAnime] = useState(false);
  const navigate = useNavigate();
  const [cur, setCur] = useState(null);
  const [status, setStatus] = useState('');
  const [epWatch, setepWatch] = useState(0);
  const [score, setScore] = useState(0);  
  const [start, setStart] = useState('');   
  const [finish, setFinish] = useState('');    
  
  const togglePopup = async (animeTitle) => {
    try {
      setAnime(animeTitle);
      const querySnapshot = await getDocs(collectionRef);
      const animeExists = querySnapshot.docs.some(doc => doc.data().title === animeTitle);
      
      if (!animeExists) {
        setShowAnime(!showAnime);
        setStatus('');
      } else {
        alert("Anime already added");
      }
    } catch (error) {
      console.error('Error toggling popup:', error);
    }
  };
  

  const collectionRef = useMemo(() => {
    if (cur) {
      return collection(db, cur);
    }
  }, [cur]);

  useEffect(() => {
    const dd = auth.onAuthStateChanged(user => {
      if (!user) {
        navigate('/');
      } else {
        setCur(user.uid);
      }
    });

    return () => dd();
  }, [navigate]);

  const addAnime = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await addDoc(collectionRef, {
          title: anime,
          status, 
          epWatch,
          score,
          start,
          finish,
        });
        setShowAnime(false);
        setStatus('');
      } else {
        console.error('User not found');
      }
    } catch (error) {
      console.error('Error adding anime:', error);
    }
  };
  
  // for average
  useEffect(() => {
    const fetchAnimeData = async () => {
      try {
        const usersCollection = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCollection);

        const animeDataMap = {};

        usersSnapshot.forEach((userDoc) => {
          const userAnimeCollection = collection(db, userDoc.id);
          const promise = getDocs(userAnimeCollection);

          promise.then((userAnimeSnapshot) => {
            userAnimeSnapshot.forEach((doc) => {
              const anime = doc.data();
              const { title, score } = anime;

              if (animeDataMap[title]) {
                animeDataMap[title].totalScore += parseInt(score);
                animeDataMap[title].count += 1;
              } else {
                animeDataMap[title] = {
                  totalScore: parseInt(score),
                  count: 1,
                };
              }
            });

            const animeData = Object.keys(animeDataMap).map((title) => ({
              title,
              score: animeDataMap[title].totalScore / animeDataMap[title].count,
              averageScore: parseFloat(animeDataMap[title].totalScore / animeDataMap[title].count),
            }));

            setAnimeList(animeData);
            
            //Naruto
            const narutoD = animeData.find((anime) => anime.title === 'Naruto');
            if (narutoD) {
              setNaruto(narutoD.averageScore);
            } else if( narutoD == null){
              setNaruto("?");
            } else{
              setNaruto("?");
            }
            //One Piece
            const onepieceD = animeData.find((anime) => anime.title === 'One Piece');
            if (onepieceD) {
              setOnepiece(onepieceD.averageScore);
            } else if( onepieceD == null){
              setOnepiece("?");
            } else{
              setOnepiece("?");
            }
            //Kaiju No.8
            const kaijuD = animeData.find((anime) => anime.title === 'Kaiju No.8');
            if (kaijuD) {
              setKaiju(kaijuD.averageScore);
            } else if( kaijuD == null){
              setKaiju("?");
            } else{
              setKaiju("?");
            }
            //Dr. Stone
            const drstoneD = animeData.find((anime) => anime.title === 'Dr. Stone');
            if (drstoneD) {
              setDrstone(drstoneD.averageScore);
            } else if( drstoneD == null){
              setDrstone("?");
            } else{
              setDrstone("?");
            }
            //Bucket List of the Dead
            const zom100D = animeData.find((anime) => anime.title === 'Bucket List of the Dead');
            if (zom100D) {
              setZom100(zom100D.averageScore);
            } else if( zom100D == null){
              setZom100("?");
            } else{
              setZom100("?");
            }
            //Undead Unluck
            const undeadD = animeData.find((anime) => anime.title === 'Undead Unluck');
            if (undeadD) {
              setUndead(undeadD.averageScore);
            } else if( undeadD == null){
              setUndead("?");
            } else{
              setUndead("?");
            }
             //Solo Leveling
             const soloD = animeData.find((anime) => anime.title === 'Solo Leveling');
             if (soloD) {
               setSolo(soloD.averageScore);
             } else if( soloD == null){
              setSolo("?");
             } else{
               setSolo("?");
             }
             //Frieren: Beyond Journey's End
             const frierenD = animeData.find((anime) => anime.title === "Frieren: Beyond Journey's End");
             if (frierenD) {
               setFrieren(frierenD.averageScore);
             } else if( frierenD == null){
              setFrieren("?");
             } else{
              setFrieren("?");
             }
             //My Hero Academia
             const mhaD = animeData.find((anime) => anime.title === 'My Hero Academia');
             if (mhaD) {
               setMha(mhaD.averageScore);
             } else if( mhaD == null){
              setMha("?");
             } else{
              setMha("?");
             }
             //Vinland Saga
             const vinlandD = animeData.find((anime) => anime.title === 'Vinland Saga');
             if (vinlandD) {
               setVinland(vinlandD.averageScore);
             } else if( vinlandD == null){
              setVinland("?");
             } else{
              setVinland("?");
             }
             //Hunter x Hunter
             const hunterD = animeData.find((anime) => anime.title === 'Hunter x Hunter');
             if (hunterD) {
               setHunter(hunterD.averageScore);
             } else if( hunterD == null){
              setHunter("?");
             } else{
              setHunter("?");
             }
             //One Punch Man
             const opmD = animeData.find((anime) => anime.title === 'One Punch Man');
             if (opmD) {
               setOpm(opmD.averageScore);
             } else if( opmD == null){
              setOpm("?");
             } else{
              setOpm("?");
             }
              //Jujustu Kaisen
             const jjkD = animeData.find((anime) => anime.title === 'Jujutsu Kaisen');
             if (jjkD) {
               setJjk(jjkD.averageScore);
             } else if( jjkD == null){
              setJjk("?");
             } else{
              setJjk("?");
             }
             //Demon Slayer
             const demonD = animeData.find((anime) => anime.title === 'Demon Slayer');
             if (demonD) {
               setDemon(demonD.averageScore);
             } else if( demonD == null){
              setDemon("?");
             } else{
              setDemon("?");
             }
             //Bleach
             const bleachD = animeData.find((anime) => anime.title === 'Bleach');
             if (bleachD) {
               setBleach(bleachD.averageScore);
             } else if( bleachD == null){
              setBleach("?");
             } else{
              setBleach("?");
             }
          });
        });
      } catch (error) {
        console.error('Error fetching anime data:', error);
      }
    };

    fetchAnimeData();
  }, []);

  return (
    <div className='flex flex-col justify-center items-center h-[270vh]'>
      <div className='bg-[#16171b] w-[1130px] h-full m-5 rounded-[20px] flex justify-between p-5'>
        
        
          <div className='rounded-[20px] w-[700px] h-[260vh] bg-[#282b36] flex flex-col items-center space-y-[80px]'>
            <div class='flex flex-row flex-wrap m-[10px]'>

              {/* 1st row */}
              <div class='flex items-center flex-col mb-[30px]'>
                <div className= "font-nunito border border-black drop-shadow-md rounded-[20px] w-[210px] h-[300px] bg-cover bg-top bg-no-repeat m-2 bg-[url('https://preview.redd.it/manga-cover-naruto-shippuden-v0-36gu86d7dsdb1.jpg?width=743&format=pjpg&auto=webp&s=f924463953b6576a7f8e198f5fc2a29e5cb22936')] flex flex-col justify-end items-center">
                    <div class='fixed h-full  rounded-[20px] opacity-0 hover:opacity-100 bg-black bg-opacity-95 transition-opacity duration-300 text-justify tracking-tighter'>
                      <p class='text-white p-2 text-[12px]'>Naruto Uzumaki, is a loud, hyperactive, adolescent ninja who 
                      constantly searches for approval and recognition, as well as to become Hokage, who is acknowledged as 
                      the leader and strongest of all ninja in the village. Naruto Uzumaki wants to be the best ninja in the land.</p>
                      <div class='pl-2 pr-2 flex flex-col'>
                      <p class='text-white text-[13px]'>Score: <span class='text-[#58c7ff]'> {naruto} / 10</span></p>
                      <p class='text-white text-[13px]'>Date aired: <span class='text-[#58c7ff]'>Oct 03, 2002</span></p>
                      <p class='text-white text-[13px]'>Duration: <span class='text-[#58c7ff]'>23 mins</span></p>
                      <p class='text-white text-[13px]'>Status: <span class='text-[#58c7ff]'>Completed</span></p>
                      <p class='text-white text-[13px]'>Genre: <span class='text-[#58c7ff]'>Action, Ninja, Comedy, Martial Arts, Shounen, Superpower</span></p>
                      </div>
                      <div class='fixed flex flex-col w-full items-center bottom-0'>
                      <button onClick={() => togglePopup('Naruto')} class=' w-full h-[30px] bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-[#294258] hover:to-[#4a7b97] hover:text-white rounded-b-[18px] duration-300 ease-in-out font-bold'>Add to my list</button>
                      </div>
                    </div>
                </div>
                <p class='text-white font-semibold text-[20px]'>Naruto</p>
              </div>
              
              <div class='flex items-center flex-col mb-[30px]'>
                <div className="font-nunito border border-black drop-shadow-md rounded-[20px] w-[210px] h-[300px] bg-cover bg-top bg-no-repeat m-2 bg-[url('https://comicvine.gamespot.com/a/uploads/scale_small/11161/111610434/9002817-6125859241-97840.jpg')] flex flex-col justify-end items-center">
                    <div class='fixed h-full  rounded-[18px] opacity-0 hover:opacity-100 bg-black bg-opacity-95 transition-opacity duration-300 text-justify tracking-tighter'>
                        <p class='text-white m-2 text-[12px]'>Monkey D. Luffy, a young man made of rubber after unintentionally eating 
                        a Devil Fruit who sets off on a journey from the East Blue Sea to find the deceased King of the Pirates Gol D. 
                        Roger's ultimate treasure known as the "One Piece", and take over his prior title.</p>
                        <div class='pl-2 pr-2 flex flex-col'>
                        <p class='text-white text-[13px]'>Score: <span class='text-[#58c7ff]'> {onepiece} / 10</span></p>
                        <p class='text-white text-[13px]'>Date aired: <span class='text-[#58c7ff]'>Oct 20, 1999</span></p>
                        <p class='text-white text-[13px]'>Duration: <span class='text-[#58c7ff]'>24 mins</span></p>
                        <p class='text-white text-[13px]'>Status: <span class='text-[#58c7ff]'>Releasing</span></p>
                        <p class='text-white text-[13px]'>Genre: <span class='text-[#58c7ff]'>Pirate, Action, Comedy, Fantasy, Shounen, Superpower</span></p>
                        </div>
                        <div class='fixed flex flex-col w-full items-center bottom-0'>
                        <button onClick={() => togglePopup('One Piece')} class=' w-full h-[30px] bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-[#294258] hover:to-[#4a7b97] hover:text-white rounded-b-[18px] transition duration-300 ease-in-out font-bold'>Add to my list</button>
                        </div>
                    </div>
                </div>
                <p class='text-white font-semibold text-[20px]'>One Piece</p>
              </div>
              
              <div class='flex items-center flex-col mb-[30px]'>
              <div className="font-nunito border border-black drop-shadow-md rounded-[20px] w-[210px] h-[300px] bg-cover bg-top bg-no-repeat m-2 bg-[url('https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781974725984/kaiju-no-8-vol-1-9781974725984_hr.jpg')] flex flex-col justify-end items-center">
                    <div class='fixed h-full  rounded-[18px] opacity-0 hover:opacity-100 bg-black bg-opacity-95 transition-opacity duration-300 text-justify tracking-tighter'>
                      <p class='text-white m-2 text-[12px]'>Kaiju No. 8 follows Kafka Hibino, an employee at a professional cleaning 
                      company that specializes in cleaning up after Kaiju battles. His life takes a dramatic turn when he becomes a hybrid 
                      monster himself, gaining powers that might fulfill his dream of fighting Kaijus.</p>
                      <div class='pl-2 pr-2 flex flex-col'>
                      <p class='text-white text-[13px]'>Score: <span class='text-[#58c7ff]'> {kaiju} / 10</span></p>
                      <p class='text-white text-[13px]'>Date aired: <span class='text-[#58c7ff]'>Apr 12, 2024</span></p>
                      <p class='text-white text-[13px]'>Duration: <span class='text-[#58c7ff]'>23 mins</span></p>
                      <p class='text-white text-[13px]'>Status: <span class='text-[#58c7ff]'>Releasing</span></p>
                      <p class='text-white text-[13px]'>Genre: <span class='text-[#58c7ff]'>Action, Adventure, Military, Sci-Fi, Shounen, Superpower</span></p>
                      </div>
                      <div class='fixed flex flex-col w-full items-center bottom-0'>
                      <button onClick={() => togglePopup('Kaiju No.8')} class=' w-full h-[30px] bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-[#294258] hover:to-[#4a7b97] hover:text-white rounded-b-[18px] transition duration-300 ease-in-out font-bold'>Add to my list</button>
                      </div>
                  </div>
              </div>
              <p class='text-white font-semibold text-[20px]'>Kaiju No.8</p>
              </div>
              
               {/* 2nd row */}
              <div class='flex items-center flex-col mb-[30px]'>
                <div className="border border-black drop-shadow-md rounded-[20px] w-[210px] h-[300px] bg-cover bg-top bg-no-repeat m-2 bg-[url('https://i0.wp.com/doublesama.com/wp-content/uploads/2019/12/Dr.-Stone-cover.jpg?fit=640%2C960&ssl=1')] flex flex-col justify-end items-center">
                    <div class='fixed h-full rounded-[18px] opacity-0 hover:opacity-100 bg-black bg-opacity-95 transition-opacity duration-300 text-justify tracking-tight'>
                      <p class='text-white m-2 text-[14px]'> Awakened into a world where humanity has been petrified, scientific genius 
                      Senku and his brawny friend Taiju use their skills to rebuild civilization.</p>
                      <div class='pl-2 pr-2 flex flex-col'>
                      <p class='text-white text-[13px]'>Score: <span class='text-[#58c7ff]'> {drstone} / 10</span></p>
                      <p class='text-white text-[13px]'>Date aired: <span class='text-[#58c7ff]'>Jul 05, 2019</span></p>
                      <p class='text-white text-[13px]'>Duration: <span class='text-[#58c7ff]'>24 mins</span></p>
                      <p class='text-white text-[13px]'>Status: <span class='text-[#58c7ff]'>Releasing</span></p>
                      <p class='text-white text-[13px]'>Genre: <span class='text-[#58c7ff]'>Action, Adventure, Comedy, Sci-Fi, Shounen</span></p>
                      </div>
                      <div class='fixed flex flex-col w-full items-center bottom-0'>
                      <button onClick={() => togglePopup('Dr. Stone')} class=' w-full h-[30px] bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-[#294258] hover:to-[#4a7b97] hover:text-white rounded-b-[18px] transition duration-300 ease-in-out font-bold'>Add to my list</button>
                      </div>
                    </div>
                </div>
                <p class='text-white font-semibold text-[20px]'>Dr. Stone</p>
              </div>
              
              <div class='flex items-center flex-col mb-[30px]'>
                <div className="border border-black drop-shadow-md rounded-[20px] w-[210px] h-[300px] bg-cover bg-top bg-no-repeat m-2 bg-[url('https://static.tvtropes.org/pmwiki/pub/images/zom_100_bucket_list_of_the_dead_anime_promo.png')] flex flex-col justify-end items-center">
                    <div class='fixed h-full  rounded-[18px] opacity-0 hover:opacity-100 bg-black bg-opacity-95 transition-opacity duration-300 text-justify tracking-tighter'>
                        <p class='text-white m-2 text-[12px]'>Akira Tendo, a 24-year-old office worker of an extremely exploitative marketing 
                        firm, discovers himself trapped in a routine and meaningless life. When a zombie apocalypse unexpectedly strikes Tokyo, 
                        everything is turned upside down.</p>
                        <div class='pl-2 pr-2 flex flex-col'>
                        <p class='text-white text-[13px]'>Score: <span class='text-[#58c7ff]'> {zom100} / 10</span></p>
                        <p class='text-white text-[13px]'>Date aired: <span class='text-[#58c7ff]'>Apr 12, 2024</span></p>
                        <p class='text-white text-[13px]'>Duration: <span class='text-[#58c7ff]'>23 mins</span></p>
                        <p class='text-white text-[13px]'>Status: <span class='text-[#58c7ff]'>Releasing</span></p>
                        <p class='text-white text-[13px]'>Genre: <span class='text-[#58c7ff]'>Action, Comedy, Horror, Seinen, Supernatural, Suspense</span></p>
                        </div>
                        <div class='fixed flex flex-col w-full items-center bottom-0'>
                        <button onClick={() => togglePopup('Bucket List of the Dead')} class=' w-full h-[30px] bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-[#294258] hover:to-[#4a7b97] hover:text-white rounded-b-[18px] transition duration-300 ease-in-out font-bold'>Add to my list</button>
                        </div>
                    </div>
                </div>
                <p class='text-white font-semibold text-[18px] mt-[2px]'>Bucket List of the Dead</p>
              </div>
              
              <div class='flex items-center flex-col mb-[30px]'>
              <div className="border border-black drop-shadow-md rounded-[20px] w-[210px] h-[300px] bg-cover bg-top bg-no-repeat m-2 bg-[url('https://m.media-amazon.com/images/M/MV5BNDkxZGNhZTktMDgyOC00OTlkLTlhYTgtNmE3NDlmYTk5NjQxXkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_FMjpg_UX1000_.jpg')] flex flex-col justify-end items-center">
                    <div class='fixed h-full  rounded-[18px] opacity-0 hover:opacity-100 bg-black bg-opacity-95 transition-opacity duration-300 text-justify tracking-tighter'>
                      <p class='text-white m-2 text-[12px]'>Fuuko Izumi is an 18-year-old girl who is cursed with the ability of Unluck. Anyone 
                      who touches her directly receives an extreme case of bad luck. Fed up, she decides to commit suicide. Before she can, she 
                      meets Undead, a being who cannot die and regenerates from any injury.</p>
                      <div class='pl-2 pr-2 flex flex-col'>
                        <p class='text-white text-[13px]'>Score: <span class='text-[#58c7ff]'> {undead} / 10</span></p>
                        <p class='text-white text-[13px]'>Date aired: <span class='text-[#58c7ff]'>Oct 07, 2023</span></p>
                        <p class='text-white text-[13px]'>Duration: <span class='text-[#58c7ff]'>23 mins</span></p>
                        <p class='text-white text-[13px]'>Status: <span class='text-[#58c7ff]'>Releasing</span></p>
                        <p class='text-white text-[13px]'>Genre: <span class='text-[#58c7ff]'>Action, Comedy, Martial Arts, Sci-Fi, Superpower, Supernatural</span></p>
                        </div>
                      <div class='fixed flex flex-col w-full items-center bottom-0'>
                      <button onClick={() => togglePopup('Undead Unluck')} class=' w-full h-[30px] bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-[#294258] hover:to-[#4a7b97] hover:text-white rounded-b-[18px] transition duration-300 ease-in-out font-bold'>Add to my list</button>
                      </div>
                  </div>
              </div>
              <p class='text-white font-semibold text-[20px]'>Undead Unluck</p>
              </div>


               {/* 3rd row */}
               <div class='flex items-center flex-col mb-[30px]'>
                <div className="border border-black drop-shadow-md rounded-[20px] w-[210px] h-[300px] bg-cover bg-top bg-no-repeat m-2 bg-[url('https://media.licdn.com/dms/image/D4D12AQFyeZ5ZbqcVRA/article-cover_image-shrink_600_2000/0/1694350997470?e=2147483647&v=beta&t=hn19jHSaENiNjDLWrC5YXgWQQQ6Lhr4S19nzPPKtfvU')] flex flex-col justify-end items-center">
                    <div class='fixed h-full  rounded-[18px] opacity-0 hover:opacity-100 bg-black bg-opacity-95 transition-opacity duration-300 text-justify tracking-tighter'>
                      <p class='text-white m-2 text-[12px]'>In a world of gifted hunters and monsters, a weak hunter Sung Jinwoo gains extraordinary 
                      powers through a mysterious program, leading him to become one of the strongest hunters and conquering even the strongest dungeons.</p>
                      <div class='pl-2 pr-2 flex flex-col'>
                        <p class='text-white text-[13px]'>Score: <span class='text-[#58c7ff]'> {solo} / 10</span></p>
                        <p class='text-white text-[13px]'>Date aired: <span class='text-[#58c7ff]'>Jan 07, 2024</span></p>
                        <p class='text-white text-[13px]'>Duration: <span class='text-[#58c7ff]'>23 mins</span></p>
                        <p class='text-white text-[13px]'>Status: <span class='text-[#58c7ff]'>Completed</span></p>
                        <p class='text-white text-[13px]'>Genre: <span class='text-[#58c7ff]'>Action, Adventure, Fantasy, Shounen, Super Power, Isekai, Magic</span></p>
                        </div>
                      <div class='fixed flex flex-col w-full items-center bottom-0'>
                      <button onClick={() => togglePopup('Solo Leveling')} class=' w-full h-[30px] bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-[#294258] hover:to-[#4a7b97] hover:text-white rounded-b-[18px] transition duration-300 ease-in-out font-bold'>Add to my list</button>
                      </div>
                    </div>
                </div>
                <p class='text-white font-semibold text-[20px]'>Solo Leveling</p>
              </div>
              
              <div class='flex items-center flex-col mb-[30px]'>
                <div className="border border-black drop-shadow-md rounded-[20px] w-[210px] h-[300px] bg-cover bg-top bg-no-repeat m-2 bg-[url('https://anibrain.ai/_next/image?url=https%3A%2F%2Fs4.anilist.co%2Ffile%2Fanilistcdn%2Fmedia%2Fanime%2Fcover%2Flarge%2Fbx154587-n1fmjRv4JQUd.jpg&w=3840&q=90')] flex flex-col justify-end items-center">
                    <div class='fixed h-full  rounded-[18px] opacity-0 hover:opacity-100 bg-black bg-opacity-95 transition-opacity duration-300 text-justify tracking-tighter'>
                        <p class='text-white m-2 text-[12px]'>The story follows Frieren, an elven mage, as she embarks on a journey to reach the resting 
                        place of souls in order to reunite with her former comrade Himmel, whose Hero Party once slew the Demon King. By March 2024, the 
                        manga had over 20 million copies in circulation.</p>
                        <div class='pl-2 pr-2 flex flex-col'>
                        <p class='text-white text-[13px]'>Score: <span class='text-[#58c7ff]'> {frieren} / 10</span></p>
                        <p class='text-white text-[13px]'>Date aired: <span class='text-[#58c7ff]'>Sep 29, 2023</span></p>
                        <p class='text-white text-[13px]'>Duration: <span class='text-[#58c7ff]'>24 mins</span></p>
                        <p class='text-white text-[13px]'>Status: <span class='text-[#58c7ff]'>Completed</span></p>
                        <p class='text-white text-[13px]'>Genre: <span class='text-[#58c7ff]'>Adventure, Drama, Fantasy, Shounen, Iyashikei, Demons, Magic</span></p>
                        </div>
                        <div class='fixed flex flex-col w-full items-center bottom-0'>
                        <button onClick={() => togglePopup("Frieren: Beyond Journey's End")} class=' w-full h-[30px] bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-[#294258] hover:to-[#4a7b97] hover:text-white rounded-b-[18px] transition duration-300 ease-in-out font-bold'>Add to my list</button>
                        </div>
                    </div>
                </div>
                <p class='text-white font-semibold text-[16px] mt-[5px]'>Frieren: Beyond Journey's End</p>
              </div>
              
              <div class='flex items-center flex-col mb-[30px]'>
              <div className="border border-black drop-shadow-md rounded-[20px] w-[210px] h-[300px] bg-cover bg-top bg-no-repeat m-2 bg-[url('https://cdn.kobo.com/book-images/745c077a-4660-4f77-aa81-c4d438be7102/353/569/90/False/my-hero-academia-vol-26.jpg')] flex flex-col justify-end items-center">
                    <div class='fixed h-full  rounded-[18px] opacity-0 hover:opacity-100 bg-black bg-opacity-95 transition-opacity duration-300 text-justify tracking-tighter'>
                      <p class='text-white m-2 text-[12px]'>In a world where most people have superpowers, middle school student Izuku Midoriya is part 
                      of 20 percent of the population born without them. But his dream is to become a superhero and to attend the premier Japanese school 
                      for aspiring superheroes, UA High.</p>
                      <div class='pl-2 pr-2 flex flex-col'>
                        <p class='text-white text-[13px]'>Score: <span class='text-[#58c7ff]'> {mha} / 10</span></p>
                        <p class='text-white text-[13px]'>Date aired: <span class='text-[#58c7ff]'>Apr 03, 2016</span></p>
                        <p class='text-white text-[13px]'>Duration: <span class='text-[#58c7ff]'>24 mins</span></p>
                        <p class='text-white text-[13px]'>Status: <span class='text-[#58c7ff]'>Completed</span></p>
                        <p class='text-white text-[13px]'>Genre: <span class='text-[#58c7ff]'>Action, Adventure, Comedy, School, Shounen, Superpower</span></p>
                        </div>
                      <div class='fixed flex flex-col w-full items-center bottom-0'>
                      <button onClick={() => togglePopup('My Hero Academia')} class=' w-full h-[30px] bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-[#294258] hover:to-[#4a7b97] hover:text-white rounded-b-[18px] transition duration-300 ease-in-out font-bold'>Add to my list</button>
                      </div>
                  </div>
              </div>
              <p class='text-white font-semibold text-[20px]'>My Hero Academia</p>
              </div>


              {/* 4th row */}
              <div class='flex items-center flex-col mb-[30px]'>
                <div className="border border-black drop-shadow-md rounded-[20px] w-[210px] h-[300px] bg-cover bg-top bg-no-repeat m-2 bg-[url('https://preview.redd.it/bkhi3um6xzp51.png?width=640&crop=smart&auto=webp&s=f167cb689e47f90b2ca2fb0068888b4e2d790ab8')] flex flex-col justify-end items-center">
                    <div class='fixed h-full  rounded-[18px] opacity-0 hover:opacity-100 bg-black bg-opacity-95 transition-opacity duration-300 text-justify tracking-tighter'>
                      <p class='text-white m-2 mb-0 text-[12px]'>A child Thorfinn witnesses the Viking commander Askeladd kill his father, 
                      who was an exceptional but retired warrior. Years later, Thorfinnn has grown in to a formidably deadly knife-wielding teenager and serves 
                      Askeladd by taking on his most dangerous and violent tasks.</p>
                      <div class='pl-2 pr-2 flex flex-col pt-1'>
                        <p class='text-white text-[12px]'>Score: <span class='text-[#58c7ff]'> {vinland} / 10</span></p>
                        <p class='text-white text-[12px]'>Date aired: <span class='text-[#58c7ff]'>Jul 08, 2019</span></p>
                        <p class='text-white text-[12px]'>Duration: <span class='text-[#58c7ff]'>24 mins</span></p>
                        <p class='text-white text-[12px]'>Status: <span class='text-[#58c7ff]'>Completed</span></p>
                        <p class='text-white text-[12px]'>Genre: <span class='text-[#58c7ff]'> Action, Adventure, Drama, Military, Seinen</span></p>
                        </div>
                      <div class='fixed flex flex-col w-full items-center bottom-0'>
                      <button onClick={() => togglePopup('Vinland Saga')} class=' w-full h-[30px] bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-[#294258] hover:to-[#4a7b97] hover:text-white rounded-b-[18px] transition duration-300 ease-in-out font-bold'>Add to my list</button>
                      </div>
                    </div>
                </div>
                <p class='text-white font-semibold text-[20px]'>Vinland Saga</p>
              </div>
              
              <div class='flex items-center flex-col mb-[30px]'>
                <div className="border border-black drop-shadow-md rounded-[20px] w-[210px] h-[300px] bg-cover bg-top bg-no-repeat m-2 bg-[url('https://m.media-amazon.com/images/M/MV5BNGM0YTk3MWEtN2JlZC00ZmZmLWIwMDktZTMxZGE5Zjc2MGExXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg')] flex flex-col justify-end items-center">
                    <div class='fixed h-full  rounded-[18px] opacity-0 hover:opacity-100 bg-black bg-opacity-95 transition-opacity duration-300 text-justify tracking-tighter'>
                        <p class='text-white m-2 text-[13px]'>Gon Freecss aspires to become a Hunter, an exceptional being capable of greatness. With his friends
                         and his potential, he seeks out his father, who left him when he was younger.</p>
                        <div class='pl-2 pr-2 flex flex-col pt-2'>
                        <p class='text-white text-[13px]'>Score: <span class='text-[#58c7ff]'> {hunter} / 10</span></p>
                        <p class='text-white text-[13px]'>Date aired: <span class='text-[#58c7ff]'>Oct 16, 1999</span></p>
                        <p class='text-white text-[13px]'>Duration: <span class='text-[#58c7ff]'>24 mins</span></p>
                        <p class='text-white text-[13px]'>Status: <span class='text-[#58c7ff]'>Completed</span></p>
                        <p class='text-white text-[13px]'>Genre: <span class='text-[#58c7ff]'>Action, Adventure, Fantasy, Shounen, Superpower</span></p>
                        </div>
                        <div class='fixed flex flex-col w-full items-center bottom-0'>
                        <button onClick={() => togglePopup("Hunter x Hunter")} class=' w-full h-[30px] bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-[#294258] hover:to-[#4a7b97] hover:text-white rounded-b-[18px] transition duration-300 ease-in-out font-bold'>Add to my list</button>
                        </div>
                    </div>
                </div>
                <p class='text-white font-semibold text-[20px]'>Hunter x Hunter</p>
              </div>
              
              <div class='flex items-center flex-col mb-[30px]'>
              <div className="border border-black drop-shadow-md rounded-[20px] w-[210px] h-[300px] bg-cover bg-top bg-no-repeat m-2 bg-[url('https://cdn.kobo.com/book-images/92e8c5b0-74dd-489f-afd2-eefe8a9d6847/1200/1200/False/one-punch-man-vol-1.jpg')] flex flex-col justify-end items-center">
                    <div class='fixed h-full  rounded-[18px] opacity-0 hover:opacity-100 bg-black bg-opacity-95 transition-opacity duration-300 text-justify tracking-tighter'>
                      <p class='text-white m-2 text-[13px]'>Saitama, a superhero who, because he can defeat any opponent with a single punch, grows bored from
                       a lack of challenge. ONE wrote the original webcomic manga version in early 2009.</p>
                      <div class='pl-2 pr-2 flex flex-col'>
                        <p class='text-white text-[13px]'>Score: <span class='text-[#58c7ff]'> {opm} / 10</span></p>
                        <p class='text-white text-[13px]'>Date aired: <span class='text-[#58c7ff]'>Oct 05, 2015</span></p>
                        <p class='text-white text-[13px]'>Duration: <span class='text-[#58c7ff]'>24 mins</span></p>
                        <p class='text-white text-[13px]'>Status: <span class='text-[#58c7ff]'>Completed</span></p>
                        <p class='text-white text-[13px]'>Genre: <span class='text-[#58c7ff]'>Action, Comedy, Martial Arts, Sci-Fi, Superpower, Supernatural</span></p>
                        </div>
                      <div class='fixed flex flex-col w-full items-center bottom-0'>
                      <button onClick={() => togglePopup('One Punch Man')} class=' w-full h-[30px] bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-[#294258] hover:to-[#4a7b97] hover:text-white rounded-b-[18px] transition duration-300 ease-in-out font-bold'>Add to my list</button>
                      </div>
                  </div>
              </div>
              <p class='text-white font-semibold text-[20px]'>One Punch Man</p>
              </div>

              {/* 5th row */}
              <div class='flex items-center flex-col mb-[30px]'>
                <div className="border border-black drop-shadow-md rounded-[20px] w-[210px] h-[300px] bg-cover bg-top bg-no-repeat m-2 bg-[url('https://i.redd.it/5kn9hnxbfrq71.jpg')] flex flex-col justify-end items-center">
                    <div class='fixed h-full  rounded-[18px] opacity-0 hover:opacity-100 bg-black bg-opacity-95 transition-opacity duration-300 text-justify tracking-tighter'>
                      <p class='text-white m-2 mb-0 text-[13px]'>The story of Yuji Itadori, an easygoing high school student who joins the occult club at school. 
                      When they accidentally summon grotesque creatures by messing with a cursed object, Itadori fights to save his friends' lives.</p>
                      <div class='pl-2 pr-2 flex flex-col pt-1'>
                        <p class='text-white text-[13px]'>Score: <span class='text-[#58c7ff]'> {jjk} / 10</span></p>
                        <p class='text-white text-[13px]'>Date aired: <span class='text-[#58c7ff]'>Oct 03, 2020</span></p>
                        <p class='text-white text-[13px]'>Duration: <span class='text-[#58c7ff]'>23 mins</span></p>
                        <p class='text-white text-[13px]'>Status: <span class='text-[#58c7ff]'>Completed</span></p>
                        <p class='text-white text-[13px]'>Genre: <span class='text-[#58c7ff]'> Martial Arts, School, Shounen, Superpower, Supernatural, Magic</span></p>
                        </div>
                      <div class='fixed flex flex-col w-full items-center bottom-0'>
                      <button onClick={() => togglePopup('Jujutsu Kaisen')} class=' w-full h-[30px] bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-[#294258] hover:to-[#4a7b97] hover:text-white rounded-b-[18px] transition duration-300 ease-in-out font-bold'>Add to my list</button>
                      </div>
                    </div>
                </div>
                <p class='text-white font-semibold text-[20px]'>Jujutsu Kaisen</p>
              </div>
              
              <div class='flex items-center flex-col mb-[30px]'>
                <div className="border border-black drop-shadow-md rounded-[20px] w-[210px] h-[300px] bg-cover bg-top bg-no-repeat m-2 bg-[url('https://m.media-amazon.com/images/I/712sDu2sccL._AC_SL1500_.jpg')] flex flex-col justify-end items-center">
                    <div class='fixed h-full  rounded-[18px] opacity-0 hover:opacity-100 bg-black bg-opacity-95 transition-opacity duration-300 text-justify tracking-tighter'>
                        <p class='text-white m-2 text-[13px]'>A family is attacked by demons and only two members survive - Tanjiro and his sister Nezuko, who is 
                        turning into a demon slowly. Tanjiro sets out to become a demon slayer to avenge his family and cure his sister.</p>
                        <div class='pl-2 pr-2 flex flex-col pt-2'>
                        <p class='text-white text-[13px]'>Score: <span class='text-[#58c7ff]'> {demon} / 10</span></p>
                        <p class='text-white text-[13px]'>Date aired: <span class='text-[#58c7ff]'>Apr 06, 2019</span></p>
                        <p class='text-white text-[13px]'>Duration: <span class='text-[#58c7ff]'>23 mins</span></p>
                        <p class='text-white text-[13px]'>Status: <span class='text-[#58c7ff]'>Completed</span></p>
                        <p class='text-white text-[13px]'>Genre: <span class='text-[#58c7ff]'>Action, Adventure, Fantasy, Demons, Shounen, Superpower</span></p>
                        </div>
                        <div class='fixed flex flex-col w-full items-center bottom-0'>
                        <button onClick={() => togglePopup("Demon Slayer")} class=' w-full h-[30px] bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-[#294258] hover:to-[#4a7b97] hover:text-white rounded-b-[18px] transition duration-300 ease-in-out font-bold'>Add to my list</button>
                        </div>
                    </div>
                </div>
                <p class='text-white font-semibold text-[20px]'>Demon Slayer</p>
              </div>
              
              <div class='flex items-center flex-col mb-[30px]'>
              <div className="border border-black drop-shadow-md rounded-[20px] w-[210px] h-[300px] bg-cover bg-top bg-no-repeat m-2 bg-[url('https://upload.wikimedia.org/wikipedia/en/7/72/Bleachanime.png')] flex flex-col justify-end items-center">
                    <div class='fixed h-full  rounded-[18px] opacity-0 hover:opacity-100 bg-black bg-opacity-95 transition-opacity duration-300 text-justify tracking-tighter'>
                      <p class='text-white m-2 text-[13px]'>It follows the adventures of a teenager Ichigo Kurosaki, who obtains the powers of a Soul Reaper a death 
                      personification similar to a Grim Reaper from another Soul Reaper, Rukia Kuchiki.</p>
                      <div class='pl-2 pr-2 flex flex-col'>
                        <p class='text-white text-[13px]'>Score: <span class='text-[#58c7ff]'> {bleach} / 10</span></p>
                        <p class='text-white text-[13px]'>Date aired: <span class='text-[#58c7ff]'>Oct 05, 2004</span></p>
                        <p class='text-white text-[13px]'>Duration: <span class='text-[#58c7ff]'>24 mins</span></p>
                        <p class='text-white text-[13px]'>Status: <span class='text-[#58c7ff]'>Completed</span></p>
                        <p class='text-white text-[13px]'>Genre: <span class='text-[#58c7ff]'>Adventure, Fantasy, Demons, Shounen, Superpower</span></p>
                        </div>
                      <div class='fixed flex flex-col w-full items-center bottom-0'>
                      <button onClick={() => togglePopup('Bleach')} class=' w-full h-[30px] bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-[#294258] hover:to-[#4a7b97] hover:text-white rounded-b-[18px] transition duration-300 ease-in-out font-bold'>Add to my list</button>
                      </div>
                  </div>
              </div>
              <p class='text-white font-semibold text-[20px]'>Bleach</p>
              </div>


              
             {/* insert 3 anim */}
            </div>
            


           
          </div>

          
          

        <div className='rounded-[20px] w-[370px] h-[110vh] bg-[#252e3a] flex flex-col items-center space-y-[13px] font-bebas'>
            <div class='w-full h-[70px] justify-center flex items-center'>
              <p class='bg-clip-text text-transparent bg-gradient-to-r from-[#56a8ff] via-[#00aefe] to-[#00e7fc] font-bold text-[35px] mt-2 font-bebas'>Top Anime</p>

              {/* remove me */}
              <div class="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ..."></div>
            </div>
            <div class='hover:scale-105 transition-transform duration-200 transform flex flex-row text-white text-[30px] items-center space-x-2 bg-[#333b4a] w-full rounded-[10px] border-[#56c7ff] border-r-[4px]'>
              <div class='w-[30px] h-[50px] items-center justify-center flex p-[20px]'>
              <p class='text-[#56c7ff]'>1</p>
              </div>
              <div class='w-[80px] h-full'>
                <img alt='anime' class='rounded-[3px]' src={"https://comicvine.gamespot.com/a/uploads/scale_small/11161/111610434/9002817-6125859241-97840.jpg"}></img>
              </div>
              <div class=' items-center justify-center flex'>
              <Link to='https://aniwave.to/watch/one-piece.ov8/ep-1101' target='_blank'>ONE PIECE</Link>
              </div>
            </div>

            <div class='hover:scale-105 transition-transform duration-200 transform flex flex-row text-white text-[30px] items-center space-x-2 bg-[#333b4a] w-full rounded-[10px] border-[#ff5656] border-r-[4px]'>
              <div class='w-[30px] h-[50px] items-center justify-center flex p-[20px]'>
              <p class='text-[#ff5656]'>2</p>
              </div>
              <div class='w-[80px] h-full'>
                <img alt='anime' class='rounded-[3px]' src={"https://i.redd.it/5kn9hnxbfrq71.jpg"}></img>
              </div>
              <div class=' items-center justify-center flex'>
              <Link to='https://aniwave.to/watch/jujutsu-kaisen.32n8/ep-1' target='_blank' class='text-[28px]'>Jujutsu Kaisen</Link>
              </div>
            </div>

            <div class='hover:scale-105 transition-transform duration-200 transform flex flex-row text-white text-[30px] items-center space-x-2 bg-[#333b4a] w-full rounded-[10px] border-[#ebff56] border-r-[4px]'>
              <div class='w-[30px] h-[50px] items-center justify-center flex p-[20px]'>
              <p class='text-[#ebff56]'>3</p>
              </div>
              <div class='w-[80px] h-full'>
                <img alt='anime' class='rounded-[3px]' src={"https://cdn.kobo.com/book-images/92e8c5b0-74dd-489f-afd2-eefe8a9d6847/1200/1200/False/one-punch-man-vol-1.jpg"}></img>
              </div>
              <div class=' items-center justify-center flex'>
              <Link to='https://aniwave.to/watch/one-punch-man.928/ep-1' target='_blank'>One Punch Man</Link>
              </div>
            </div>

            <div class='hover:scale-105 transition-transform duration-200 transform flex flex-row text-white text-[30px] items-center space-x-2 bg-[#333b4a] w-full rounded-[10px]'>
              <div class='w-[30px] h-[50px] items-center justify-center flex p-[20px]'>
              <p>4</p>
              </div>
              <div class='w-[80px] h-full'>
                <img alt='anime' class='rounded-[3px]' src={"https://i0.wp.com/doublesama.com/wp-content/uploads/2019/12/Dr.-Stone-cover.jpg?fit=640%2C960&ssl=1"}></img>
              </div>
              <div class=' items-center justify-center flex'>
              <Link to='https://aniwave.to/watch/dr-stone.lo6q/ep-1' target='_blank'>Dr. Stone</Link>
              </div>
            </div>

            <div class='hover:scale-105 transition-transform duration-200 transform flex flex-row text-white text-[30px] items-center space-x-2 bg-[#333b4a] w-full rounded-[10px]'>
              <div className='w-[30px] h-[50px] items-center justify-center flex p-[20px]'>
              <p>5</p>
              </div>
              <div class='w-[80px] h-full'>
                <img alt='anime' class='rounded-[3px]' src={"https://preview.redd.it/bkhi3um6xzp51.png?width=640&crop=smart&auto=webp&s=f167cb689e47f90b2ca2fb0068888b4e2d790ab8"}></img>
              </div>
              <div class=' items-center justify-center flex'>
              <Link to='https://aniwave.to/watch/vinland-saga.77zy/ep-1' target='_blank'>Vinland Saga</Link>
              </div>
            </div>
        </div>
      </div>
      {showAnime && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75 z-10 font-mono">
          <div className="bg-[#242424] rounded-[20px] w-[470px] h-[650px] font-bold flex flex-col justify-center items-center border border-[#45dee3] shadow-md shadow-[#355862]">
          <div class="flex space-x-2 self-start pb-2 pt-2 w-full justify-center">
            <div class="w-[70px] h-3 rounded-full bg-[#171717] drop-shadow-md"></div>
          </div>
           <div className="bg-[#121416] p-4 rounded-[20px] flex flex-col w-[450px] h-[600px] font-bold justify-center">
           
              <div class='w-full flex justify-center'>
            <h2 className="text-[30px] text-[#49cbff] font-bold mb-4">ADD ANIME</h2>
            </div>
            <p className="mb-4 text-[25px] text-[#49cbff]">Title:<span class='text-[#49cbff]'>"{anime}"</span></p>

            <div className='flex flex-col'>

              
            
            <text className='mr-2 text-[#49cbff] text-[20px]'>Status:</text>
            <div class='mb-[10px] flex flex-row'>
              <select class='rounded-[5px] p-1 w-[150px] text-center' value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option class='font-bold'>-</option>
                  <option class='font-bold'>Watching</option>
                  <option class='font-bold'>Completed</option>
                  <option class='font-bold'>Plan to Watch</option>
              </select>
            </div>

            <div className='flex flex-col'>
              <text className='mr-2 text-[#49cbff] text-[20px]'>Episodes Watched:</text>
              <input
                type="number"
                placeholder=""
                value={epWatch}
                onChange={(e) => setepWatch(Math.max(0, parseInt(e.target.value)))}
                className="w-[150px] h-[35px] mb-4 p-2 border border-gray-300 rounded text-center"
              />
            </div>

             <text className='mr-2 text-[#49cbff] text-[20px]'>Score:</text>
             <div class='mb-[10px]'>
              <select class='rounded-[5px] p-1 w-[150px] text-center' value={score} onChange={(e) => setScore(e.target.value)}>
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

            <div class='flex flex-col'>
              <text class='mr-2 text-[#49cbff] text-[20px]'>Start Date:</text>
              <input
                type="date"
                placeholder=""
                value={start}
                onChange={(e) => setStart(e.target.value)}
                className="w-[150px] h-[35px] mb-4 p-2 border border-gray-300 rounded"
              />
             </div>

             <div class='flex flex-col'>
              <text class='mr-2 text-[#49cbff] text-[20px]'>Finish Date:</text>
              <input
                type="date"
                placeholder=""
                value={finish}
                onChange={(e) => setFinish(e.target.value)}
                className="w-[150px] h-[35px] mb-4 p-2 border border-gray-300 rounded"
              />
             </div>

            </div>
         
            
            
            
           </div>
           <div className="flex justify-center w-full font-mono p-2">
              <button onClick={addAnime} className="bg-gradient-to-r w-[100px] from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-black py-2 px-4 rounded hover:bg-[#4eb8c0] mr-2 drop-shadow-md">
                Add
              </button>
              <button onClick={() => setShowAnime(false)} className="w-[100px] bg-gray-300 text-blackpy-2 px-4 rounded hover:bg-gray-400 drop-shadow-md">
                Cancel
              </button>
            </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;

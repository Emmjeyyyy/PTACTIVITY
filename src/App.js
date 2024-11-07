import './App.css';
import Loginpage from './pages/loginpage';
import Homepage from './pages/homepage';
import HeaderPage from './pages/header';
import Mylistpage from './pages/mylistpage'
import Signuppage from './pages/signuppage';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div class="bg-[#13161e] ">
      <Routes>
        <Route path='/homepage' element = {<><HeaderPage/><Homepage/></>}/>
        <Route path='/mylist' element = {<><HeaderPage/><Mylistpage/></>}/>
        <Route path='/signup' element = {<><Signuppage/></>}/>
        <Route path='/' element = {<><Loginpage/></>}/>
      </Routes>
    </div>
  );
}

export default App;

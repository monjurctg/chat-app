import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Register from './Pages/Register';
import Login from './Pages/Login';
import Chat from './Pages/Chat';
import SetAvatar from './Pages/SetAvatar';
import VideoChat from './Pages/VideoChat';
import Test from './Pages/Test';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route  path='/register' element={<Register/>}/>
      <Route  path='/login' element={<Login/>}/>
      <Route  path='/' element={<Chat/>}/>
      {/* <Route  path='/' element={<Test/>}/> */}


      <Route  path='/setAvatar' element={<SetAvatar/>}/>
      <Route  path='/video' element={<VideoChat/>}/>

    </Routes>
    </BrowserRouter>
     
    </>
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Homepage from './components/Homepage';
import ViewGamePost from './components/ViewGamePost';
import NewGamePostForm from './components/NewGamePost';
import UpdateGamePost from './components/UpdateGamePost';
import EditProfileForm from './components/EditProfile';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<LoginForm/>} path="/Gamepartyfinder" default/>
          <Route element={<Homepage/>} path="/Gamepartyfinder/home"/>
          <Route element={<ViewGamePost/>} path="/Gamepartyfinder/home/gamepost/:id"/>
          <Route element={<NewGamePostForm/>} path="/Gamepartyfinder/home/gamepost/new"/>
          <Route element={<UpdateGamePost/>} path="/Gamepartyfinder/home/gamepost/:id/update"/>
          <Route element={<EditProfileForm/>} path="/Gamepartyfinder/home/user/:id"/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
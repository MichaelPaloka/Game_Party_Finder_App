import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Welcome from './components/Welcome';
import Homepage from './components/Homepage';
import ViewGamePost from './components/ViewGamePost';
import NewGamePostForm from './components/NewGamePost';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<LoginForm/>} path="/Gamepartyfinder" default/>
          <Route element={<Welcome/>} path="/user/welcome"/>
          <Route element={<Homepage/>} path="/Gamepartyfinder/home"/>
          <Route element={<ViewGamePost/>} path="/Gamepartyfinder/home/gamepost/:id"/>
          <Route element={<NewGamePostForm/>} path="/Gamepartyfinder/home/gamepost/new"/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
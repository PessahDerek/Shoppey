import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Aos from 'aos';
import 'aos/dist/aos.css'
import WritePage from './Pages/WritePage';
import AllListsPage from './Pages/AllListsPage'
import ShopPage from './Pages/ShopPage';
import ProfilePage from './Pages/ProfilePage';
import AuthPage from './Pages/AuthPage';

function App() {

  useEffect(()=>{
    Aos.init();
  })

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/write' element={<WritePage />} />
        <Route path='/lists' element={<AllListsPage /> } />
        <Route path='/shop' element={<ShopPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/auth' element={<AuthPage />} />
      </Routes>
    </div>
  );
}

export default App;

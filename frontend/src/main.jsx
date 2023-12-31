import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import './index.css';
import UpsertMeme from './pages/UpsertMeme.jsx';
import Login from './pages/Login.jsx';
import AuthProvider from './components/AuthProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/:id' element={<UpsertMeme />} />
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);

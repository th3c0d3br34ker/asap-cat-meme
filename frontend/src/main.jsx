import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './index.css';

import AuthProvider from './providers/AuthProvider.jsx';
import Layout from './container/Layout.jsx';

import Home from './pages/Home.jsx';
import UpsertMeme from './pages/UpsertMeme.jsx';
import Login from './pages/Login.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/:id' element={<UpsertMeme />} />
            <Route path='/login' element={<Login />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);

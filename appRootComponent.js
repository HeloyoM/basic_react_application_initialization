export const appRootContent =`import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Typography } from '@mui/material';
import Home from './pages/Home';
import Header from './components/Header';
import './App.css';

const App: React.FC = () => {
  return (
        <Router>
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

        </Router>
  )
}

export default App;

export const NotFound: React.FC = () => {
  return (
    <Typography variant="h3" align="center" gutterBottom>
      Not found
    </Typography>
  )
}`
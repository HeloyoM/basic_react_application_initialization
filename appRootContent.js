export const appRootContent = (auth) => (`import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Typography } from '@mui/material';
import Home from './pages/Home';
import Header from './components/Header';
import ScreenWrapper from './components/ScreenWrapper';
${auth && `import AppUserContext from './context/AppUserContext';`}
import AppServerMsgContext from "./context/AppServerMsg";
import './App.css';

const App: React.FC = () => {
  ${auth && `const [crrUser, setUser] = React.useState<any>(null);`}
  const [serverMsg, setServerMsg] = React.useState('');

  ${auth && `const updateUserContext = (user: any) => { setUser(user) }`}
  const updateServerMsgContext = (msg: any) => { setServerMsg(msg) }

  return (
  <AppServerMsgContext.Provider value={{ updateServerMsgContext, serverMsg }}>
  ${auth && `<AppUserContext.Provider value={{ updateUserContext, user: crrUser }}>`}
      <Router>

         <ScreenWrapper><Header /></ScreenWrapper>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

      </Router>
      ${auth && `</AppUserContext.Provider>`}
  </AppServerMsgContext.Provider>
  )
}

export default App;

export const NotFound: React.FC = () => {
  return (
    <Typography variant="h3" align="center" gutterBottom>
      Not found
    </Typography>
  )
}`)
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from './shared/enums/routes';
import Sidebar from './global/components/sidebar/Sidebar';
import styles from './App.module.css';
import TopBar from './global/components/topbar/Topbar';
import MainPage from './pages/main/MainPage';
import InstructionsPage from './pages/instruction/InstructionsPage';
import { Box } from '@mui/material';
import { TOP_NAVBAR_WIDTH } from './global/constants/content';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <div className={styles.root}>
      <BrowserRouter>
        <TopBar />
        <Sidebar />
        <Box
          className={styles.contentContainer}
          component="main"
          sx={{ flexGrow: 1, flex: 1, mt: `${TOP_NAVBAR_WIDTH}px` }}
        >
          <Routes>
            <Route path={ROUTES.DEFAULT} element={<Navigate replace to={ROUTES.HOME} />} />
            <Route path={ROUTES.HOME} element={<MainPage />} />
            <Route path={ROUTES.INSTRUCTION} element={<InstructionsPage />} />
            <Route path={ROUTES.ANY} element={<Navigate replace to={ROUTES.HOME} />} />
          </Routes>
        </Box>
      </BrowserRouter>
      <ToastContainer
        autoClose={4000}
        hideProgressBar
        draggable
        theme={'colored'}
        draggableDirection={'y'}
        draggablePercent={60}
        pauseOnHover={false}
      />
    </div>
  );
};

export default App;

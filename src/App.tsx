import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from './shared/enums/routes';
import Sidebar from './global/components/sidebar/Sidebar';
import styles from './App.module.css';
import TopBar from './global/components/topbar/Topbar';
import MainPage from './pages/main/MainPage';
import InstructionsPage from './pages/instruction/InstructionsPage';

const App: React.FC = () => {
  return (
    <div className={styles.root}>
      <BrowserRouter>
        <TopBar />
        <Sidebar />
        <Routes>
          <Route path={ROUTES.DEFAULT} element={<Navigate replace to={ROUTES.HOME} />} />
          <Route path={ROUTES.HOME} element={<MainPage />} />
          <Route path={ROUTES.INSTRUCTION} element={<InstructionsPage />} />
          <Route path={ROUTES.ANY} element={<Navigate replace to={ROUTES.HOME} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

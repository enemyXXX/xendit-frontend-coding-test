import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from './shared/enums/routes';

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.DEFAULT} element={<Navigate replace to={ROUTES.HOME} />} />
          <Route path={ROUTES.HOME} element={<>123</>} />
          <Route path={ROUTES.ANY} element={<Navigate replace to={ROUTES.HOME} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

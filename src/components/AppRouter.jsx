import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import About from '../pages/About';
import PostIdPage from '../pages/PostIdPage';
import Posts from '../pages/Posts';
import { routes } from '../router';

const AppRouter = () => {
  return (
    <Routes>
      {routes.map((route) => {
        <Route path={route.path} element={route.element} exact={route.exact} />;
      })}
    </Routes>
  );
};

export default AppRouter;

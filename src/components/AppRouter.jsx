import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import About from '../pages/About';
import PostIdPage from '../pages/PostIdPage';
import Posts from '../pages/Posts';
import { routes } from '../router';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/about" element={<About />} exact={true} />;
      <Route path="/posts" element={<Posts />} exact={true} />;
      <Route path="/posts/:id" element={<PostIdPage />} exact={true} />;
    </Routes>
  );
};

export default AppRouter;

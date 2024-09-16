// src/App.js
import React from 'react';
import { BrowserRouter as Router, RouterProvider } from 'react-router-dom';
import router from './routes/AppRoutes';


const App = () => {

  return (
      <RouterProvider router={router} />
  );
};

export default App;

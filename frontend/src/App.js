import React from 'react';
import './globalStyles.css'
import { AppRoutes } from './routes/Routes';
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;

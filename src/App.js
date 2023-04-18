import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PdfToText from './Pages/PdfToText'

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path='/' element={<PdfToText />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

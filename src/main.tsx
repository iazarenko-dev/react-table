import './global.css'
import "react-datepicker/dist/react-datepicker.css";

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { DataTable } from './pages/motor-carrier-safety-info-page/motor-carrier-safety-info-page.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={ <DataTable /> } />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Header from "./components/components.header.jsx";
import Grid from "./components/components.grid.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Header/>
      <Grid/>
  </React.StrictMode>,
)

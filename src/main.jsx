import React from 'react'
import ReactDOM from 'react-dom/client'
import Grid from "./components/components.grid.jsx";
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/components.header.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode >
      <div className="dark" data-bs-theme="dark">
      <Header/>
      <Grid/>
      </div>
  </React.StrictMode>,
)

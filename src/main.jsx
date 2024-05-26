import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/components.header.jsx";
import Grid from "./components/components.grid.jsx";
import store from './store'
import { Provider } from 'react-redux'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
          <Header/>
          <Grid/>
      </Provider>
  </React.StrictMode>,
)

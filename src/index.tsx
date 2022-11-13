import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import App from './App'
import GlobalProvider from './context/GlobalProvider'

const baseurl = process.env.REACT_APP_BASE_URL

const root = ReactDOM.createRoot(document.querySelector<HTMLElement>('#root')!)

root.render(
  <BrowserRouter basename={baseurl}>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </BrowserRouter>
)

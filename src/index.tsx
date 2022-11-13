import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'dotenv/config'

import './index.css'
import App from './App'

const baseurl = process.env['BASE_NAME']

const root = ReactDOM.createRoot(document.querySelector<HTMLElement>('#root')!)

root.render(
  <BrowserRouter basename={baseurl}>
    <App />
  </BrowserRouter>
)

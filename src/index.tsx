import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'

import './index.scss'

import App from './App'

const root = ReactDOM.createRoot(document.querySelector<HTMLElement>('#root')!)

root.render(<CookiesProvider>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</CookiesProvider>
)

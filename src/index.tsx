import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

import './index.scss';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(<CookiesProvider>
		<BrowserRouter>
			<App/>
		</BrowserRouter>
	</CookiesProvider>
);

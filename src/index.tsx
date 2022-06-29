import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';

import store from './store';

import './index.scss';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<Provider store={ store }>
		<CookiesProvider>
			<BrowserRouter>
				<App/>
			</BrowserRouter>
		</CookiesProvider>
	</Provider>
);

require('babel-core/register');

import React from 'react'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { AppContainer } from 'react-hot-loader';

import rootReducer from './reducers'
import App from './components/App'

//xz: for server-side processing, getting the redux store state/value
let reduxState;
// if (window.__REDUX_STATE__) {
// 	try {
// 		reduxState = JSON.parse(unescape(__REDUX_STATE__));
// 	} catch (e) {

// 	}
// }

//TODO xz: should relocate this somewhere like /store/configureStore.js next time
function configureStore(initialState) {
	let store = createStore(rootReducer, initialState);

	process.env.NODE_ENV = process.env.NODE_ENV || 'development'; //TODO need to inject ENV variable... properly

	if (process.env.NODE_ENV === 'development') {
		console.log('xz: NODE_ENV is `development`');

		const createLogger = require('redux-logger');
		const logger = createLogger({
			//level: 'info',
			//predicate: (getState, action) => true
		});

		//xz: decided to use the chrome reduxDevtools extension instead of putting in application
		const createStoreWithMiddleware = compose(
			applyMiddleware(thunk, promise, logger),
 			window.devToolsExtension ? window.devToolsExtension() : f => f
    	)(createStore);

		store = createStoreWithMiddleware(rootReducer, initialState);
	}

	return store;
}

const store = configureStore(reduxState);

//TODO STUB
function createRoutes() {
	//TODO routes stuff; check out react-router
	// den after that check out react-redux-router (if wrong rearrange the name)
}

//currently this demo is a single page application, might wan to include routing (99% likely)
//should replace App with routes
ReactDOM.render((
	<AppContainer>
		<Provider store={store}>
			<App />
		</Provider>
	</AppContainer>
), document.getElementById('root'));

if (module.hot) {
	module.hot.accept('./components/App', () => {
		// If you use Webpack 2 in ES modules mode, you can
		// use <App /> here rather than require() a <NextApp />.
		const NextApp = require('./components/App').default;
		ReactDOM.render((
			<AppContainer>
				<Provider store={store}>
					<NextApp />
				</Provider>
			</AppContainer>
		), document.getElementById('root'));
	});
}
require('babel-core/register');

import React from 'react'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
var Parse = require('parse');

import rootReducer from './reducers'
import App from './components/App'

//TODO xz: should relocate this somewhere like /store/configureStore.js next time
function configureStore(initialState) {
	let store = createStore(rootReducer, initialState);

	console.log('process.env.NODE_ENV: ' + process.env.NODE_ENV);
	if (process.env.NODE_ENV) {

	} else {
		process.env.NODE_ENV = 'development';//TODO need to inject ENV variable... properly
	}

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

//xz: for server-side processing, getting the redux store state/value
let reduxState;
const store = configureStore(reduxState);

//currently this demo is a single page application, might wan to include routing (99% likely)
//should replace App with routes
ReactDOM.render((
	<Provider store={store}>
		<App />
	</Provider>
), document.getElementById('root'));

//TODO perhaps should wrap within a "if env is dev"

if (module.hot) {
	module.hot.accept('./components/App', () => {
		var {AppContainer} = require('react-hot-loader');
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

Parse.initialize("xuatzanimelist");
Parse.serverURL = 'https://xuatz-dev-parse-server.herokuapp.com/parse';
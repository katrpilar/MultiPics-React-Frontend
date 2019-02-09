import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore from './store'
import About from './containers/About.js'
import Search from './containers/Search'

const store = configureStore();
console.log(store.getState());

ReactDOM.render(<Provider store={store}>
    {/* <BrowserRouter>
        <Route path="/" component={App} />
    </BrowserRouter> */}
    <BrowserRouter>
        <div>
            <App />
            {/* <Route path="/" component={App} /> */}
            <Route path="/about" component={About} />
            <Route path="/search" component={Search} />

        </div>    
    </BrowserRouter>
    </Provider>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

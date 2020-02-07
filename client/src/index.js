import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'

import App from './components/App'
import Home from './components/Home'
import Signup from './components/auth/Signup'

ReactDOM.render(
    <BrowserRouter>
        <App>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Signup} />
        </App>
    </BrowserRouter>,
    document.querySelector('#root')
)
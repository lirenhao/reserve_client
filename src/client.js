import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {Provider} from "react-redux"
import reducers from './reducers'
import App from './containers/App'
import Ws from './ws'
import '../node_modules/onsenui/css/onsenui.css'
import '../node_modules/onsenui/css/onsen-css-components.css'

const store = createStore(reducers)

const container = document.createElement('div')
document.body.appendChild(container)

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    container
)

if (module.hot) {
    module.hot.accept('./containers/App', () => {
        const NextApp = require('./containers/App').default
        ReactDOM.render(
            <Provider store={store}>
                <NextApp/>
            </Provider>,
            container
        )
    })
}

window.addEventListener("load", () => {
    Ws.setMsgHandler(store.dispatch)
})
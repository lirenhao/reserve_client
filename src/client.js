import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers'
import sagas from './sagas'
import App from './containers/App'
import ws from './ws'
import '../node_modules/onsenui/css/onsenui.css'
import '../node_modules/onsenui/css/onsen-css-components.css'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducers, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(sagas, store)

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
    ws.setMsgHandler(store.dispatch)
})
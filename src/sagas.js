import {take, race, call} from 'redux-saga/effects'
import {LOGIN, TODO, DONE, LOGOUT} from './actions/constants'

function createWebSocket(url, callback) {
    return new Promise((resolve, reject) => {
        try {
            const ws = new WebSocket(url)
            ws.onopen = () => {
                resolve(ws)
            }
            ws.onmessage = (event) => {
                callback(JSON.parse(event.data))
            }
            ws.onclose = () => {
                console.log("close")
            }
            ws.onerror = (err) => {
                reject(err)
            }
        } catch (e) {
            reject(e)
        }
    })
}

function * sendTask(ws) {
    while (true) {
        let task = yield take((action) => [TODO, DONE].indexOf(action.type) > -1)
        console.log(task)
        yield call([ws, ws.send], JSON.stringify(task))
    }
}

function* flow(dispatch) {
    while (true) {
        const login = yield take(LOGIN)
        const ws = yield call(createWebSocket, 'ws://localhost:9000/ws', dispatch)
        yield call([ws, ws.send], JSON.stringify(login))
        const winner = yield race({
            send: call(sendTask, ws),
            logout: take(LOGOUT)
        })
        if (winner.logout) {
            yield call([ws, ws.send], JSON.stringify(winner.logout))
            yield call([ws, ws.close])
        }
    }
}

export default function* sagas(store) {
    yield [flow(store.dispatch)]
}
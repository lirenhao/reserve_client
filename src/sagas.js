import {take, race, call} from 'redux-saga/effects'
import {LOGIN, LOGOUT} from './actions/constants'
import ws from './ws'

export function * loginFlow() {
    while (true) {
        let login = yield take(LOGIN)
        let winner = yield race({
            auth: call([ws, ws.send], login),
            logout: take(LOGOUT)
        })
        if (winner.logout) {
            yield call([ws, ws.send], winner.logout)
        }
    }
}

export function * logoutFlow() {
    while (true) {
        let logout = yield take(LOGOUT)
        yield call([ws, ws.send], logout)
        yield call([ws, ws.close])
    }
}


export default function* sagas() {
    yield [
        loginFlow(),
        logoutFlow()
    ]
}
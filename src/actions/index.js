import {createAction} from 'redux-act'
import * as Const from './constants'

export const login = createAction(Const.LOGIN)
export const list = createAction(Const.LIST)
export const todo = createAction(Const.TODO)
export const done = createAction(Const.DONE)
export const logout = createAction(Const.LOGOUT)
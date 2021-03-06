import {createReducer} from "redux-act"
import * as Act from "../actions"

export default createReducer({
    [Act.init]: (state, payload) => [...payload],
    [Act.todo]: (state, payload) => [...state, payload],
    [Act.done]: (state, payload) => state.filter((value) => value != payload),
    [Act.logout]: (state, payload) => []
}, [])
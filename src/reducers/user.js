import {createReducer} from "redux-act"
import * as Act from "../actions"

export default createReducer({
    [Act.login]: (state, payload) => (payload),
    [Act.logout]: (state, payload) => {
        if(state == payload)
            return ""
        return state
    }
}, "")
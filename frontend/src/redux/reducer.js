import {getTime} from "../functions/getTime"

const compareTime = (a, b) => {
    return getTime(a.Time) - getTime(b.Time)
}

const initialState = {
    user: {
        isLogin: false,
        userId: "",
        userName: "",
        trace: [],
        matchedTrace: [],
        infected: false
    }
}

const rootReducer = (state = initialState, action) => { 
    switch(action.type){
        case "login":
            return Object.assign({}, state, {
                user: Object.assign({}, state.user, {
                    isLogin: true,
                    userName: action.payload.userId,
                    userId: action.payload.userId,
                })}
            )
        case "logout":
            return Object.assign({}, state, {
                user: {
                    isLogin: false,
                    userId: "",
                    userName: "",
                    trace: [],
                    matchedTrace: [],
                    infected: false
                }}
            )
        case "add_trace":
            return Object.assign({}, state, {
                user: Object.assign({}, state.user, {
                    trace: state.user.trace.concat(action.payload.traceList).sort(compareTime)
                })
            })
        case "reset_trace":
            return Object.assign({}, state, {
                user: Object.assign({}, state.user, {
                    trace: action.payload.traceList.sort(compareTime)
                })
            })
        case "add_matchedTrace":
            return Object.assign({}, state, {
                user: Object.assign({}, state.user, {
                    matchedTrace: state.user.matchedTrace.concat(action.payload.matchedTraceList).sort(compareTime)
                })
            })
        case "reset_matchedTrace":
            return Object.assign({}, state, {
                user: Object.assign({}, state.user, {
                    matchedTrace: action.payload.matchedTraceList.sort(compareTime)
                })
            })
        case "infected":
            return Object.assign({}, state, {
                user: Object.assign({}, state.user, {
                    infected: true
                })
            })
        default:
            return state
    }
}

export default rootReducer
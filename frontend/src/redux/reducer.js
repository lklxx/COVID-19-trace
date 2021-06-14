const initialState = {
    user: {
        isLogin: false,
        userId: "",
        userName: "",
        trace: [
            { class: "B", place: "IM Lab", Time: 0 },
            { class: "B", place: "IM Lab", Time: 0 },
            { class: "B", place: "IM Lab", Time: 0 }
        ]
    }
}

const rootReducer = (state = initialState, action) => {
    if(action.type === "login"){
        return Object.assign({}, state, {
            user: Object.assign({}, state.user, {
                isLogin: !state.user.isLogin,
                userName: state.user.isLogin?"":"name",
                userId: state.user.isLogin?"":"1",
            })}
        )
    }
    if(action.type === "post"){
        return Object.assign({}, state, {
            user: Object.assign({}, state.user, {
                trace: state.user.trace.concat(action.payload.traceList)
            })
        })
    }
    return state
}

export default rootReducer
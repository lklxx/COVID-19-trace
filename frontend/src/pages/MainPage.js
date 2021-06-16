import { useState } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import NavBar from "../components/NavBar"
import TraceBar from "../components/TraceBar"
import PostBar from "../components/PostBar"
import { trace_fetch, infected_match, trace_store, infected_store } from "../axios"

export default function MainPage(){

    const user = useSelector(state=>state.user, shallowEqual)
    const dispatch = useDispatch()

    useState( async () => {
        const {traceList} = await trace_fetch(user.userId)
        if(traceList){
            dispatch({type: "reset_trace", payload: {traceList}})
            const { matchedTraceList } = await infected_match(traceList)
            if(matchedTraceList){
                dispatch({type: "reset_matchedTrace", payload: {matchedTraceList}})
            }
        }
    })

    return(
        <div>
            <NavBar context="COVID-19-trace"/>
            <PostBar/>
            <TraceBar/>
        </div>
    )
}
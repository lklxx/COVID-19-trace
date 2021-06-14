import { useState } from "react"
import { shallowEqual, useSelector } from "react-redux"
import NavBar from "../components/NavBar"
import TraceBar from "../components/TraceBar"
import PostBar from "../components/PostBar"
import { trace_fetch, infected_match, trace_store } from "../axios"

export default function MainPage(){

    const user = useSelector(state=>state.user, shallowEqual)

    useState( async () => {
        await trace_store("123", "123")
        // await trace_fetch(user.userId)
        // await infected_match(user.trace)
    })

    return(
        <div>
            <NavBar context="COVID-19-trace"/>
            <PostBar/>
            <TraceBar/>
        </div>
    )
}
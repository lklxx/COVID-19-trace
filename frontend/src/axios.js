import axios from 'axios'

const instance = axios.create({ baseURL: process.env.REACT_APP_BASE_URL })

const trace_store = async (uid, traceList) => {
  let message = { uid, traceList }
  console.log("send trace_store:", message)
  const { data } = await instance.post('/trace_store', message)
  console.log("receive trace_store:", data)
  const { res, err } = data
  if(res === "success"){
    console.log("trace-store success")
    return true
  }
  else if(res === "failed"){
    console.log("trace-store failed, error message:", err)
    return false
  }
  else{
    console.log("trace-store encounter with unexpected failure")
    return false
  }
}

const trace_fetch = async (uid) => {
  console.log(process.env.REACT_APP_BASE_URL)
  let message = { uid }
  console.log("send trace_fetch:", message)
  const { data } = await instance.post('/trace_fetch', message)
  console.log("receive trace_fetch:", data)
  const { res, err, traceList } = data
  if(res === "success"){
    console.log("trace-fetch success")
    return {res, traceList: traceList.TraceList}
  }
  else if(res === "failed"){
    console.log("trace-fetch failed, error message:", err)
    return {res}
  }
  else{
    console.log("trace-fetch encounter with unexpected failure")
    return {res: "failed"}
  }
}

const infected_store = async (traceList) => {
  let message = { traceList }
  console.log("send infected_store:", message)
  const { data } = await instance.post('/infected_store', message)
  console.log("receive infected_store:", data)
  const { res, err } = data
  if(res === "success"){
    console.log("infected-store success")
    return true
  }
  else if(res === "failed"){
    console.log("infected-store failed, error message:", err)
    return false
  }
  else{
    console.log("infected-store encounter with unexpected failure")
    return false
  }
}

const infected_match = async (traceList) => {
  let message = { traceList }
  console.log("send infected-match:", message)
  const { data } = await instance.post('/infected_match', message)
  console.log("receive infected_match:", data)
  const { res, err, matchedTraceList } = data
  if(res === "success"){
    console.log("infected-match success")
    return {res, matchedTraceList}
  }
  else if(res === "failed"){
    console.log("infected-match failed, error message:", err)
    return {res}
  }
  else{
    console.log("infected-match encounter with unexpected failure")
    return {res: "failed"}
  }
}

export { trace_store, trace_fetch, infected_store, infected_match }
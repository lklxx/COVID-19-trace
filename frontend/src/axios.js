import axios from 'axios'

const instance = axios.create({ baseURL: 'http://34.120.123.158' })

const trace_store = async (uid, traceList) => {
  let message = { uid: "123", traceList : [{class: "A", Time: 0, place: "home"}]}
  console.log("trace_store:", message)
  const { res, err } = await instance.post('/trace_store', message)
  if(res === "success")console.log("trace-store success")
  else if(res === "failed")console.log("trace-store failed, error message:", err)
  else console.log("trace-store encounter with unexpected failure")
}

const trace_fetch = async (uid) => {
  let message = { uid }
  console.log(message)
  const { res, err, traceList } = await instance.get('/trace_fetch/', message)
  const { data } = await instance.get('/trace_fetch')
  console.log(data)
  if(res === "success"){
    console.log("trace-fetch success")
    return {res, traceList}
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
  console.log("infected_store:", message)
  const { res, err } = await instance.post('/infected_store')
  if(res === "success")console.log("infected-store success")
  else if(res === "failed")console.log("infected-store failed, error message:", err)
  else console.log("infected-store encounter with unexpected failure")
}

const infected_match = async (traceList) => {
  let message = { traceList }
  console.log("infected-match:", message)
  const { res, err, machedTraceList } = await instance.get('/infected_match')
  if(res === "success"){
    console.log("infected-match success")
    return {res, machedTraceList}
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
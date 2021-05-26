import axios from 'axios'

const instance = axios.create({ baseURL: 'http://localhost:9090' })

const trace_store = async (message) => {
  const { data, status } = await instance.post('/trace-store', message)
  return data
}

const trace_fetch = async (message) => {}
const infected_store = async (message) => {}
const infected_match = async (message) => {}

export { trace_store, trace_fetch, infected_store, infected_match }
import React, { Component } from "react";
import "./App.css";
import { trace_store, trace_fetch, infected_store, infected_match } from "./axios";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    test_trace_store = async () => {
      var uid = "kaikai"
      var trace1 = { class: "B", place: "IM Lab", time: "988200" }
      var trace2 = { class: "B", place: "IM Lab", time: "990000" }
      var trace3 = { class: "B", place: "IM Lab", time: "991800" }
      var traceList = [trace1, trace2, trace3]

      const message = { uid: uid, traceList: traceList }

      const data = await trace_store(message)
      console.log("res: ", data.res)
    }

    test_trace_fetch = async () => {}
    test_infected_store = async () => {}
    test_infected_match = async () => {}

    loadHomePage() {
      // trace_fetch
      // infected_match
    }

    uploadTrace() {
      // trace_store
      // infected_match
    }

    infectedReport() {
      // infected_store
    }

    render() {
        return ( 
            <div className = "App">
              {/* buttons for debug only, should be removed before deployment */}
                <button onClick = { this.test_trace_store }>     trace_store    </button>
                <button onClick = { this.test_trace_fetch }>     trace_fetch    </button>
                <button onClick = { this.test_infected_store }>  infected_store </button>
                <button onClick = { this.test_infected_match }>  infected_match </button> 
              {/* buttons for debug only, should be removed before deployment */}

                <button onClick = { this.uploadTrace }>     Upload Trace    </button> 
                <button onClick = { this.infectedReport }>  Infected Report </button> 

                <p> { this.state.receive } </p>
            </div>
        );
    }
}

export default App;
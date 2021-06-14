export default function getTraceList(traceClass, place, startTimeStamp, endTimeStamp){
    let traceList = []
    endTimeStamp = endTimeStamp < startTimeStamp ? endTimeStamp + 2592000: endTimeStamp
    let current = startTimeStamp
    while(current < endTimeStamp){
        traceList.push({class: traceClass, Time: current % 2592000, place})
        current = current + 1800
    }
    return traceList
}
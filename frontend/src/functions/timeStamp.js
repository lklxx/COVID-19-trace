export default function timeStamp(date, time, type){
    let m = 0
    if(type === "s")m = time[1]<30?0:30
    else if (type === "e")m = time[1]===0?0:time[1]>30?60:30
    return (Date.UTC(date[0], date[1], date[2], time[0]-8, m)/1000)%2592000
}
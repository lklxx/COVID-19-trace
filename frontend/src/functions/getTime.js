function getTime(timeStamp){
    const base = parseInt(Date.now() / 2592000000) * 2592000
    const now = parseInt(Date.now() / 1000) % 2592000
    if(now < timeStamp)
        return base + parseInt(timeStamp) - 2592000
    else
        return base + parseInt(timeStamp) 
}

function parseTwo(input){
    return `${input}`.length===1?`0${input}`:`${input}`
}

function expressTime(timeStamp){
    let Time = new Date(timeStamp*1000)
    const start = `${Time.getFullYear()}/${parseTwo(Time.getMonth()+1)}/${parseTwo(Time.getDate())} ${parseTwo(Time.getHours())}:${parseTwo(Time.getMinutes())}`
    Time = new Date(timeStamp*1000+1800000)
    const end = `${parseTwo(Time.getHours())}:${parseTwo(Time.getMinutes())}`
    return `${start} ~ ${end}`
}

export {getTime, expressTime}
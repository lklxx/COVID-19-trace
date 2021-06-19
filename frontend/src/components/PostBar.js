import { Select, Box, Paper, Grid, makeStyles, TextField, Button, Typography } from '@material-ui/core'
import { useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import timeStamp from "../functions/timeStamp"
import getTraceList from "../functions/getTraceList"
import { infected_match, trace_store } from "../axios"

const useStyles = makeStyles(theme => ({
    searchbar: {
        margin: "10px 0% 10px 0%",
        width: "100%"
    },
    topbar: {
        width: "100%",
    },
    textField: {
      margin: "10px 0 10px 0",
      width: 200,
    },
    classField: {
      margin: "10px 0 10px 0",
      width: "100%",
      height: "100%"
    }
}))

export default function SearchBar(props){

    const classes = useStyles()
    const user = useSelector(state=>state.user, shallowEqual)
    const dispatch = useDispatch()
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [traceClass, setTraceClass] = useState("A")
    const [place, setPlace] = useState("")
    
    const handleChange = (e, type) => {
        if(type === "sd")setStartDate(e.target.value)
        if(type === "st")setStartTime(e.target.value)
        if(type === "ed")setEndDate(e.target.value)
        if(type === "et")setEndTime(e.target.value)
        if(type === "tc")setTraceClass(e.target.value)
        if(type === "pl")setPlace(e.target.value)
    }

    const notFilledIn = () => {
        return ( startDate === "" || startTime === "" || endDate === "" || endTime === "" || traceClass === "" || place === "" )
    }

    const handleClick = async (e) => {
        if(notFilledIn())alert("請填寫所有位置")
        else if(startDate > endDate || ( startDate === endDate && startTime > endTime ))alert("結束時間早於開始時間")
        else{
            const SD_split = startDate.split("-")
            const ST_split = startTime.split(":")
            const ED_split = endDate.split("-")
            const ET_split = endTime.split(":")
            const startTimeStamp = timeStamp(SD_split, ST_split, "s")
            const endTimeStamp = timeStamp(ED_split, ET_split, "e")
            const traceList = getTraceList(traceClass, place, startTimeStamp, endTimeStamp)
            if(await trace_store(user.userId, traceList)){
                dispatch({type: "add_trace", payload: {traceList}})
                const { matchedTraceList } = await infected_match(traceList)
                if(matchedTraceList){
                    dispatch({type: "add_matchedTrace", payload: {matchedTraceList}})
                }
            }
            
        }
    }

    return(
        <Paper variant="outlined" className={classes.topbar}>
            <Grid container justify="center" alignItems="center">
                <Grid item xs={3}>
                    <Grid container justify="center">
                        <Grid item>
                            <TextField
                                label="開始日期"
                                type="date"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e)=>handleChange(e, "sd")}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={3}>
                    <Grid container justify="center">
                        <Grid item>
                            <Box>
                            <TextField
                                label="開始時間"
                                type="time"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e)=>handleChange(e, "st")}
                            />
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={3}>
                    <Grid container justify="center">
                        <Grid item>
                            <TextField
                                label="結束日期"
                                type="date"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e)=>handleChange(e, "ed")}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={3}>
                    <Grid container justify="center">
                        <Grid item>
                            <TextField
                                label="結束時間"
                                type="time"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e)=>handleChange(e, "et")}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={3}>
                    {/* <TextField
                        label="class"
                        className={classes.classField}
                        onChange={(e)=>handleChange(e, "tc")}
                        variant="outlined"
                    /> */}
                    <Select
                        className={classes.classField}
                        native
                        labelId="select-label"
                        id="select"
                        value={traceClass}
                        onChange={(e)=>{
                            handleChange(e, "tc")
                        }}
                        label="類別"
                    >
                        <option value={"A"}>甲類</option>
                        <option value={"B"}>乙類</option>
                        <option value={"C"}>丙類</option>
                        <option value={"D"}>丁類</option>
                        <option value={"E"}>戊類</option>
                    </Select>
                </Grid>
                <Grid item xs={1}/>
                <Grid item xs={4}>
                    <TextField
                        label="地點"
                        className={classes.classField}
                        onChange={(e)=>handleChange(e, "pl")}
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={1}/>
                <Grid item xs={2}>
                    <Button
                        className={classes.classField}
                        onClick={(e)=>handleClick(e)}
                        variant="contained"
                    >
                        <Typography variant="h6">
                            加入
                        </Typography>
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    )
}

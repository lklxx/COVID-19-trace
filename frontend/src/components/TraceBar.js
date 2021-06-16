import { Box, Button, Card, CardContent, CardHeader, Grid, makeStyles, Typography } from "@material-ui/core";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { infected_match, infected_store, trace_fetch } from "../axios";
import { getTime, expressTime } from "../functions/getTime"

const useStyle = makeStyles(theme => ({
    button: {
        margin: "10px 0% 0% 0%",
        width: "100%"
    },
    tracebar: {
        marginTop: "20px"
    }
}))
export default function TraceBar(){

    const classes = useStyle()
    const user = useSelector(state=>state.user, shallowEqual)
    const dispatch = useDispatch()

    const handleClick = async (e) => {
        const {traceList} = await trace_fetch(user.userId)
        if(traceList){
            dispatch({type: "reset_trace", payload: {traceList}})
            if(await infected_store(traceList)){
                dispatch({type: "infected"})
                const { matchedTraceList } = await infected_match(traceList)
                if(matchedTraceList){
                    dispatch({type: "reset_matchedTrace", payload: {matchedTraceList}})
                }
            }
        }
        console.log(user)
    }

    return(
        <Grid container justify="center" alignItems="center" spacing={3} className={classes.tracebar}>
            <Grid item>
                <Card variant="outlined">
                    <CardHeader
                        title={`姓名： ${user.userName}`}
                    />
                    <Box width={750}/>
                    <CardContent>
                        <Grid container>
                            <Grid item>
                                <Typography variant="h6" component="p">
                                    我的足跡：
                                </Typography>
                            </Grid>
                            <Grid item>
                                {user.trace.map((t, index)=>{
                                    return(
                                        <div key={index}>
                                        <Typography variant="h6">
                                            {`${expressTime(getTime(t.Time))}`}
                                        </Typography>
                                        <Typography variant="h6">
                                            {`類別: ${t.Class}`}
                                        </Typography>
                                        <Typography variant="h6">
                                            {`地點: ${t.Place}`}
                                        </Typography>
                                        <Box height="20px"></Box>
                                        </div>
                                    )
                                })}
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item>
                                <Typography variant="h6" component="p">
                                    染疫風險：
                                </Typography>
                            </Grid>
                            <Grid item>
                                {user.matchedTrace.map((t, index)=>{
                                    return(
                                        <div key={index}>
                                        <Typography variant="h6">
                                            {`${expressTime(getTime(t.Time))}`}
                                        </Typography>
                                        <Typography variant="h6">
                                            {`類別: ${t.Class}`}
                                        </Typography>
                                        <Typography variant="h6">
                                            {`地點: ${t.Place}`}
                                        </Typography>
                                        <Box height="20px"></Box>
                                        </div>
                                    )
                                })}
                            </Grid>
                        </Grid>
                        <Grid container justify="center">
                            <Grid item>
                                <Button variant="contained" className={classes.button} onClick={handleClick}>
                                    <Typography variant="body2">
                                        回報確診
                                    </Typography>
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}
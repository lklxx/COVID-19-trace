import { Button, Card, CardContent, CardHeader, Grid, makeStyles, Typography } from "@material-ui/core";
import { shallowEqual, useSelector } from "react-redux";

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
    const handleClick = (e) => {
        //infected_store
        console.log("infected_store")
    }

    return(
        <Grid container justify="center" alignItems="center" spacing={3} className={classes.tracebar}>
            <Grid item>
                <Card variant="outlined">
                    <CardHeader
                        title={`姓名： ${user.userName}`}
                    />
                    <CardContent>
                        <Grid container>
                            <Grid item>
                                <Typography variant="h6" component="p">
                                    足跡：
                                </Typography>
                            </Grid>
                            <Grid item>
                                {user.trace.map((t, index)=>{
                                    console.log(t)
                                    return(
                                        <Typography variant="h6" key={index}>
                                            {`class: ${t.class}, Time: ${t.Time}, place: ${t.place}`}
                                        </Typography>
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
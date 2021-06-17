import NavBar from "../components/NavBar"
import { useState } from 'react'
import { Card, Box, CardContent, Grid, Typography, TextField, makeStyles, Button } from "@material-ui/core"
import { useDispatch } from "react-redux"

const useStyle = makeStyles(theme => ({
    classField: {
        margin: "10px 0 10px 0",
        width: "100%",
        height: "100%"
    },
    box: {
        height: "80vh"
    },
    card: {
        height: "100%"
    }
}))

export default function LoginPage(){

    const classes = useStyle()
    const dispatch = useDispatch()
    const [userId, setUserId] = useState("")

    const handleClick = () => {
        if(userId === ""){
            alert("請輸入 user id")
        }
        else{
            dispatch({type: "login", payload: {userId}})
        }
    }

    return(
        <>
            <NavBar context="COVID-19-trace"/>
            <Box className={classes.box}>
                <Grid container justify="center" alignItems="center" className={classes.card}>
                    <Grid item>
                        <Card>
                            <CardContent>
                                <Grid container justify="center">
                                    <Grid item>
                                        <Typography variant="h4">Login</Typography>
                                    </Grid>
                                </Grid>
                                <TextField
                                    label="userId"
                                    className={classes.classField}
                                    variant="outlined"
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                    onKeyDown={(e) => {if(e.keyCode === 13){handleClick()}}}
                                />
                                <Button 
                                    className={classes.classField} 
                                    color="primary" 
                                    variant="contained"
                                    onClick={handleClick}
                                >
                                    <Typography>登入</Typography>
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
import AppBar from '@material-ui/core/AppBar'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Toolbar, Typography, Link, Grid } from '@material-ui/core';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink, Redirect } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    homepagebutton:{
      marginRight: theme.spacing(3),
    },
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(3),
    },
    title: {
      marginLeft: theme.spacing(2),
      flexGrow: 1,
    },
    toolbar: {
        height: '100%'
    },
    appbar: {
        height: "80px"
    }
  }));

export default function NavBar(props){
    const classes = useStyles()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user, shallowEqual)

    return(
        <div>
        <AppBar position="static" className={classes.appbar}>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h4" className={classes.title}>
                    {props.context}
                </Typography>
                {user.isLogin?
                    <>
                        <Redirect from="/login" to="/home"></Redirect>
                        <Button color="inherit" onClick={() => dispatch({type: "logout"})}>
                            <Grid container justify="center"><Grid item>
                            <Typography variant="h6">
                                登出
                            </Typography>
                            </Grid></Grid>
                        </Button>
                    </>
                    :
                    <></>
                }
            </Toolbar>
        </AppBar>
        </div>
    )
}
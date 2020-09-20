import React, {useEffect, useState } from 'react';

// import getUser from '../api/getUserAPI';
import postUser from '../api/postUserAPI';
import HumanForm, {AnimalForm} from '../hooks/useUser';
// import  UserForm from '../hooks/useUser'

import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import Typography from '@material-ui/core/Typography';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
// import {commonStyle} from './style';
import RedditTextField from './RedditTextField'
// import {commonStyle} from './style';
// import {commonStyle} from './style';
import {
    fade,
    MuiThemeProvider,
    ThemeProvider,
    withStyles,
    makeStyles,
    createMuiTheme,
  } from '@material-ui/core/styles';

const Qestion= ({signup_style,Submit}) =>  {
    const classes = signup_style();
    const history = useHistory();
    // human

    const [errorMessage, setErrorMessage] = useState()
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true)
    const [values, setValues] = React.useState({
        showPassword: false,//ToDO I want to  togle show pass
        showQestion:false, //To show "Are you human or Animal "
        showAnimalSignUp:false, //To show " SignUp of Animal "
      });

    // const handleClickShowPassword = () => {
    // setValues({ ...values, showPassword: !values.showPassword });
    // };

    // const handleMouseDownPassword = (event) => {
    // event.preventDefault();
    // };
    const handleToFeed = () => {
        history.push('/main')
      }



    const onSubmit = e => {
        e.preventDefault()
        Submit()
         
        // dom.push({ "email": state.email, "password": state.password})
    } 

    return(
    <div className={classes.paper}>


    
    
    <Typography   className={classes.animar} color="secondary" component="h1" variant="h4">
    animar
    </Typography>

    <Typography  className={classes.guide} color="secondary" component="h2" variant="h4">
    Are you Animal or Human?
    </Typography>
    <Typography color="secondary" component="h2" variant="h5">
    Animals can only post
    </Typography>
    <form  onSubmit={onSubmit} className={classes.form,classes.sign_in_card} noValidate>

        <div>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
        >
            I am an animal
        </Button>
        <Button
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={handleToFeed}
        >
            I am a human
        </Button>
        
        </div>

    </form>
    </div>
    ) }
export default Qestion;
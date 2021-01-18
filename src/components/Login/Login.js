import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        StudyBuddy
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props) {
  const {history} = props;
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState(''); 
  const [error,setError] = useState(null);
  const classes = useStyles();
  const handleClick = async () => {
   let response = await fetch ('http://localhost:8000/api/admins/login', { 
   method: 'post',
    headers: { 'content-type':'application/json'

     },
     body: JSON.stringify(
     {  
       email:email , password:password
     })
   });
   let data=await response.json()
   console.log(data)
   if (data.error) {
     setError ('Invalid Email or Password')
     return
   }
   localStorage.setItem('token',data.access_token)
   history.push('/')
  }
  useEffect(() => {
    const token = localStorage.getItem ('token');
    if (token) {
      history.push ('/')
    }
  
  }, [])

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {error &&  <Typography component="h1" variant="h5" color='secondary'>
          {error}
        </Typography> }
        <form className={classes.form} noValidate>
          <TextField
            onChange = {e=>{setEmail(e.target.value)}}
            value = {email}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            onChange = {e=>{setPassword(e.target.value)}}
            value = {password}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            onClick = {
              (e) => {
                e.preventDefault()
                handleClick ()
               }
            }
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
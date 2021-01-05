import React from 'react'
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const UpdateModal = ({ props }) => {
  const {
    updateAdminModal,
    handleUpdateAdminModalClose,
    updateAdmin,
    nameError,
    nameUpdate,
    handleFormChangeUpdate,
    nameErrorMessage,
    emailError,
    emailUpdate,
    emailErrorMessage,
    passwordError,
    passwordUpdate,
    passwordErrorMessage
  } = props

  const useStyles = makeStyles(theme => ({
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }));
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={updateAdminModal}
      onClose={handleUpdateAdminModalClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={updateAdminModal}>
        <div className={classes.paper}>
          <Typography style={{ color: "#3f51b5" }} variant="h4" component="h2" gutterBottom>
            Update Admin Form
              </Typography>
          <form onSubmit={updateAdmin}>
            <FormControl style={{ display: 'block', width: '400px', marginBottom: '20px' }} error={nameError}>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input
                placeholder="e.g. john doe"
                type="text"
                required
                style={{ width: '100%' }}
                id="name"
                value={nameUpdate}
                onChange={handleFormChangeUpdate}
                aria-describedby="name-text"
              />
              {nameError && <FormHelperText id="name-error-text">{nameErrorMessage}</FormHelperText>}
            </FormControl>
            <FormControl style={{ display: 'block', width: '400px', marginBottom: '20px' }} error={emailError}>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                placeholder="e.g. johndoe@email.com"
                type="email"
                required
                style={{ width: '100%' }}
                id="email"
                value={emailUpdate}
                onChange={handleFormChangeUpdate}
                aria-describedby="Email-text"
              />
              {emailError && <FormHelperText id="email-error-text">{emailErrorMessage}</FormHelperText>}
            </FormControl>
            <FormControl style={{ display: 'block', width: '400px', marginBottom: '20px' }} error={passwordError}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                placeholder="e.g. 12345678"
                type="text"
                style={{ width: '100%' }}
                id="password"
                value={passwordUpdate}
                onChange={handleFormChangeUpdate}
                aria-describedby="password-text"
              />
              {passwordError && <FormHelperText id="password-error-text">{passwordErrorMessage}</FormHelperText>}
            </FormControl>
            <Button type="submit" variant="contained" color="primary">
              Update Admin
                </Button>
          </form>

        </div>
      </Fade>
    </Modal>
  )
}

export default UpdateModal

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
    updateClassModal,
    updateClass,
    handleUpdateClassModalClose,
    nameError,
    nameUpdate,
    handleFormChangeUpdate,
    nameErrorMessage,
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
      open={updateClassModal}
      onClose={handleUpdateClassModalClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
  
      <Fade in={updateClassModal}>
        <div className={classes.paper}>
          <Typography style={{ color: "#3f51b5" }} variant="h4" component="h2" gutterBottom>
            Update Class Form
              </Typography>
          <form onSubmit={updateClass}>
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
            <Button type="submit" variant="contained" color="primary">
              Update Class
                </Button>
          </form>

        </div>
      </Fade>
    </Modal>
  )
}

export default UpdateModal
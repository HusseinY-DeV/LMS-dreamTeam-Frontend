import React from 'react';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const DeleteModal = ({ props }) => {

  const {
    deleteAdminModal,
    handleDeleteAdminModalClose,
    deletedName,
    deleteAdmin
  } = props;

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
      open={deleteAdminModal}
      onClose={handleDeleteAdminModalClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={deleteAdminModal}>
        <div className={classes.paper}>
          <span style={{ marginRight: '10px' }} id="transition-modal-description">Are you sure you want to delete admin <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>{deletedName}</span></span>
          <Button style={{ marginRight: '10px' }} onClick={() => { deleteAdmin() }} variant="contained" color="secondary">
            Yes
                </Button>
          <Button onClick={() => { handleDeleteAdminModalClose() }} variant="contained" color="primary">
            No
                </Button>
        </div>
      </Fade>
    </Modal>
  )
}

export default DeleteModal

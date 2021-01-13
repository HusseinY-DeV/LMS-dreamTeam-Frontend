import React from 'react'
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';

const DeleteSuccessModal = ({ props }) => {

  const {
    deleteSectionSuccessModal,
    handleDeleteSectionSuccessModalClose,
    status
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
      open={deleteSectionSuccessModal}
      onClose={handleDeleteSectionSuccessModalClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={deleteSectionSuccessModal}>
        <div className={classes.paper}>
          {status ? (<span style={{ marginRight: '10px' }} id="transition-modal-description">{status}</span>)
            : 
         (<span style={{ marginRight: '10px' }} id="transition-modal-description">Section Deleted Successfully</span>)   
        }
          <Button onClick={() => { handleDeleteSectionSuccessModalClose() }} variant="contained" color="primary">
            Okay
                </Button>
        </div>
      </Fade>
    </Modal>
  )
}

export default DeleteSuccessModal

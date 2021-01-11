import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { deleteStudentApi } from '../api/api'
import DeleteSuccessModal from './DeleteSuccessModal'

const DeleteModal = ({ props }) => {

  const [deleteStudentSuccessModal, setDeleteStudentSuccessModal] = useState(false);

  const handleDeleteStudentSuccessModalOpen = () => {
    setDeleteStudentSuccessModal(true);
  };

  const handleDeleteStudentSuccessModalClose = () => {
    setDeleteStudentSuccessModal(false);
    handleDeleteStudentModalClose();
  };

  const {
    deleteStudentModal,
    handleDeleteStudentModalClose,
    deletedId,
    deletedFname,
    deletedLname,
    setDataChange,
    length,
    setPage
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

  const deleteStudent = async () => {
    await deleteStudentApi(deletedId);
    if (length == 1) {
      setPage(prev => --prev)
      handleDeleteStudentSuccessModalOpen();
      return;
    }
    setDataChange(prev => !prev);
    handleDeleteStudentSuccessModalOpen();
  }

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={deleteStudentModal}
        onClose={handleDeleteStudentModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={deleteStudentModal}>
          <div className={classes.paper}>
            <span style={{ marginRight: '10px' }} id="transition-modal-description">Are you sure you want to delete Student <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>{deletedFname} {deletedLname}</span></span>
            <Button style={{ marginRight: '10px' }} onClick={deleteStudent} variant="contained" color="secondary">
              Yes
                </Button>
            <Button onClick={() => { handleDeleteStudentModalClose() }} variant="contained" color="primary">
              No
                </Button>
          </div>
        </Fade>
      </Modal>
      {deleteStudentSuccessModal && <DeleteSuccessModal props={{
        deleteStudentSuccessModal,
        handleDeleteStudentSuccessModalClose
      }} />}
    </>
  )
}

export default DeleteModal

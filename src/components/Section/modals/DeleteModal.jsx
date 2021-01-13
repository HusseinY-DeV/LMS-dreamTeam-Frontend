import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { deleteSectionApi } from '../api/api'
import DeleteSuccessModal from './DeleteSuccessModal'

const DeleteModal = ({ props }) => {

  const [deleteSectionSuccessModal, setDeleteSectionSuccessModal] = useState(false);

  const handleDeleteSectionSuccessModalOpen = () => {
    setDeleteSectionSuccessModal(true);
  };

  const handleDeleteSectionSuccessModalClose = () => {
    setDeleteSectionSuccessModal(false);
    handleDeleteSectionModalClose();
  };

  const {
    deleteSectionModal,
    handleDeleteSectionModalClose,
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

  const deleteSection = async () => {
    await deleteSectionApi(deletedId);
    if (length == 1) {
      setPage(prev => --prev)
      handleDeleteSectionSuccessModalOpen();
      return;
    }
    setDataChange(prev => !prev);
    handleDeleteSectionSuccessModalOpen();
  }

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={deleteSectionModal}
        onClose={handleDeleteSectionModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={deleteSectionModal}>
          <div className={classes.paper}>
            <span style={{ marginRight: '10px' }} id="transition-modal-description">Are you sure you want to delete Section <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>{deletedFname} {deletedLname}</span></span>
            <Button style={{ marginRight: '10px' }} onClick={deleteSection} variant="contained" color="secondary">
              Yes
                </Button>
            <Button onClick={() => { handleDeleteSectionModalClose() }} variant="contained" color="primary">
              No
                </Button>
          </div>
        </Fade>
      </Modal>
      {deleteSectionSuccessModal && <DeleteSuccessModal props={{
        deleteSectionSuccessModal,
        handleDeleteSectionSuccessModalClose
      }} />}
    </>
  )
}

export default DeleteModal

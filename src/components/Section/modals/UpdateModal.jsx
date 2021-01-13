import React, { useState, useEffect } from 'react'
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Avatar from '@material-ui/core/Avatar';
import { getAllSectionsNoPaginateApi } from '../../Section/api/api'
import { getSectionApi, updateSectionApi } from '../api/api'
import UpdateSuccessModal from './UpdateSuccessModal'
import { makeStyles } from '@material-ui/core/styles';
import { ClassTwoTone } from '@material-ui/icons';

const UpdateModal = ({ props }) => {
  const {
    updateSectionModal,
    handleUpdateSectionModalClose,
    updateId,
    setDataChange,
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
    select: {
      // margin: theme.spacing(1),
      marginBottom: 20,
      minWidth: 120,
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
  }));
  const classes = useStyles();

  const [updateSectionSuccessModal, setUpdateSectionSuccessModal] = useState(false);


  const handleUpdateSectionSuccessModalClose = () => {
    setUpdateSectionSuccessModal(false);
  };

  const handleUpdateSectionSuccessModalOpen = () => {
    setUpdateSectionSuccessModal(true);
  };

  const error = { msg: '', status: false };

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(error);

  const [numberOfStudents, setNumberOfStudents] = useState('');
  const [numberOfStudentsError, setNumberOfStudentsError] = useState(error);

  const [classId, setClassId] = useState('');
  const [classError, setClassError] = useState(error);

  const [clases, setClases] = useState([]);

  useEffect(() => {
    let active = true;
    (async () => {
      const data = await getAllSectionsNoPaginateApi();
      const data2 = await getSectionApi(updateId);
      if (!active) {
        return;
      }
      setClases(data);
      setName(data2.name);
      setNumberOfStudents(data2.number_of_students);
      setClassId(data2.class_id)
    })();

    return () => {
      active = false;
    };
  }, []);

  const handleFormChange = e => {
    e.target.id === "name" && setName(e.target.value);
    e.target.id === "numb" && setNumberOfStudents(e.target.value);
  }

  const handleSelectChange = e => {
    setClassId(e.target.value);
  }

  const updateSection = async e => {
    e.preventDefault();
    setNameError(error);
    setNumberOfStudentsError(error);
    setClassError(error);
    const data = await updateSectionApi(updateId, name, numberOfStudents, classId);
    if (data.errors) {
      if (data.errors.name) {
        setNameError({ msg: data.errors.name[0], status: true });
      }
      if (data.errors.number_of_stundents) {
        setNumberOfStudentsError({ msg: data.errors.number_o_students[0], status: true });
      }
      return;
    }
    handleUpdateSectionSuccessModalOpen();
    setDataChange(prev => !prev);
  }

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={updateSectionModal}
        onClose={handleUpdateSectionModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={updateSectionModal}>
          <div className={classes.paper}>
            <Typography style={{ color: "#3f51b5" }} variant="h4" component="h2" gutterBottom>
              Update Section Form
              </Typography>

            <form onSubmit={updateSection}>
              <FormControl style={{ display: 'block', width: '400px', marginBottom: '20px' }} error={nameError.status}>
                <InputLabel htmlFor="name">Section Name</InputLabel>
                <Input
                  placeholder="e.g. john"
                  type="text"
                  required
                  style={{ width: '100%' }}
                  id="name"
                  value={name}
                  onChange={handleFormChange}
                  aria-describedby="fname-text"
                />
                {nameError.status && <FormHelperText id="fname-error-text">{nameError.msg}</FormHelperText>}
              </FormControl>

              <FormControl style={{ display: 'block', width: '400px', marginBottom: '20px' }} error={numberOfStudentsError.status}>
                <InputLabel htmlFor="numb">Number Of Students</InputLabel>
                <Input
                  placeholder="e.g. doe"
                  type="text"
                  required
                  style={{ width: '100%' }}
                  id="numb"
                  value={numberOfStudents}
                  onChange={handleFormChange}
                  aria-describedby="lname-text"
                />
                {numberOfStudentsError.status && <FormHelperText id="lname-error-text">{numberOfStudentsError.msg}</FormHelperText>}
              </FormControl>

              <FormControl className={classes.select} error={classError.status}>
                <InputLabel id="demo-simple-select-label">Class</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="section"
                  value={classId}
                  onChange={handleSelectChange}
                >
                  {clases.map((clas, key) => (
                    <MenuItem key={key} value={clas.id}>{clas.name}</MenuItem>
                  ))}
                </Select>
                {classError.status && <FormHelperText id="section-error-text">{classError.msg}</FormHelperText>}
              </FormControl>
              <Button type="submit" variant="contained" color="primary">
                Update Section
            </Button>
            </form>

          </div>
        </Fade>
      </Modal>
      {updateSectionSuccessModal && <UpdateSuccessModal props={{
        updateSectionSuccessModal,
        handleUpdateSectionSuccessModalClose,
        handleUpdateSectionModalClose
      }} />}
    </>
  )
}

export default UpdateModal

import React, { useState, useEffect } from 'react'
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { getAllClassesApi } from '../../Class/api/api'
import { addSectionApi } from '../api/api'
import AddSuccessModal from './AddSuccessModal'

const AddModal = ({ props }) => {
  const { addSectionModal, handleAddSectionModalClose, setDataChange } = props

  const [addSectionSuccessModal, setAddSectionSuccessModal] = useState(false);

  const handleAddSectionSuccessModalClose = () => {
    setAddSectionSuccessModal(false);
  };

  const handleAddSectionSuccessModalOpen = () => {
    setAddSectionSuccessModal(true);
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
      const data = await getAllClassesApi();
      if (!active) {
        return;
      }
      setClases(data);
    })();

    return () => {
      active = false;
    };
  }, []);

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
  }));
  const classes = useStyles();

  const handleFormChange = e => {
    e.target.id === "name" && setName(e.target.value);
    e.target.id === "numb" && setNumberOfStudents(e.target.value);
  }

  const handleSelectChange = e => {
    setClassId(e.target.value);
  }

  const addSection = async e => {
    setNameError(error);
    setNumberOfStudentsError(error);
    setClassError(error);
    e.preventDefault();
    const data = await addSectionApi(name, numberOfStudents,classId);
    if (data.errors) {
      if (data.errors.name) {
        setNameError({ msg: data.errors.name[0], status: true });
      }
      if (data.errors.number_of_students) {
        setNumberOfStudentsError({ msg: data.errors.number_of_students[0], status: true });
      }
      if (data.errors.class_id) {
        setClassError({ msg: "The class is required", status: true });
      }
      return;
    }
    handleAddSectionSuccessModalOpen();
    setDataChange(prev => !prev);
  }

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={addSectionModal}
        onClose={handleAddSectionModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={addSectionModal}>
          <div className={classes.paper}>
            <Typography style={{ color: "#3f51b5" }} variant="h4" component="h2" gutterBottom>
              Add Section Form
          </Typography>
            <form onSubmit={addSection}>
              <FormControl style={{ display: 'block', width: '400px', marginBottom: '20px' }} error={nameError.status}>
                <InputLabel htmlFor="name">Section name</InputLabel>
                <Input
                  placeholder="e.g. sec"
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
                <InputLabel htmlFor="numb">Number of Students</InputLabel>
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

              <FormControl className={classes.select} error={classError.status}
              >
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
              <Button type="submit" variant="contained" color="primary"
              style={{ display: 'block' }}>
                Add Section
            </Button>
            </form>
          </div>
        </Fade>
      </Modal>
      {addSectionSuccessModal && <AddSuccessModal props={{
        addSectionSuccessModal,
        handleAddSectionSuccessModalClose,
        handleAddSectionModalClose
      }} />}
    </>

  )
}

export default AddModal

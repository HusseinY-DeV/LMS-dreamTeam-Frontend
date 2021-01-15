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
import { getAllSectionsNoPaginateApi } from '../../Section/api/api'
import { addStudentApi } from '../api/api'
import AddSuccessModal from './AddSuccessModal'

const AddModal = ({ props }) => {
  const { addStudentModal, handleAddStudentModalClose, setDataChange } = props

  const [addStudentSuccessModal, setAddStudentSuccessModal] = useState(false);

  const handleAddStudentSuccessModalClose = () => {
    setAddStudentSuccessModal(false);
  };

  const handleAddStudentSuccessModalOpen = () => {
    setAddStudentSuccessModal(true);
  };

  const error = { msg: '', status: false };

  const [fname, setFname] = useState('');
  const [fnameError, setFnameError] = useState(error);

  const [lname, setLname] = useState('');
  const [lnameError, setLnameError] = useState(error);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(error);

  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState(error);


  const [sectionId, setSectionId] = useState('');
  const [sectionError, setSectionError] = useState(error);


  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(error);

  const [sections, setSections] = useState([]);

  useEffect(() => {
    let active = true;
    (async () => {
      const data = await getAllSectionsNoPaginateApi();
      if (!active) {
        return;
      }
      setSections(data);
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
    e.target.id === "first_name" && setFname(e.target.value);
    e.target.id === "last_name" && setLname(e.target.value);
    e.target.id === "email" && setEmail(e.target.value);
    e.target.id === "phone" && setPhone(e.target.value);
  }

  const handleSelectChange = e => {
    setSectionId(e.target.value);
  }

  const addStudent = async e => {
    setFnameError(error);
    setLnameError(error);
    setEmailError(error);
    setPhoneError(error);
    setSectionError(error);
    setFileError(error);
    e.preventDefault();
    const data = await addStudentApi(fname, lname, email, phone, sectionId, file);
    if (data.errors) {
      if (data.errors.first_name) {
        setFnameError({ msg: data.errors.first_name[0], status: true });
      }
      if (data.errors.last_name) {
        setLnameError({ msg: data.errors.last_name[0], status: true });
      }
      if (data.errors.email) {
        setEmailError({ msg: data.errors.email[0], status: true });
      }
      if (data.errors.phone) {
        setPhoneError({ msg: data.errors.phone[0], status: true });
      }
      if (data.errors.section_id) {
        setSectionError({ msg: "The section is required", status: true });
      }
      if (data.errors.file) {
        setFileError({ msg: data.errors.file[0], status: true });
      }
      return;
    }
    if (data.message === "Section is full") {
      setSectionError({ msg: "Section is full", status: true });
      return;
    }
    handleAddStudentSuccessModalOpen();
    setDataChange(prev => !prev);
  }

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={addStudentModal}
        onClose={handleAddStudentModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={addStudentModal}>
          <div className={classes.paper}>
            <Typography style={{ color: "#3f51b5" }} variant="h4" component="h2" gutterBottom>
              Add Student Form
          </Typography>
            <form onSubmit={addStudent}>
              <FormControl style={{ display: 'block', width: '400px', marginBottom: '20px' }} error={fnameError.status}>
                <InputLabel htmlFor="first_name">First Name</InputLabel>
                <Input
                  placeholder="e.g. john"
                  type="text"
                  required
                  style={{ width: '100%' }}
                  id="first_name"
                  value={fname}
                  onChange={handleFormChange}
                  aria-describedby="fname-text"
                />
                {fnameError.status && <FormHelperText id="fname-error-text">{fnameError.msg}</FormHelperText>}
              </FormControl>

              <FormControl style={{ display: 'block', width: '400px', marginBottom: '20px' }} error={lnameError.status}>
                <InputLabel htmlFor="last_name">Last Name</InputLabel>
                <Input
                  placeholder="e.g. doe"
                  type="text"
                  required
                  style={{ width: '100%' }}
                  id="last_name"
                  value={lname}
                  onChange={handleFormChange}
                  aria-describedby="lname-text"
                />
                {lnameError.status && <FormHelperText id="lname-error-text">{lnameError.msg}</FormHelperText>}
              </FormControl>

              <FormControl style={{ display: 'block', width: '400px', marginBottom: '20px' }} error={emailError.status}>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                  placeholder="e.g. johndoe@email.com"
                  type="email"
                  required
                  style={{ width: '100%' }}
                  id="email"
                  value={email}
                  onChange={handleFormChange}
                  aria-describedby="email-text"
                />
                {emailError.status && <FormHelperText id="email-error-text">{emailError.msg}</FormHelperText>}
              </FormControl>

              <FormControl style={{ display: 'block', width: '400px', marginBottom: '20px' }} error={phoneError.status}>
                <InputLabel htmlFor="phone">Phone</InputLabel>
                <Input
                  placeholder="e.g. 71 479 407"
                  type="text"
                  required
                  style={{ width: '100%' }}
                  id="phone"
                  value={phone}
                  onChange={handleFormChange}
                  aria-describedby="phone-text"
                />
                {phoneError.status && <FormHelperText id="phone-error-text">{phoneError.msg}</FormHelperText>}
              </FormControl>

              <FormControl className={classes.select} error={sectionError.status}>
                <InputLabel id="demo-simple-select-label">Section</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="section"
                  value={sectionId}
                  onChange={handleSelectChange}
                >
                  {sections.map((section, key) => (
                    <MenuItem key={key} value={section.id}>{section.name}</MenuItem>
                  ))}
                </Select>
                {sectionError.status && <FormHelperText id="section-error-text">{sectionError.msg}</FormHelperText>}
              </FormControl>

              <FormControl style={{ display: 'block', width: '400px', marginBottom: '20px' }} error={fileError.status}>
                <Input type="file" id="fileId" style={{ display: 'none' }}
                  onChange={(e) => {
                    setFile(e.currentTarget.files[0])
                    console.log(e.currentTarget.files[0].name);
                  }
                  }
                />
                {file && <span style={{ marginRight: 10 }}>{file.name}</span>}
                <Button
                  variant="contained"
                  color="default"
                  size="small"
                  className={classes.button}
                  startIcon={<CloudUploadIcon />}
                  onClick={() => document.getElementById('fileId').click()}
                >Upload Image</Button>
                {fileError.status && <FormHelperText id="file-error-text">{fileError.msg}</FormHelperText>}
              </FormControl>
              <Button type="submit" variant="contained" color="primary">
                Add Student
            </Button>
            </form>
          </div>
        </Fade>
      </Modal>
      {addStudentSuccessModal && <AddSuccessModal props={{
        addStudentSuccessModal,
        handleAddStudentSuccessModalClose,
        handleAddStudentModalClose
      }} />}
    </>

  )
}

export default AddModal

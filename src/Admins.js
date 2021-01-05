import React from 'react'
import Drawer from './Drawer'
import clsx from 'clsx';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteIcon from '@material-ui/icons/Delete';
import Pagination from '@material-ui/lab/Pagination';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';

const drawerWidth = 200;

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex'
  },
  button: {
    margin: theme.spacing(1),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  table: {
    minWidth: 650,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

const Admins = () => {

  const [open, setOpen] = React.useState(true);

  const [page, setPage] = React.useState(1);

  const [rows, setRows] = React.useState([]);

  const [total, setTotal] = React.useState(0);

  const [loading, setLoading] = React.useState(null);

  const [addAdminModal, setAddAdminModal] = React.useState(false);

  const [addAdminSuccessModal, setAddAdminSuccessModal] = React.useState(false);

  const [updateAdminModal, setUpdateAdminModal] = React.useState(false);

  const [updateAdminSuccessModal, setUpdateAdminSuccessModal] = React.useState(false);

  const [deleteAdminModal, setDeleteAdminModal] = React.useState(false);

  const [deleteAdminSuccessModal, setDeleteAdminSuccessModal] = React.useState(false);

  const [name, setName] = React.useState('');
  const [nameUpdate, setNameUpdate] = React.useState('');
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');

  const [email, setEmail] = React.useState('');
  const [emailUpdate, setEmailUpdate] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');

  const [password, setPassword] = React.useState('');
  const [passwordUpdate, setPasswordUpdate] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');

  const [dataChange, setDataChange] = React.useState(false);

  const [deletedId, setDeletedId] = React.useState(null);
  const [deletedName, setDeletedName] = React.useState(null);

  const [updatedId, setUpdatedId] = React.useState(null);

  React.useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/api/admins?page=${page}`);
      const data = await response.json();
      console.log(data);

      if (!active) {
        return;
      }

      // set data
      setTotal(Math.ceil(data.total / 10));
      setRows(data.data);
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [page, dataChange]);

  const classes = useStyles()

  const handelePageChange = (event, value) => {
    setPage(value);
  };

  const handleAddAdminModalOpen = () => {
    setAddAdminModal(true);
  };

  const handleAddAdminModalClose = () => {
    setAddAdminModal(false);
  };

  const handleAddAdminSuccessModalOpen = () => {
    setAddAdminSuccessModal(true);
  };

  const handleAddAdminSuccessModalClose = () => {
    setAddAdminSuccessModal(false);
  };

  const handleUpdateAdminModalOpen = () => {
    setUpdateAdminModal(true);
  };

  const handleUpdateAdminModalClose = () => {
    setUpdateAdminModal(false);
  };

  const handleUpdateAdminSuccessModalOpen = () => {
    setUpdateAdminSuccessModal(true);
  };

  const handleUpdateAdminSuccessModalClose = () => {
    setUpdateAdminSuccessModal(false);
  };

  const handleDeleteAdminModalOpen = () => {
    setDeleteAdminModal(true);
  };

  const handleDeleteAdminModalClose = () => {
    setDeleteAdminModal(false);
  };

  const handleDeleteAdminSuccessModalOpen = () => {
    setDeleteAdminSuccessModal(true);
  };

  const handleDeleteAdminSuccessModalClose = () => {
    setDeleteAdminSuccessModal(false);
  };

  const handleFormChange = (e) => {
    e.target.id === "name" && setName(e.target.value);
    e.target.id === "email" && setEmail(e.target.value);
    e.target.id === "password" && setPassword(e.target.value);
  }

  const handleFormChangeUpdate = (e) => {
    e.target.id === "name" && setNameUpdate(e.target.value);
    e.target.id === "email" && setEmailUpdate(e.target.value);
    e.target.id === "password" && setPasswordUpdate(e.target.value);
  }

  const addAdmin = async e => {
    setNameError(false);
    setEmailError(false);
    setPasswordError(false);
    setNameErrorMessage('');
    setEmailErrorMessage('');
    setPasswordErrorMessage('');
    e.preventDefault();
    const response = await fetch(`http://localhost:8000/api/admins/register`, {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify({
        name,
        email,
        password,
      })
    })
    const data = await response.json();
    console.log(data.errors);
    if (data.errors) {
      if (data.errors.name) {
        setNameError(true);
        setNameErrorMessage(data.errors.name[0]);
      }
      if (data.errors.email) {
        setEmailError(true);
        setEmailErrorMessage(data.errors.email[0]);
      }
      if (data.errors.password) {
        setPasswordError(true);
        setPasswordErrorMessage(data.errors.password[0]);
      }
      return;
    }
    handleAddAdminModalClose();
    handleAddAdminSuccessModalOpen();
    setName('');
    setEmail('');
    setPassword('');
    setDataChange(!dataChange);
  }


  const updateAdmin = async e => {
    setNameError(false);
    setEmailError(false);
    setPasswordError(false);
    setNameErrorMessage('');
    setEmailErrorMessage('');
    setPasswordErrorMessage('');
    e.preventDefault();
    const response = await fetch(`http://localhost:8000/api/admins/${updatedId}`, {
      method: "PATCH",
      headers: {
        'content-type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify({
        name: nameUpdate,
        email: emailUpdate,
        password: passwordUpdate,
      })
    })
    const data = await response.json();
    console.log(data.errors);
    if (data.errors) {
      if (data.errors.name) {
        setNameError(true);
        setNameErrorMessage(data.errors.name[0]);
      }
      if (data.errors.email) {
        setEmailError(true);
        setEmailErrorMessage(data.errors.email[0]);
      }
      if (data.errors.password) {
        setPasswordError(true);
        setPasswordErrorMessage(data.errors.password[0]);
      }
      return;
    }
    handleUpdateAdminModalClose();
    handleUpdateAdminSuccessModalOpen();
    setNameUpdate('');
    setEmailUpdate('');
    setPasswordUpdate('');
    setDataChange(!dataChange);
  }

  const deleteAdmin = async () => {
    const response = await fetch(`http://localhost:8000/api/admins/${deletedId}`, {
      method: "DELETE"
    })
    const data = await response.json();
    setDataChange(!dataChange);
    setDeletedId(null);
    setDeletedName(null);
    handleDeleteAdminModalClose();
    handleDeleteAdminSuccessModalOpen();
  }

  return (
    <div className={classes.container}>
      <Drawer view="Admins" open={[open, setOpen]} />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Button
          style={{ marginBottom: "20px" }}
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          startIcon={<AddCircleIcon />}
          onClick={handleAddAdminModalOpen}
        >
          Add Admin
      </Button>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell size="small" align="left">Name</TableCell>
                <TableCell size="small" align="left">Email</TableCell>
                <TableCell size="small" align="left">Created</TableCell>
                <TableCell size="small" align="left">Updated</TableCell>
                <TableCell size="small" align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                const created = new Date(row.created_at);
                const updated = new Date(row.updated_at);
                return (
                  <TableRow key={row.id}>
                    <TableCell size="small" align="left">
                      {row.name}
                    </TableCell>
                    <TableCell size="small" align="left">
                      {row.email}
                    </TableCell>
                    <TableCell size="small" align="left">
                      {`${created.getFullYear()}-${created.getMonth() + 1}-${created.getDate()}`}
                    </TableCell>
                    <TableCell size="small" align="left">
                      {row.created_at === row.updated_at ? 'never' : `${updated.getFullYear()}-${updated.getMonth() + 1}-${updated.getDate()}`}
                    </TableCell>
                    <TableCell size="small" align="left">
                      <Button
                        onClick={() => {
                          setUpdatedId(row.id);
                          setNameUpdate(row.name);
                          setEmailUpdate(row.email)
                          handleUpdateAdminModalOpen();
                        }}
                        variant="contained"
                        color="default"
                        className={classes.button}
                        startIcon={<UpdateIcon />}>
                        Update
                      </Button>
                      <Button
                        onClick={() => {
                          setDeletedId(row.id);
                          setDeletedName(row.name);
                          handleDeleteAdminModalOpen();
                        }}
                        variant="contained"
                        color="secondary"
                        startIcon={<DeleteIcon />}
                        className={classes.button}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ marginTop: 45, display: 'flex', justifyContent: 'center' }}>
          <Pagination color="primary" count={total} page={page} onChange={handelePageChange} />

        </div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={addAdminModal}
          onClose={handleAddAdminModalClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={addAdminModal}>
            <div className={classes.paper}>
              <Typography style={{ color: "#3f51b5" }} variant="h4" component="h2" gutterBottom>
                Add Admin Form
              </Typography>
              <form onSubmit={addAdmin}>
                <FormControl style={{ display: 'block', width: '400px', marginBottom: '20px' }} error={nameError}>
                  <InputLabel htmlFor="name">Name</InputLabel>
                  <Input
                    placeholder="e.g. john doe"
                    type="text"
                    required
                    style={{ width: '100%' }}
                    id="name"
                    value={name}
                    onChange={handleFormChange}
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
                    value={email}
                    onChange={handleFormChange}
                    aria-describedby="Email-text"
                  />
                  {emailError && <FormHelperText id="email-error-text">{emailErrorMessage}</FormHelperText>}
                </FormControl>
                <FormControl style={{ display: 'block', width: '400px', marginBottom: '20px' }} error={passwordError}>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    placeholder="e.g. 12345678"
                    type="text"
                    required
                    style={{ width: '100%' }}
                    id="password"
                    value={password}
                    onChange={handleFormChange}
                    aria-describedby="password-text"
                  />
                  {passwordError && <FormHelperText id="password-error-text">{passwordErrorMessage}</FormHelperText>}
                </FormControl>
                <Button type="submit" variant="contained" color="primary">
                  Add Admin
                </Button>
              </form>

            </div>
          </Fade>
        </Modal>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={addAdminSuccessModal}
          onClose={handleAddAdminSuccessModalClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={addAdminSuccessModal}>
            <div className={classes.paper}>
              <span style={{ marginRight: '10px' }} id="transition-modal-description">Admin Added Successfully</span>
              <Button onClick={() => { handleAddAdminSuccessModalClose() }} variant="contained" color="primary">
                Okay
                </Button>
            </div>
          </Fade>
        </Modal>
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
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={updateAdminSuccessModal}
          onClose={handleUpdateAdminSuccessModalClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={updateAdminSuccessModal}>
            <div className={classes.paper}>
              <span style={{ marginRight: '10px' }} id="transition-modal-description">Admin Updated Successfully</span>
              <Button onClick={() => { handleUpdateAdminSuccessModalClose() }} variant="contained" color="primary">
                Okay
                </Button>
            </div>
          </Fade>
        </Modal>
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
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={deleteAdminSuccessModal}
          onClose={handleDeleteAdminSuccessModalClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={deleteAdminSuccessModal}>
            <div className={classes.paper}>
              <span style={{ marginRight: '10px' }} id="transition-modal-description">Admin Deleted Successfully</span>
              <Button onClick={() => { handleDeleteAdminSuccessModalClose() }} variant="contained" color="primary">
                Okay
                </Button>
            </div>
          </Fade>
        </Modal>
      </main>
    </div>
  )
}

export default Admins

import React from 'react';
import Drawer from '../../Drawer';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Pagination from '@material-ui/lab/Pagination';
import AddModal from './modals/AddModal'
import AddSuccessModal from './modals/AddSuccessModal'
import UpdateModal from './modals/UpdateModal'
import UpdateSuccessModal from './modals/UpdateSuccessModal'
import DeleteModal from './modals/DeleteModal'
import DeleteSuccessModal from './modals/DeleteSuccessModal'
import { getAllAdminsApi, addAdminApi, updateAdminApi, deleteAdminApi , searchAdminsApi } from './api/api'
import Row from './Row';
import Search from './Search';

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
}))

const Admins = () => {

  const [open, setOpen] = React.useState(true);

  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState('');
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
      if (search) {
        const data = await searchAdminsApi(search);
        setRows([...data]);
        setLoading(false);
      } else {
        const data = await getAllAdminsApi(page);
        setTotal(Math.ceil(data.total / 10));
        setRows(data.data);
        setLoading(false);
      }
      if (!active) {
        return;
      }
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
    setNameError(false);
    setNameErrorMessage('');
    setEmailError(false);
    setEmailErrorMessage('');
    setPasswordError(false);
    setPasswordErrorMessage('');
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
    setNameError(false);
    setNameErrorMessage('');
    setEmailError(false);
    setEmailErrorMessage('');
    setPasswordError(false);
    setPasswordErrorMessage('');
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
    e.preventDefault()
    const data = await addAdminApi(name, email, password);
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
    const data = await updateAdminApi(updatedId, nameUpdate, emailUpdate, passwordUpdate);
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
    setUpdatedId(null);
    setNameUpdate('');
    setEmailUpdate('');
    setPasswordUpdate('');
    setDataChange(!dataChange);
  }

  const deleteAdmin = async () => {
    await deleteAdminApi(deletedId);
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
                {['Name', 'Email', 'Created', 'Updated'].map((cell, key) => (
                  <TableCell key={key} size="small" align="left">{cell}</TableCell>
                ))}
                <TableCell size="small" align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, key) =>
                <Row key={key} props={
                  {
                    row,
                    setUpdatedId,
                    setNameUpdate,
                    setEmailUpdate,
                    handleUpdateAdminModalOpen,
                    setDeletedId,
                    setDeletedName,
                    handleDeleteAdminModalOpen,
                  }
                } />
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ marginTop: 45, display: 'flex', justifyContent: 'center' }}>
          {loading && <p>Loading...</p>}
          {rows.length > 0 && <Pagination color="primary" count={total} page={page} onChange={handelePageChange} />}

        </div>
        <AddModal props={{
          name,
          addAdminModal,
          handleAddAdminModalClose,
          addAdmin,
          handleFormChange,
          nameError,
          nameErrorMessage,
          emailError,
          email,
          emailErrorMessage,
          passwordError,
          passwordErrorMessage,
          password
        }}
        />
        <AddSuccessModal props={{
          addAdminSuccessModal,
          handleAddAdminSuccessModalClose,
        }} />
         <Search search={search} setSearch={setSearch} setDataChange={setDataChange}
        dataChange={dataChange}
          />
        <UpdateModal props={{
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
        }} />
        <UpdateSuccessModal props={{
          updateAdminSuccessModal,
          handleUpdateAdminSuccessModalClose,
        }} />
        <DeleteModal props={{
          deleteAdminModal,
          handleDeleteAdminModalClose,
          deletedName,
          deleteAdmin
        }} />
        <DeleteSuccessModal props={{
          deleteAdminSuccessModal,
          handleDeleteAdminSuccessModalClose
        }} />
      </main>
    </div>
  )
}

export default Admins

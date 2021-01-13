import React, { useState, useEffect } from 'react';
import Drawer from '../../Drawer';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Pagination from '@material-ui/lab/Pagination';
import Row from './Row';
import { getAllClassesPagApi , addClassApi , updateClassApi ,deleteClassApi } from './api/api';
import AddModal from './modals/AddModal'
import UpdateModal from './modals/UpdateModal'
import UpdateSuccessModal from './modals/UpdateSuccessModal'
import DeleteModal from './modals/DeleteModal'
import DeleteSuccessModal from './modals/DeleteSuccessModal'
import AddSuccessModal from './modals/AddSuccessModal'

const drawerWidth = 200;

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex'
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
  button: {
    margin: theme.spacing(1),
  },
  table: {
    minWidth: 650,
  },
}))

const Classes = () => {
  const classes = useStyles()
  const [open, setOpen] = useState(true);
  const [status, setStatus] = useState('');
  const [shown, setShown] = useState(false);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [dataChange, setDataChange] = useState(true);
  const [addClassModal, setAddClassModal] = useState(false);
  const [addClassSuccessModal, setAddClassSuccessModal] = React.useState(false);
  const [updateClassModal, setUpdateClassModal] = React.useState(false);
  const [updateClassSuccessModal, setUpdateClassSuccessModal] = React.useState(false);
  const [deleteClassModal, setDeleteClassModal] = React.useState(false);
  const [deleteClassSuccessModal, setDeleteClassSuccessModal] = React.useState(false);
  const [name, setName] = React.useState('');
  const [nameUpdate, setNameUpdate] = React.useState('');
  const [deletedName, setDeletedName] = React.useState(null);
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [updatedId, setUpdatedId] = React.useState(null);
  const [deletedId, setDeletedId] = React.useState(null);
  

   

  const handleAddClassModalClose = () => {
    setAddClassModal(false);
    setNameError(false);
    setNameErrorMessage('');
  };

  const handleAddClassSuccessModalOpen = () => {
    setAddClassSuccessModal(true);
  };
  
  const handleFormChange = (e) => {
    e.target.id === "name" && setName(e.target.value);
  }

  const addClass = async e => {
    setNameError(false);
    setNameErrorMessage('');
    e.preventDefault();
    const data = await addClassApi(name);
    if (data.errors) {
      if (data.errors.name) {
        setNameError(true);
        setNameErrorMessage(data.errors.name[0]);
      }
      return;
    }
    handleAddClassModalClose();
    handleAddClassSuccessModalOpen();
    setName('');
    setDataChange(!dataChange);
  }

  const handleAddClassSuccessModalClose = () => {
    setAddClassSuccessModal(false);
  };


  const handleUpdateClassModalOpen = () => {
    setUpdateClassModal(true);
  };

  const handleUpdateClassModalClose = () => {
    setUpdateClassModal(false);
    setNameError(false);
    setNameErrorMessage('');
  };

  const handleUpdateClassSuccessModalOpen = () => {
    setUpdateClassSuccessModal(true);
  };

  const handleDeleteClassModalOpen = () => {
    setDeleteClassModal(true);
  };

  const handleUpdateClassSuccessModalClose = () => {
    setUpdateClassSuccessModal(false);
  };

  const handleFormChangeUpdate = (e) => {
    e.target.id === "name" && setNameUpdate(e.target.value);
  }

  const updateClass = async e => {
    e.preventDefault();
    setNameError(false);
    setNameErrorMessage('');
    const data = await updateClassApi(updatedId, nameUpdate);
    if (data.errors) {
      if (data.errors.name) {
        setNameError(true);
        setNameErrorMessage(data.errors.name[0]);
      }
      return;
    }
    handleUpdateClassModalClose();
    handleUpdateClassSuccessModalOpen();
    setUpdatedId(null);
    setNameUpdate('');
    setDataChange(!dataChange);
  }
  const handleDeleteClassModalClose = () => {
    setDeleteClassModal(false);
  };

  const handleDeleteClassSuccessModalOpen = () => {
    setDeleteClassSuccessModal(true);
  };
  const handleDeleteClassSuccessModalClose = () => {
    setDeleteClassSuccessModal(false);
  };

  const deleteClass = async () => {
    const data = await deleteClassApi(deletedId);
    if (data.message)
    {
      setShown(true);
      setStatus(data.message);
      console.log(status);
      setDataChange(!dataChange);
      handleDeleteClassModalClose();
      handleDeleteClassSuccessModalOpen();
      return;
    }
    setDeletedId(null);
    setDeletedName(null);
    handleDeleteClassModalClose();
    handleDeleteClassSuccessModalOpen();
  }

    useEffect(() => {
      let active = true;
      (async () => {
        setLoading(true);
        const data = await getAllClassesPagApi(page);
        if (!active) {
          return;
        }
        setTotal(Math.ceil(data.total / 10));
        setRows(data.data);
        setLoading(false);
      })();

      return () => {
        active = false;
      };
    }, [page, dataChange]);


    return (
      <div className={classes.container}>
        <Drawer view="Classes" open={[open, setOpen]} />
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
            onClick={() => setAddClassModal(true)}
          >
            Add Class
      </Button>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {['Name', 'Created', 'Updated'].map((cell, key) => (
                    <TableCell key={key} size="small" align="left">{cell}</TableCell>
                  ))}
                  <TableCell size="small" align="left"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, key) =>
                  <Row key={key} props={{
                    row,
                    updateClass,
                    setUpdatedId,
                    setNameUpdate,
                    handleUpdateClassModalOpen,
                    deleteClass,
                    setDeletedId,
                    setDeletedName,
                    handleDeleteClassModalOpen,
                  }} />
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <AddModal props={{
            name,
            addClassModal,
            handleAddClassModalClose,
            addClass,
            handleFormChange,
            nameError,
            nameErrorMessage,
          }}
          />
          <AddSuccessModal props={{
            addClassSuccessModal,
            handleAddClassSuccessModalClose,
          }} />
          <UpdateModal props={{
            updateClassModal,
            updateClass,
            handleUpdateClassModalClose,
            nameError,
            nameUpdate,
            handleFormChangeUpdate,
            nameErrorMessage,
            nameUpdate,
            updatedId
          }} />
          <UpdateSuccessModal props={{
            updateClassSuccessModal,
            handleUpdateClassSuccessModalClose
          }} />
              <DeleteModal props={{
          deleteClassModal,
          handleDeleteClassModalClose,
          deletedName,
          deleteClass
        }} />
        <DeleteSuccessModal props={{
          deleteClassSuccessModal,
            handleDeleteClassSuccessModalClose,
            status,
            shown
        }} />
          <div style={{ marginTop: 45, display: 'flex', justifyContent: 'center' }}>
            {loading && <p>Loading...</p>}
            {rows.length > 0 && <Pagination color="primary" count={total} page={page} onChange={(e, value) => setPage(value)} />}
          </div>
        </main>
      </div>
    )
  }


export default Classes

import React, { useState, useEffect } from 'react'
import Drawer from '../../Drawer'
import clsx from 'clsx';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Pagination from '@material-ui/lab/Pagination';
import Row from './Row';
import { getAllSectionsPagApi , searchSectionsApi } from './api/api'
import AddModal from './modals/AddModal'
import DeleteModal from './modals/DeleteModal'
import UpdateModal from './modals/UpdateModal'
import { makeStyles } from '@material-ui/core/styles'
import Search from './Search';

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

const Sections = () => {
  const classes = useStyles()
  const [open, setOpen] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const [rows, setRows] = useState([]);

  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(null);

  const [dataChange, setDataChange] = React.useState(false);

  const [addSectionModal, setAddSectionModal] = useState(false);

  const [updateSectionModal, setUpdateSectionModal] = useState(false);

  const [updateSectionSuccessModal, setUpdateSectionSuccessModal] = useState(false);

  const [deleteSectionModal, setDeleteSectionModal] = useState(false);

  const [deletedId, setDeletedId] = React.useState(null);
  const [deletedName, setDeletedName] = React.useState(null);

  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      if (search) {
        const data = await searchSectionsApi(search);
        setRows([...data]);
        setLoading(false);
      } else {
        const data = await getAllSectionsPagApi(page);
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

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleAddSectionModalOpen = () => {
    setAddSectionModal(true);
  }

  const handleAddSectionModalClose = () => {
    setAddSectionModal(false);
  }

  const handleUpdateSectionModalOpen = () => {
    setUpdateSectionModal(true);
  }

  const handleUpdateSectionModalClose = () => {
    setUpdateSectionModal(false);
  }

  const handleDeleteSectionModalOpen = () => {
    setDeleteSectionModal(true);
  }

  const handleDeleteSectionModalClose = () => {
    setDeleteSectionModal(false);
  }

  return (
    <div className={classes.container}>
      <Drawer view="Sections" open={[open, setOpen]} />
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
          onClick={handleAddSectionModalOpen}
        >
          Add Section
        </Button>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                {['Section', 'Number of Students', 'Class','created_at','updated_at'].map((cell, key) => (
                  <TableCell style={{ fontSize: 12 }} key={key} size="small" align="left">{cell}</TableCell>
                ))}
                <TableCell size="small" align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, key) =>
                <Row key={key} props={{
                  row,
                  setDeletedId,
                  setDeletedName,
                  setUpdateId,
                  handleDeleteSectionModalOpen,
                  handleUpdateSectionModalOpen
                }} />
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ marginTop: 45, display: 'flex', justifyContent: 'center' }}>
          {loading && <p>Loading...</p>}
          {rows.length > 0 && <Pagination color="primary" count={total} page={page} onChange={handlePageChange} />}

        </div>
        {addSectionModal && <AddModal props={{
          addSectionModal,
          handleAddSectionModalClose,
          setDataChange
        }} />}
           <Search search={search} setSearch={setSearch} setDataChange={setDataChange}
        dataChange={dataChange}
          />
        {updateSectionModal && <UpdateModal props={{
          updateSectionModal,
          handleUpdateSectionModalClose,
          updateId,
          setDataChange
        }} />}
        {deleteSectionModal && <DeleteModal props={{
          deleteSectionModal,
          handleDeleteSectionModalClose,
          deletedId,
          deletedName,
          setDataChange,
          length: rows.length,
          setPage
        }} />}
      </main>
    </div>
  )
}

export default Sections

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
import { getAllClassesApi } from './api/api';


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
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [dataChange, setDataChange] = useState(true);
  const [addClassModal, setAddClassModal] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      const data = await getAllClassesApi(page);
      if (!active) {
        return;
      }
      console.log(data);
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
                  row
                }} />
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ marginTop: 45, display: 'flex', justifyContent: 'center' }}>
          {loading && <p>Loading...</p>}
          {rows.length > 0 && <Pagination color="primary" count={total} page={page} onChange={(e, value) => setPage(value)} />}

        </div>
      </main>
    </div>
  )
}

export default Classes

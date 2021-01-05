import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteIcon from '@material-ui/icons/Delete';

const TableRows = ({ props }) => {
  const { row, setUpdatedId, setNameUpdate, setEmailUpdate, handleUpdateAdminModalOpen, setDeletedId, setDeletedName, handleDeleteAdminModalOpen } = props;
  const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
  }))
  const classes = useStyles()

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
}

export default TableRows

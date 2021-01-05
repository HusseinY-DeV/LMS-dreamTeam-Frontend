import React from 'react'
import Drawer from './Drawer'
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles'

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
}))

const Section = () => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(true);
  return (
    <div className={classes.container}>
      <Drawer view="Sections" open={[open, setOpen]} />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Typography paragraph>
          Sections goes here
        </Typography>
      </main>
    </div>
  )
}

export default Section

import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Drawer as MUIDrawer } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withRouter } from 'react-router-dom'
import DashboardIcon from '@material-ui/icons/Dashboard';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ClassIcon from '@material-ui/icons/Class';
import ViewQuiltIcon from '@material-ui/icons/ViewQuilt';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(3),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'center',
  },
}))

const Drawer = props => {
  const { history } = props
  const classes = useStyles()
  const theme = useTheme();
  const [open, setOpen] = props.open
  const view = props.view

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const listItems = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon />,
      onClick: () => history.push('/dashboard'),
    },
    {
      text: 'Admins',
      icon: <SupervisorAccountIcon />,
      onClick: () => history.push('/admins')
    },
    {
      text: 'Classes',
      icon: <ClassIcon />,
      onClick: () => history.push('/classes')
    },
    {
      text: 'Sections',
      icon: <ViewQuiltIcon />,
      onClick: () => history.push('/sections')
    },
    {
      text: 'Students',
      icon: <AccessibilityIcon />,
      onClick: () => history.push('/students')
    },
    {
      text: 'Reports',
      icon: <AssessmentIcon />,
      onClick: () => history.push('/reports')
    },
  ]

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {view}
          </Typography>
        </Toolbar>
      </AppBar>
      <MUIDrawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <MenuIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <List>
          {listItems.map(({ text, icon, onClick }, key) => {
            return (
              <ListItem button key={key} onClick={onClick}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            )
          })}
        </List>
        <Divider />
        <List>
          <ListItem button key={'Logout'}>
            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
            <ListItemText primary={'Logout'} />
          </ListItem>
        </List>
      </MUIDrawer>
    </div>
  );
}

export default withRouter(Drawer)
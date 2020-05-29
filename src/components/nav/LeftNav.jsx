'use strict';
//material-ui
import { Drawer, makeStyles, CssBaseline, List, ListItem, ListItemIcon, ListItemText, Icon }from '@material-ui/core';

//local
import CharacterHelper from '../../helpers/CharacterHelper';

//react
import React from 'react';
import { Link } from 'react-router-dom'

//---------------------------------end imports---------------------------------


//import { strict } from 'assert';
//import { NONAME } from 'dns';
const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    height: '100%',
    padding: '10px',
    color: 'rgba(255,255,255)',
    backgroundColor: 'rgba(75, 75, 75, 0.05)',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },
  aLink: {
    textDecoration: 'none',
  }
}));
//    drawer right below titlebar
//    height: `calc(100% - 28px)`,

export default function PermanentDrawerLeft() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="top"
      >
        <div className={classes.toolbar} />
        <List>
            <ListItem button key="Authorize" onClick={CharacterHelper.addCharacter}>
                <ListItemIcon> <Icon className="material-icons">person_add</Icon></ListItemIcon>
                <ListItemText primary="Authorize" />
            </ListItem> 
            <ListItem button key="Overview" component={Link} to={'/'}>
              <ListItemIcon> <Icon className="material-icons">assignment</Icon></ListItemIcon>
              <ListItemText primary="Overview" />
            </ListItem> 
            <ListItem button key="Skill Farm" component={Link} to={'/sp-farming'}>
              <ListItemIcon> <Icon className="material-icons">school</Icon></ListItemIcon>
              <ListItemText primary="Skill Farm" />
            </ListItem> 
            <ListItem button key="Contracts" component={Link} to={'/contracts'}>
              <ListItemIcon> <Icon className="material-icons">assignment_turned_in</Icon></ListItemIcon>
              <ListItemText primary="Contracts" />
            </ListItem> 
        </List>
      </Drawer>
    </div>
  );
}
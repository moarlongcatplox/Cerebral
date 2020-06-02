'use strict';
//material-ui
import { List, ListItem, ListItemIcon, ListItemText, IconButton, Dialog, Button, Icon, Select, TextField, MenuItem, FormControl, InputLabel, DialogActions, DialogTitle, DialogContent} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

//local
import Character from '../../models/Character';
import FarmHelper from '../../helpers/FarmHelper';

//react
import React from 'react';

//---------------------------------end imports---------------------------------


const useStyles = makeStyles((theme) => ({
        addFarmButton: {
            margin: '20px 0 20px 20px',
            position: 'absolute',
            left: -10,
            top: 200,
            zIndex: 1200,
            width: '200px'
        },
        closeIcon: {
            cursor:'pointer',
            position: 'absolute',
            right: 1,
            top: 1,
        },
        addFarmForm: {
            marginTop: theme.spacing(2),
            borderColor: 'green',
        }
  }));
  
export default function FormDialog() {
    const classes = useStyles();
    //form field default states
    const [open, setOpen] = React.useState(false);
    const [characterValue, setCharacterValue] = React.useState('');
    const [accountValue, setAccountValue] = React.useState('');
    const [baseSpValue, setBaseSp] = React.useState('5000000');

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //form field handlers, removes the need for this.nonsense
  const handleCharacterChange = (event) => {
    setCharacterValue(event.target.value);
  };
  const handleAccountChange = (event) => {
    setAccountValue(event.target.value);
  };
  const handleBaseSpChange = (event) => {
    setBaseSp(event.target.value);
  };
  //adds character with selected fields to SP farm
  const handleCharacterAdd = (event) => {
    if ((typeof characterValue !== 'string') || (characterValue === '') || (baseSpValue === '' || (accountValue === ''))) {
        alert("Failed to add/update farm, please ensure you filled out the form correctly and try again");
    } else {
        if (typeof baseSpValue === 'string') {
            FarmHelper.addFarm(characterValue, accountValue, parseInt(baseSpValue));
            handleClose();
        } else if (baseSpValue === 'number') {
            FarmHelper.addFarm(characterValue, accountValue, baseSpValue);
            handleClose();
        } else {
            alert("Failed to add/update farm, please ensure you filled out the form correctly and try again");
        }
    };
}
//cheap hack below to put the "Manage Farm" button on the leftnav bar.
  return (
    <div>
      <div className={classes.addFarmButton}>
          <List >
            <ListItem button key="Authorize" onClick={handleClickOpen}>
                <ListItemIcon> <Icon>person_add</Icon></ListItemIcon>
                <ListItemText primary="Manage Farm" />
            </ListItem> 
          </List>
      </div>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth>
      <DialogTitle id="form-dialog-title">
                <div>Add Character to SP Farm <IconButton className={classes.closeIcon} onClick={handleClose}><Icon>close</Icon></IconButton></div>
            </DialogTitle>
        <DialogContent>
          
          <FormControl variant="outlined" fullWidth >
                <InputLabel>Character</InputLabel>
                <Select
                    label="Character"
                    autoWidth
                    value={characterValue}
                    onChange={handleCharacterChange}
                    MenuProps={{
                        getContentAnchorEl: null,
                        anchorOrigin: {
                          vertical: "center",
                          horizontal: "center",
                        }
                      }}
                >
                    {Object.values(Character.getAll()).sort((a, b) => b.getTotalSp() - a.getTotalSp()).map(character => {
                        return (<MenuItem key={character.id} value={character.id}>{character.name}</MenuItem>)
                    })}
                </Select>
            </FormControl>
            <FormControl className={classes.addFarmForm} fullWidth>
                <TextField
                    //Account Name goes here
                    label="Account Name"
                    variant="outlined"
                    value={accountValue}
                    onChange={handleAccountChange}
                />
            </FormControl>
            <FormControl className={classes.addFarmForm} >
                <TextField
                    label="Base Character SP"
                    variant="outlined"
                    type="number"
                    value={baseSpValue}
                    onChange={handleBaseSpChange}
                />
            </FormControl>

        </DialogContent>
        <DialogActions>
            <Button label="Cancel" onClick={handleClose}>Cancel</Button>
            <Button label="Add" onClick={handleCharacterAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
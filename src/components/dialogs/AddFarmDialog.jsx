'use strict';
//material-ui
import { IconButton, Dialog, Button, Icon, Select, TextField, MenuItem, FormControl, InputLabel, DialogActions, DialogTitle, DialogContent} from '@material-ui/core';

//local
import Character from '../../models/Character';
import FarmHelper from '../../helpers/FarmHelper';

//react
import React from 'react';

//---------------------------------end imports---------------------------------


const styles = {
    addFarmButton: {
        margin: '20px 0 20px 20px',
        position: 'absolute',
        left: -10,
        top: 200,
        zIndex: 1200,
    },
    closeIcon: {
        cursor:'pointer',
        position: 'absolute',
        right: 1,
        top: 1,
    },
    addFarmDialog: {
        width: 350
    },
    addFarmForm: {
        margin: '15px'
    }
};

export default class AddFarmDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            characterValue: 0,
            accountName: ' ',
            baseSpValue: 5000000
        };
    }

    handleCharacterChange(e) {
        this.setState({characterValue: e.target.value});
    }

    handleBaseSpChange(e) {
        this.setState({baseSpValue: e.target.value});
    }

    //Attempt at adding account name box information
    handleAccountChange(e){
        this.setState({accountName: e.target.value})
    }

    handleOpen(e) {
        this.setState({open: true});
    };

    handleClose(e) {
        this.setState({
            open: false,
            characterValue: 0,
            //leave accountName the same so it's already populated when/if a new character is added
            //accountName: '',
            baseSpValue: 5000000
        });
    };

    //TODO add error handling for improper account names (sorta done)
    handleAdd(e) {
        if ((typeof this.state.characterValue !== 'string') || (this.state.characterValue === '') || (this.state.baseSpValue === '' || (this.state.accountName === ''))) {
            alert("Failed to add/update farm, please ensure you filled out the form correctly and try again");
        } else {
            if (typeof this.state.baseSpValue === 'string') {
                FarmHelper.addFarm(this.state.characterValue, this.state.accountName, parseInt(this.state.baseSpValue));
                this.handleClose(e);
            } else if (typeof this.state.baseSpValue === 'number') {
                FarmHelper.addFarm(this.state.characterValue, this.state.accountName, this.state.baseSpValue);
                this.handleClose(e);
            } else {
                alert("Failed to add/update farm, please ensure you filled out the form correctly and try again");
            }
        }
    };

    render() {
    return (
        <div>
            <Button variant="contained" style={styles.addFarmButton}
                label="Add/Update Farm"
                onClick={(e) => this.handleOpen(e)}
                style={styles.addFarmButton}
            >
            <Icon>note_add</Icon> Add/Update Farm
            </Button>

            <Dialog
                title="Add Character as SP Farm"
                open={this.state.open}
                onClose={(e) => this.handleClose(e)}
                fullWidth = {true}
       
            >
            <DialogTitle>
                <div>Add Farm <IconButton style={styles.closeIcon} onClick={() => this.setState({ open: false })}><Icon>close</Icon></IconButton></div>
            </DialogTitle>

            <FormControl variant="outlined" style={styles.addFarmForm} >
                <InputLabel>Character</InputLabel>
                <Select
                    label="Character"
                    value={this.state.characterValue}
                    onChange={(e) => this.handleCharacterChange(e)}
                >
                    {Object.values(Character.getAll()).sort((a, b) => b.getTotalSp() - a.getTotalSp()).map(character => {
                        return (<MenuItem key={character.id} value={character.id}>{character.name}</MenuItem>)
                    })}
                </Select>
            </FormControl>
            <FormControl style={styles.addFarmForm}>
                <TextField
                    //Account Name goes here
                    label="Account Name"
                    variant="outlined"
                    value={this.state.accountName}
                    onChange={(e) => this.handleAccountChange(e)}
                                        
                />
            </FormControl>
            <FormControl style={styles.addFarmForm}>
                <TextField
                    label="Base Character SP"
                    variant="outlined"
                    type="number"
                    value={this.state.baseSpValue}
                    onChange={(e) => this.handleBaseSpChange(e)}
                />
            </FormControl>
                <DialogActions>
                    <Button label="Cancel" primary={true} onClick={(e) => this.handleClose(e)}>Cancel</Button>
                    <Button label="Add" primary={true} onClick={(e) => this.handleAdd(e)}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
    }
}
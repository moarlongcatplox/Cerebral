'use strict';
//material-ui
import { Dialog, Button, Icon, Select, TextField, MenuItem} from '@material-ui/core';

//local
import Character from '../../models/Character';
import FarmHelper from '../../helpers/FarmHelper';

//react
import React from 'react';

//---------------------------------end imports---------------------------------


const styles = {
    addFarmButton: {
        margin: '20px 0 20px 20px'
    },
    addFarmDialog: {
        width: 350
    }
};

export default class AddFarmDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            characterValue: 0,
            accountName: '',
            baseSpValue: 5000000
        };
    }

    handleCharacterChange(e, i, v) {
        this.setState({characterValue: v});
    }

    handleBaseSpChange(e, v) {
        this.setState({baseSpValue: v});
    }

    
    //Attempt at adding account name box information
    handleAccountChange(e, v){
        this.setState({accountName: v})
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
        const actions = [
            <Button
                label="Cancel"
                primary={true}
                onClick={(e) => this.handleClose(e)}
            />,
            <Button
                label="Add"
                primary={true}
                onClick={(e) => this.handleAdd(e)}
            />,
        ];

        return (
            <div>
                <Button variant="contained"
                    label="Add/Update Farm"
                    onClick={(e) => this.handleOpen(e)}
                    style={styles.addFarmButton}
                    icon={<Icon className="material-icons">note_add</Icon>}
                />

                <Dialog
                    title="Add Character as SP Farm"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={(e) => this.handleClose(e)}
                    contentStyle={styles.addFarmDialog}
                >
                    <Select
                        floatingLabelText="Character"
                        value={this.state.characterValue}
                        onChange={(e, i, v) => this.handleCharacterChange(e, i, v)}
                    >
                        {Object.values(Character.getAll()).sort((a, b) => b.getTotalSp() - a.getTotalSp()).map(character => {
                            return (<MenuItem key={character.id} value={character.id} primaryText={character.name} />)
                        })}
                    </Select>
                    
                    
                    <TextField
                        //Account Name goes here
                        floatingLabelText="Account Name"
                        type="text"
                        value={this.state.accountName}
                        onChange={(e, v) => this.handleAccountChange(e, v)}
                                            
                    />

                    <TextField
                        type="number"
                        value={this.state.baseSpValue}
                        floatingLabelText="Base Character SP"
                        onChange={(e, v) => this.handleBaseSpChange(e, v)}
                    />
                </Dialog>
            </div>
        );
    }
}
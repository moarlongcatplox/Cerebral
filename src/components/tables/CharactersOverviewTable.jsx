'use strict';
//material-ui
import { Box, Grid, Paper, Icon } from '@material-ui/core';
import {red, green, lightBlue} from '@material-ui/core/colors';
const red500=red[500];
const greenA200=green['A200'];
const lightBlueA200=lightBlue['A200'];

//local
import Character from '../../models/Character';
import DateTimeHelper from '../../helpers/DateTimeHelper';
import AuthorizedCharacter from '../../models/AuthorizedCharacter';

//react
import React from 'react';
import { Link } from 'react-router-dom'

//---------------------------------end imports---------------------------------


const styles = {
    characterGrid: {
        textDecoration: 'none',
        flexGrow: '0',
        minWidth: '850px',
        padding: '3px',
    },
    characterPaper: {
        backgroundColor: 'rgba(75, 75, 75, 0.7)',
        height: '45px',
      
    },
    characterStatusCell: {
        width: 40, 
        paddingLeft: 5, 
        paddingRight: 0
    },
    characterNameCell: {
        color: 'rgb(230, 230, 230)',
        width: 330,
        fontSize: 'small',
    },
    characterBalanceCell: {
        color: 'rgb(230, 230, 230)',
        width: 170,
        fontSize: 'small',
    },
    characterSkillCell: {
        color: 'rgb(230, 230, 230)',
        fontSize: 'small',
        width: 300,
    },


};

export default class CharactersOverviewTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            characters: Object.values(Character.getAll()).sort((a, b) => b.getTotalSp() - a.getTotalSp()),
            ticking: true
            
        };
    }

    componentDidMount() {
            this.timerId = setInterval(
            () => this.tick(),
            1000
        );
        this.subscriberId = Character.subscribe(this);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
        Character.unsubscribe(this.subscriberId);
    }

    tick() {
        if (this.state.ticking) {
            this.forceUpdate();
        }
    }
    
    render() {
        return (
        <Grid container spacing={1} direction="column" justify="space-evenly" alignItems="flex-start">
            {this.state.characters.map(char => {
                const currentSkill = char.getCurrentSkill();
                const auth = AuthorizedCharacter.get(char.id);
                // switched to grids and boxes to get rid of the billion nested tables.
                // TODO would really like to make the Paper elements elevate when mouseover'd
                // to indicate that clicking takes you to the character's summary page.
                return (
                        <Grid item xs={12} key={char.id} component={Link} to={'/characters/' + char.id} style={styles.characterGrid}>
                        <Paper style={styles.characterPaper}>
                        <Box display="flex" flexDirection="row" paddingTop="5px">
                            <Box style={styles.characterStatusCell}>
                                <Icon style={{marginTop: 5}}>{auth.lastRefresh.success !== false ? 'check' : 'warning'}</Icon>
                            </Box>
                            <Box style={styles.characterNameCell}>
                                {char.name} <span style={{fontSize: '8px'}}> {char.id}</span><br/>
                                {char.corporation.name} / {char.alliance_id !== undefined ? char.alliance.name : "N/A"}
                            </Box>
                            <Box style={styles.characterBalanceCell}>
                                {char.balance.toLocaleString(navigator.language, {maximumFractionDigits: 2})} ISK<br/>
                                {char.getTotalSp().toLocaleString(navigator.language, {maximumFractionDigits: 0})} SP
                            </Box>
                            <Box style={styles.characterSkillCell}>
                                {currentSkill !== undefined ? `${currentSkill.skill_name} ${currentSkill.finished_level}` : "Not Training"}<br/>
                                {currentSkill !== undefined ? DateTimeHelper.timeUntil(new Date(currentSkill.finish_date)) : ""}
                            </Box>
                        </Box>
                        </Paper>
                        </Grid>
                    );
                })}
        </Grid> 
    )}
}

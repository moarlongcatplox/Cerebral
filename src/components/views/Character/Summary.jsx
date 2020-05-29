'use strict';
//material-ui
import { Card, CardHeader, CardContent, Icon, Box, Grid, Paper } from '@material-ui/core';
import { deepOrange, lightBlue} from '@material-ui/core/colors';
const deepOrange400 = deepOrange[400];
const lightBlue400 = lightBlue[400];

//local
import CharacterModel from '../../../models/Character';
import AuthorizedCharacter from '../../../models/AuthorizedCharacter';
import DateTimeHelper from '../../../helpers/DateTimeHelper';

//react
import React from 'react';

//---------------------------------end imports---------------------------------

const styles = {
    cardDiv: {
        width: '50%',
        float: 'left'
    },
    card: {
        margin: 10,
        backgroundColor: 'rgba(75, 75, 75, 0.5)',
        fontSize: '10px',
    },
    cardTextDiv: {
        padding:'12px',
        color: 'rgb(245, 245, 245)',
        fontSize: '13px',
    },
    scopeIcons: {
        fontSize: 14
    },
    summaryText: {
        fontSize: "12px",
        marginTop: "0",
    },
    characterNameCell: {
        color: 'rgb(255, 255, 255)',
        width: 650,
        fontSize: '22px',
    },
    characterSpCell: {
        color: 'rgb(255, 255, 255)',
        width: 500,
        fontSize: '16px',
        textAlign: 'right',
    },
    characterDetailTitleCell: {
        color: 'rgb(245, 245, 245)',
        width: '175px',
        fontSize: '13px',
        fontStyle: 'bold'
    },
    characterDetailCell: {
        color: 'rgb(245, 245, 245)',
        width: '300px',
        fontSize: '13px',
    },
    characterDetailList: {
        color: 'rgb(245, 245, 245)',
        fontSize: '13px',
        width: '159px',
    },
    

};
    export default class Summary extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount(){
        //clears redirect path
        this.setState({redirectPath: undefined});
    }

    render() {
        const char = CharacterModel.get(this.props.characterId);
        const auth = AuthorizedCharacter.get(this.props.characterId);
        const authStatus = (auth.lastRefresh.success !== false) || (auth.lastRefresh.shouldRetry !== false);
        const cloneJumpAvailable = char.getCloneJumpAvailable();
        const fatigue = char.getFatigueInfo();

                // Holy Boxes, Batman!
                // Boxes are laid out because tables are frustrating.
                // Each "row" consists of a characterDetailTitleCell box which contains the name of the attribute
                // and a characterDetailCell which contains the actual item pulled from the api.
        return (
            <div>
                <div style={styles.cardDiv}>
                    <Card style={styles.card}>
                        <CardContent style={styles.cardTextDiv}>
                        <Box display="flex" flexDirection="row">
                            <Box style={styles.characterNameCell}>{char.name} <span style={{fontSize: '8px'}}> {char.id} </span></Box>
                            <Box style={styles.characterSpCell}>{char.getTotalSp().toLocaleString(navigator.language, { minimumFractionDigits: 0 }) + ' SP'}</Box>
                        </Box>
                        <Box display = "flex" flexDirection="row">
                            <Box style={styles.characterDetailTitleCell}>Date of Birth:</Box>
                            <Box style={styles.characterDetailCell}>{char.getDateOfBirth().toLocaleString(navigator.language)}</Box>
                        </Box>
                        <Box display = "flex" flexDirection="row">
                            <Box style={styles.characterDetailTitleCell}>Security Status:</Box>
                            <Box style={styles.characterDetailCell}> {char.security_status.toLocaleString(navigator.language, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Box>
                        </Box>
                        <Box display = "flex" flexDirection="row">
                            <Box style={styles.characterDetailTitleCell}>Wallet Balance:</Box>
                            <Box style={styles.characterDetailCell}> {char.balance.toLocaleString(navigator.language, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ISK</Box>
                        </Box>
                        <Box display = "flex" flexDirection="row">
                            <Box style={styles.characterDetailTitleCell}>Corporation:</Box>
                            <Box style={styles.characterDetailCell}> {char.corporation.name}</Box>
                        </Box>
                        <Box display = "flex" flexDirection="row">
                            <Box style={styles.characterDetailTitleCell}>Alliance:</Box>
                            <Box style={styles.characterDetailCell}> {char.alliance !== undefined ? char.alliance.name : 'N/A'}</Box>
                        </Box>
                        <Box display = "flex" flexDirection="row">
                            <Box style={styles.characterDetailTitleCell}>Home Location:</Box>
                            <Box style={styles.characterDetailCell}>{char.home_location.location !== undefined ?
                                    `${char.home_location.location.name} (${char.home_location.location.type.name})` : 'Unknown Structure'}</Box>
                        </Box>
                        <Box display = "flex" flexDirection="row">
                            <Box style={styles.characterDetailTitleCell}>Current Location:</Box>
                            <Box style={styles.characterDetailCell}>{char.location.system.name} ({char.location.hasOwnProperty('location') ?
                                        `${char.location.location.name} (${char.location.location.type.name})` :
                                        (char.location.hasOwnProperty('structure_id') ? 'Unknown Structure' : 'Undocked')})</Box>
                        </Box>
                        <Box display = "flex" flexDirection="row">
                            <Box style={styles.characterDetailTitleCell}>Current Ship:</Box>
                            <Box style={styles.characterDetailCell}>{char.ship.ship_name} ({char.ship.type.name})</Box>
                        </Box>
                        <br/>
                        <Box display = "flex" flexDirection="row">
                            <Box style={{width:'100%'}}>
 
                            <table width='100%' style={{textAlign: 'left', padding:'0px', cellSpacing: '0', borderSpacing:'0', borderCollapse: 'collapse', fontSize:'13px', color:'rgb(245, 245, 245)'}}>
                                        <tbody>
                                            <tr>
                                                <th width='100'>Attributes</th>
                                                <td width='60'></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Intelligence:</td>
                                                <td>{char.attributes.intelligence}</td>
                                                <td>Unallocated SP:</td>
                                                <td>{char.unallocated_sp !== undefined ? char.unallocated_sp.toLocaleString(navigator.language) : '0'}</td>
                                            </tr>
                                            <tr>
                                                <td>Memory:</td>
                                                <td>{char.attributes.memory}</td>
                                                <td>Bonus Remaps:</td>
                                                <td>{char.attributes.bonus_remaps}</td>
                                            </tr>
                                            <tr>
                                                <td>Perception:</td>
                                                <td>{char.attributes.perception}</td>
                                                <td>Next Yearly Remap:</td>
                                                <td>{char.getNextYearlyRemapDate() !== true ? char.getNextYearlyRemapDate().toLocaleString(navigator.language) : 'Now'}</td>
                                            </tr>
                                            <tr>
                                                <td>Willpower:</td>
                                                <td>{char.attributes.willpower}</td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Charisma:</td>
                                                <td>{char.attributes.charisma}</td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                            </Box>
                        </Box>
                        </CardContent>
                    </Card>

                    <Card style={styles.card}>
                        <CardHeader style={{paddingBottom:'5px'}} title={`Jump Clones (${char.jumpClones.length}/${char.getMaxClones()})`}/>
                        <CardContent style={styles.cardTextDiv}>
                        <Box display = "flex" flexDirection="row">
                            <Box style={styles.characterDetailTitleCell}>Jump Clone:</Box>
                            <Box style={styles.characterDetailCell}>{cloneJumpAvailable.relative} {cloneJumpAvailable.relative !== 'Now' ? `(${cloneJumpAvailable.date.toLocaleString(navigator.language)})` : ''}</Box>
                        </Box>

                            {
                                char.jumpClones.length > 0 ?
                                    char.jumpClones.map(jumpClone =>
                                        <Box display = "flex" flexDirection="row" key={jumpClone.jump_clone_id}>
                                            <Box style={styles.characterDetailTitleCell}>Name: {jumpClone.name ? jumpClone.name : 'N/A' }</Box>
                                            <Box style={styles.characterDetailCell}>{jumpClone.location !== undefined ? `${jumpClone.location.name} (${jumpClone.location.type.name})` : 'Unknown Structure'}
                                            <ul style={{marginTop:'0', marginBottom:'0', paddingLeft:'5px', listStyleType: 'none'}}>
                                                {jumpClone.implants.map(implant => <li key={implant.id}>{implant.name}</li>)}
                                            </ul>
                                            </Box>
                                        </Box>
                                    ) :
                                    'No Jump Clones'
                            }
                        </CardContent>
                    </Card>
                </div>

                <div style={styles.cardDiv}>
                    {
                        fatigue !== undefined ?
                            <Card style={styles.card}>
                                <CardHeader title='Jump Fatigue' style={{paddingBottom:'5px'}} />
                                <CardContent>
                                    <table width='100%' style={{textAlign: 'left', padding:'0px', cellSpacing: '0', borderSpacing:'0', borderCollapse: 'collapse', fontSize:'13px', color:'rgb(245, 245, 245)'}}>
                                        <tbody>
                                            <tr>
                                                <th>Last Jump:</th>
                                                <td>{fatigue.last_jump.relative}</td>
                                                <td>{fatigue.last_jump.date.toLocaleString(navigator.language)}</td>
                                            </tr>
                                            <tr>
                                                <th>Red Timer:</th>
                                                <td style={{color: deepOrange400}}>{fatigue.red_timer_expiry.relative}</td>
                                                <td>
                                                    {
                                                        fatigue.red_timer_expiry.relative !== 'None' ?
                                                            fatigue.red_timer_expiry.date.toLocaleString(navigator.language) :
                                                            ''
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Blue Timer:</th>
                                                <td style={{color: lightBlue400}}>{fatigue.blue_timer_expiry.relative}</td>
                                                <td>
                                                    {
                                                        fatigue.blue_timer_expiry.relative !== 'None' ?
                                                            fatigue.blue_timer_expiry.date.toLocaleString(navigator.language) :
                                                            ''
                                                    }
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </CardContent>
                            </Card> :
                            ''
                    }

                    <Card style={styles.card}>
                        <CardHeader title='Active Implants' style={{paddingBottom:'5px'}}/>
                        <CardContent style={styles.cardTextDiv}>
                            {
                                char.implants.length > 0 ?
                                    <table cellPadding={0} style={{textAlign: 'left', padding:'0px', cellSpacing: '0', borderSpacing:'0', borderCollapse: 'collapse', fontSize:'13px', color:'rgb(245, 245, 245)'}}>
                                        <tbody>
                                        {
                                            char.implants.map(implant =>
                                                <tr key={implant.id}>
                                                    <td width={30}><img width={24} src={`https://image.eveonline.com/Type/${implant.id}_32.png`}/></td>
                                                    <td>{implant.name}</td>
                                                </tr>
                                            )
                                        }
                                        </tbody>
                                    </table> :
                                    ' No Implants'
                            }
                        </CardContent>
                    </Card>

                    <Card style={styles.card}>
                        <CardHeader style={{paddingBottom:'5px'}}
                            title='Skill Queue'
                            subheader={
                                char.getCurrentSkill() !== undefined ?
                                    DateTimeHelper.timeUntil(new Date(char.getLastSkill().finish_date)) :
                                    '0d 0h 0m 0s'
                            }
                        />

                        <CardContent>
                            {
                                char.getCurrentSkill() !== undefined ?
                                    char.skillQueue.map(skill => {
                                        if (new Date(skill.finish_date) < new Date()) {
                                            return undefined;
                                        } else {
                                            return (
                                                <span key={skill.queue_position}>
                                                    {skill.skill_name} {skill.finished_level}&nbsp;

                                                    <span style={{color: 'rgba(220, 220, 220)', fontStyle: "italic"}}>
                                                        {DateTimeHelper.skillLength(skill.start_date, skill.finish_date)}
                                                    </span>
                                                    <br/>
                                                </span>
                                            );
                                        }
                                    }) :
                                    'No Skills in Queue'
                            }
                        </CardContent>
                    </Card>

                    {
                        char.loyalty_points !== undefined ?
                            <Card style={styles.card}>
                                <CardHeader title='Loyalty Points'/>
                                <CardContent>
                                    {
                                        char.loyalty_points.length > 0 ?
                                            <table width='100%'>
                                                <tbody>
                                                {
                                                    char.loyalty_points.map(o =>
                                                        <tr key={o.corporation_id}>
                                                            <td style={{textAlign: 'left'}}>{o.corporation.name}</td>
                                                            <td style={{textAlign: 'right'}}>{o.loyalty_points.toLocaleString(navigator.language)}</td>
                                                        </tr>
                                                    )
                                                }
                                                </tbody>
                                            </table> :
                                            'No Loyalty Points'
                                    }
                                </CardContent>
                            </Card> :
                            ''
                    }
                </div>
            </div>
        );
    }
}
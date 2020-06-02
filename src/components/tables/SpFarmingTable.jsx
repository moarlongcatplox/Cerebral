'use strict';
//material-ui
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer } from '@material-ui/core';

//local
import Character from '../../models/Character';
import FarmCharacter from '../../models/FarmCharacter';
import FarmHelper from '../../helpers/FarmHelper';
import DateTimeHelper from '../../helpers/DateTimeHelper';

//react
import React from 'react';
import {Redirect} from 'react-router';

//---------------------------------end imports---------------------------------


const styles = {
    charactersTable: {
        width: '95%',
        backgroundColor: 'rgba(75, 75, 75, 0.5)',
    },
    farmRow: {
        height: 23,
    },
    
    farmRowColumnDelete: {
        height: 23,
        width: 20,
        paddingRight: 0,
        paddingLeft: 5,
    },
    
    farmRowColumn: {
        height: 23,
        paddingRight: 6,
        paddingLeft: 6,
    },
    farmTableContainer: {
        maxHeight:'calc(100vh - 70px)',
        backgroundColor: 'rgba(0, 0, 0, 0)',
    }

};

export default class SpFarmingTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            characters: FarmCharacter.getAll(),
            ticking: true,
            redirectPath: undefined,
            injectorsReady: Object.values(FarmCharacter.getAll()).reduce((count, char) => {
                return count + (Character.get(char.id).getInjectorsReady(char.baseSp));
            }, 0),
        };
    }
    
    componentDidMount() {
        this.timerId = setInterval(
            () => this.tick(),
            1000
        );

        this.subscriberId = FarmCharacter.subscribe(this);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);

        FarmCharacter.unsubscribe(this.subscriberId);
    }

    tick() {
        if (this.state.ticking) {
            this.forceUpdate();
        }
    }

    handleClick(e, characterId) {
        let path = '/characters/' + characterId;

        this.setState({
            redirectPath: path
        });
    }

    handleDelete(e, characterId) {
        FarmHelper.deleteFarm(characterId);

        this.forceUpdate();
    };

    render() {
        if (this.state.redirectPath !== undefined) {
            this.setState({redirectPath: undefined});

            return <Redirect push to={this.state.redirectPath}/>;
        }

        return (
            <TableContainer style={styles.farmTableContainer}>
                <Table style={styles.charactersTable} size="small" stickyHeader>
                <TableHead style={{padding: '0 0 0 0'}}>
                    <TableRow>
                        <TableCell style={styles.farmRowColumnDelete}>&nbsp;</TableCell>
                        <TableCell style={styles.farmRowColumn}><strong>Character</strong></TableCell>
                        <TableCell style={styles.farmRowColumn}><small>Account Name</small></TableCell>
                        <TableCell style={styles.farmRowColumn}><strong>Next Injector</strong></TableCell>
                        <TableCell style={styles.farmRowColumn}><strong>SP/hour</strong></TableCell>
                        <TableCell style={styles.farmRowColumn}><strong>Available</strong><small> ({this.state.injectorsReady})</small></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {this.state.characters.map(farmChar => {
                    const char = Character.get(farmChar.id);
                    const currentSkill = char.getCurrentSkill();
            return (
                    <TableRow style={styles.farmRow} key={char.id} hover role="checkbox">
                        <TableCell style={styles.farmRowColumnDelete}><a onClick={e => this.handleDelete(e, char.id)}>❌</a></TableCell>
                        <TableCell style={styles.farmRowColumn}><a onClick={e => this.handleClick(e, char.id)}>{char.name}</a></TableCell>
                        <TableCell style={styles.farmRowColumn}><small>{farmChar.accountName}</small></TableCell>
                        <TableCell style={styles.farmRowColumn}>{DateTimeHelper.timeUntil(char.getNextInjectorDate(farmChar.baseSp))}</TableCell>
                        <TableCell style={styles.farmRowColumn}>{currentSkill !== undefined ? char.getCurrentSpPerHour() : "Not Training"}</TableCell>
                        <TableCell style={styles.farmRowColumn}>{char.getInjectorsReady(farmChar.baseSp)}<br/></TableCell>
                    </TableRow>
                    )
                    })}
                </TableBody>
                </Table>
            </TableContainer>
        );
    }
}


/*

export default () => {
    const [columns] = useState([
      { name: 'account', title: 'Account' },
      { name: 'character', title: 'Character' },
      { name: 'nextInjector', title: 'Next Injector' },
      { name: 'hourlySP', title: 'SP/Hour' },
      { name: 'availableInjectors', title: 'Injectors Available' },
    ]);
    const [rows] = useState(generateRows({ columnValues: globalSalesValues, length: 8 }));
    const [tableColumnExtensions] = useState([
      { columnName: 'amount', align: 'right' },
    ]);
    const [totalSummaryItems] = useState([
      { columnName: 'region', type: 'count' },
      { columnName: 'amount', type: 'sum' },
    ]);
    const [currencyColumns] = useState(['amount']);
    const [grouping] = useState([{ columnName: 'region' }]);
    const [groupSummaryItems] = useState([
      { columnName: 'region', type: 'count' },
      { columnName: 'amount', type: 'sum' },
      {
        columnName: 'amount', type: 'sum', showInGroupFooter: false,
      },
      {
        columnName: 'amount', type: 'max', showInGroupFooter: false, alignByColumn: true,
      },
      {
        columnName: 'units', type: 'sum', showInGroupFooter: false, alignByColumn: true,
      },
    ]);
}


*/

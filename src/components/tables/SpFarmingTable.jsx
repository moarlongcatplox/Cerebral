'use strict';
//material-ui
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

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
        height: '100%',
        width: '95%'
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

};



export default class SpFarmingTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            characters: FarmCharacter.getAll(),
            ticking: true,
            redirectPath: undefined
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
            <Table style={styles.charactersTable}>
                <TableHead>
                    <TableRow>
                        <TableCell style={styles.farmRowColumnDelete}>&nbsp;</TableCell>
                        <TableCell style={styles.farmRowColumn}><strong>Character</strong><br/><small>Account Name</small></TableCell>
                        <TableCell style={styles.farmRowColumn}><strong>Next Injector</strong></TableCell>
                        <TableCell style={styles.farmRowColumn}><strong>SP/hour</strong></TableCell>
                        <TableCell style={styles.farmRowColumn}><strong>Available</strong><br/><small>Total: XXX</small></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody displayRowCheckbox={false}>
                    {this.state.characters.map(farmChar => {
                    const char = Character.get(farmChar.id);
                    const currentSkill = char.getCurrentSkill();
            return (
                    <TableRow style={styles.farmRow} key={char.id} selectable={false}>
                        <TableCell style={styles.farmRowColumnDelete}><a onClick={e => this.handleDelete(e, char.id)}>❌</a></TableCell>
                        <TableCell style={styles.farmRowColumn}><a onClick={e => this.handleClick(e, char.id)}>{char.name}</a><br/><small>{farmChar.accountName}</small></TableCell>
                        <TableCell style={styles.farmRowColumn}>{DateTimeHelper.timeUntil(char.getNextInjectorDate(farmChar.baseSp))}</TableCell>
                        <TableCell style={styles.farmRowColumn}>{currentSkill !== undefined ? char.getCurrentSpPerHour() : "Not Training"}</TableCell>
                        <TableCell style={styles.farmRowColumn}>{char.getInjectorsReady(farmChar.baseSp)}<br/></TableCell>
                    </TableRow>
                    )
                    })}
                </TableBody>
            </Table>
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

'use strict';
//material-ui
import { Card, CardHeader, CardContent } from '@material-ui/core';

//local
import CharacterModel from '../../../models/Character';
import appProperties from '../../../../resources/properties';
import ContractsTable from '../../tables/ContractsTable';

//react
import React from 'react';

//---------------------------------end imports---------------------------------


const styles = {
    card: {
        margin: 10
    }
};

export default class Contracts extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const char = CharacterModel.get(this.props.characterId);
        const contracts = char.contracts;

        return (
            <div>
                <Card style={styles.card}>
                    <CardHeader
                        title={`Incomplete Contracts (${char.contractSlotsUsed}/${char.getMaxContracts()})`}
                        subtitle={`Last Update: ${char.getDataRefreshInfo().find(c => c.type === 'Contracts').lastRefresh}`}
                    />

                    <CardContent>
                        <ContractsTable contracts={contracts.filter(c => !appProperties.contract_completed_statuses.includes(c.status))}/>
                    </CardContent>
                </Card>

                <Card style={styles.card}>
                    <CardHeader title="Completed Contracts"/>

                    <CardContent>
                        <ContractsTable
                            contracts={contracts.filter(c => appProperties.contract_completed_statuses.includes(c.status))}
                            complete={true}
                        />
                    </CardContent>
                </Card>
            </div>
        );
    }
}
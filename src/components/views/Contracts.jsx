'use strict';
//material-ui
import { Card, CardHeader, CardContent } from '@material-ui/core';

//local
import ContractsTable from '../tables/ContractsTable';
import Character from '../../models/Character';

//react
import React from 'react';

//---------------------------------end imports---------------------------------


const styles = {
    card: {
        margin: 10
    }
};

export default class Contracts extends React.Component {
    render() {
        return (
            <div>
                <Card style={styles.card}>
                    <CardHeader title="Pending Contracts"/>

                    <CardContent>
                        <ContractsTable contracts={Character.getAllContracts(false)}/>
                    </CardContent>
                </Card>

                <Card style={styles.card}>
                    <CardHeader title="Completed Contracts"/>

                    <CardContent>
                        <ContractsTable
                            contracts={Character.getAllContracts(true)}
                            complete={true}
                        />
                    </CardContent>
                </Card>
            </div>
        );
    }
}

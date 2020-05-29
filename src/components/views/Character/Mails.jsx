'use strict';
//material-ui
import { Card, CardHeader, CardContent } from '@material-ui/core';

//local
import CharacterModel from '../../../models/Character';
import MailTable from '../../tables/MailTable';

//react
import React from 'react';

//---------------------------------end imports---------------------------------


const styles = {
    margin10: {
        margin: 10,
    },
    skillListCard: {
        margin: 10,
        width: 280,
        verticalAlign: 'top',
    },
    leftColumn: {
        verticalAlign: 'top',
        height: '100%',
    },
    rightColumn: {
        verticalAlign: 'top',
        width: '100%',
        height: '100%',
    },
};


export default class Mails extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const char = CharacterModel.get(this.props.characterId);
        const mails = char.getMails();

        return (
            <div>
                <Card style={styles.card}>
                    <CardHeader
                        title={`Last Update: ${char.getDataRefreshInfo().find(c => c.type === 'Mails').lastRefresh}`}
                    />
                    <CardContent>
                        <MailTable
                            mails={mails}
                            complete={true}
                        />
                    </CardContent>
                </Card>
            </div>
        );
    }
}
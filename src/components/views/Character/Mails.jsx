'use strict';
//material-ui
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';

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
    mailCard: {
        backgroundColor: 'rgba(75, 75, 75, 0.5)',
        margin: 10,
    },
    updateTime: {
        float: 'right',
        paddingTop: '5px',
        fontSize: '9px',
    }
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
                <Card style={styles.mailCard}>
                    <CardContent>
                    
                        <MailTable
                            mails={mails}
                            complete={true}
                        />
                    <span style={styles.updateTime}>{`Last Update: ${char.getDataRefreshInfo().find(c => c.type === 'Mails').lastRefresh}`}</span>
                    </CardContent>
                </Card>
            </div>
        );
    }
}
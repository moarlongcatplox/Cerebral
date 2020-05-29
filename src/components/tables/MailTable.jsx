'use strict';
//material-ui
import { Icon, IconButton } from '@material-ui/core'

//local
import MailContentDialog from '../dialogs/MailContentDialog';

//react
import React from 'react';
import ReactTable from 'react-table';

//---------------------------------end imports---------------------------------


const styles = {
    icon: {
        padding: '0 0 0 0',
        margin: '0 0 0 0',
        },
    iconButton: {
        padding: '0px 0px 0px 0px',
        margin: '6px 3px 0px 0px',
        height: 24,
        width: 24,
    },
    table: {
        color: '#fff',
        fontSize: '9pt',
        cursor: 'default',
    },
};

export default class MailTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openedContract: undefined,
        };
    }

    render() {
        const mails = this.props.mails;

        let columns = [
            {
                Header: 'ID',
                id: 'mail_id',
                accessor: 'mail_id',
                show: false,
            },
            {
                Header: 'Date',
                headerStyle: {
                    textAlign: 'left',
                },
                accessor: 'timestamp',
                Cell: row => <span>{new Date(row.value).toLocaleString(navigator.language)}</span>,
                sortMethod: (a, b) => new Date(a).getTime() > new Date(b).getTime() ? 1 : -1,
                maxWidth: 160,
            },
            {
                Header: <Icon className="material-icons" style={{ fontSize: '16px' }}>mail</Icon>,
                headerStyle: {
                    textAlign: 'left',
                },
                id: 'is_read',
                accessor: c => c.is_read,
                Cell: row => <span>{row.value ? <Icon className="material-icons" style={{ fontSize: '16px' }}>drafts</Icon> : <Icon className="material-icons" style={{fontSize: '16px'}}>mail</Icon> }</span>,
                maxWidth: 40,
               
            },
            {
                Header: 'From',
                headerStyle: {
                    textAlign: 'left',
                },
                id: 'from_name',
                accessor: 'from_name',
                maxWidth: 120,
            },
            {
                Header: 'Subject',
                headerStyle: {
                    textAlign: 'left',
                },
                id: 'subject',
                accessor: 'subject',
            },
            {
                Header: 'Labels',
                headerStyle: {
                    textAlign: 'left',
                },
                id: 'labels',
                accessor: 'label_names',
                Cell: row => <span>{row.value !== undefined ? row.value.join(',') : ''}</span>,
                maxWidth: 100,
            },
        ];

        columns.push({
            Header: '',
            accessor: 'mail_id',
            style: {
                textAlign: 'right',
                height: 32,
                margin: '0 0 0 0',
                padding: '0 0 0 0',
            },
            Cell: row => (
                <IconButton style={styles.iconButton} onClick={e => this.setState({ openedMail: mails.find(c => c.mail_id === row.value) })}>
                    <Icon className="material-icons">navigate_next</Icon>
                </IconButton>
            ),
            width: 30,
        });

        if (mails.length > 0) {
            return (
                <div>
                    <MailContentDialog mail={this.state.openedMail} />

                    <ReactTable
                        style={styles.table}
                        data={mails}
                        columns={columns}
                        showPagination={false}
                        defaultPageSize={mails.length}
                        defaultSorted={[
                            {
                                id: 'timestamp',
                                desc: true,
                            }
                        ]}
                    />
                </div>
            );
        } else {
            return (
                <p>No Mails found.</p>
            );
        }
    }
}

'use strict';
//material-ui
import { Icon, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'

//local
import MailContentDialog from '../dialogs/MailContentDialog';

//react
import React from 'react';

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
    mailTable: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        color: '#fff',
        fontSize: '9px',
        cursor: 'default',
        paddingTop: "6px 6px 6px 6px",
    },
    mailContainer: {
        maxHeight:'calc(100vh - 220px)',
        backgroundColor: 'rgba(0, 0, 0, 0)',
    }
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


        if (mails.length > 0) {
            return (
<div>

<MailContentDialog mail={this.state.openedMail} />
    <TableContainer component = {Paper} style={styles.mailContainer}>
    <Table style={styles.mailTable} stickyHeader size="small" >
        <TableHead> 
            <TableRow>
                <TableCell style={{width: "40px"}}></TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell style={{width: "175px"}}>From</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Labels</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            { // makes the entire row clickable, onClick arrow function uses the current mail_id to 
              // find the entire contents of the mail then push those to the mail dialog box.  
            mails.map((mail) => (
                <TableRow hover role = "checkbox" key={mail.mail_id} 
                onClick = {() => {this.setState({ openedMail: mails.find(c => c.mail_id === mail.mail_id) })}}>
                    <TableCell>
                        {mail.is_read ? <Icon style={{ fontSize: '16px' }}>drafts</Icon> : <Icon style={{fontSize: '16px'}}>mail</Icon> }
                    </TableCell>
                    <TableCell>
                        {new Date(mail.timestamp).toLocaleString(navigator.language, { timeZone: 'UTC', dateStyle: 'short'})}
                    </TableCell>
                    <TableCell>
                        {new Date(mail.timestamp).toLocaleString('en-GB', { timeZone: 'UTC', timeStyle: 'short'})}
                    </TableCell>
                    <TableCell>{mail.from_name}</TableCell>
                    <TableCell>{mail.subject}</TableCell>
                    <TableCell>{mail.label_names}</TableCell>
                </TableRow>

            ))  // end .map
            }

            <TableRow>
            </TableRow>
        </TableBody>                    

    </Table>
    </TableContainer>
</div>



            );
        } else {
            return (
                <p>No Mails found.</p>
            );
        }
    }
}
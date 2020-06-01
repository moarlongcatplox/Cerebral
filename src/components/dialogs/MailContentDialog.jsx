'use strict';
//material-ui
import { 
    Avatar, Chip, Dialog, 
    Button, Icon, List, 
    ListItem, ListItemText, ListItemIcon, 
    IconButton, Paper, 
    DialogActions, DialogTitle, Typography,
    DialogContent

} from '@material-ui/core'

//local

//react
import React from 'react';

//---------------------------------end imports---------------------------------

const styles = {
    dialog: {
        width: 700,
    },
    closeIcon: {
        cursor:'pointer',
        position: 'absolute',
        right: 1,
        top: 1,
    },
    mailTitle: {
        margin: 8,
        padding: 2,
    },
    p: {
        color: '#fff',
        textColor: '#fff',
        textAlign: 'left',
        fontSize: 14,
    },
    th: {
        width: 120,
    },
    table: {
        marginBottom: 10,
    },
    chip: {
        margin: 2,
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    browsericon: {
        width: 32,
        height: 32,
      },
};

export default class MainContentDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
        }
    }

    componentWillReceiveProps() {
        this.setState({ open: true });
    }

    // 404 check for avatar for mail - a similar function may be included in request, but this seems easier.
    urlExists(url) {
        var http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send();
        if (http.status != 404){
           return true
        }
            
        else
            return false
    }

    getAvatarComponent(id, type) {
            /*
             because the mail array does not define if the evemail was sent by a corp, going to try a different
             handling system.  the url wil be passed to a function to check for 404, if it does not, it is used,
             otherwise it continues through the switch until it gets to default.  This will log 404's in the 
             console - according to all of the docs I have researched those 404's cannot be suppressed.

             The process appears super inefficient. Will have to come up with a more effective way to do this.
             Click handlers are taking a very long time when there are multiple participants.  The only use case
             of changing this was to show the proper avatar when an email was sent by a corporation.
            */
        let avatarUrl = undefined; 
        switch (type) {
            case 'character':
                avatarUrl = `https://image.eveonline.com/Character/${id}_32.jpg`
                if (this.urlExists(avatarUrl)) {
                    return <Avatar key={id} style={styles.avatar} size={32} src={avatarUrl} />;
                }
            case 'corporation':
                avatarUrl = `https://image.eveonline.com/Corporation/${id}_32.jpg`
                if (this.urlExists(avatarUrl)) {
                    return <Avatar key={id} style={styles.avatar} size={32} src={avatarUrl} />;
                }
            case 'alliance':
                avatarUrl = `https://image.eveonline.com/Alliance/${id}_32.jpg`
                if (this.urlExists(avatarUrl)) {
                    return <Avatar key={id} style={styles.avatar} size={32} src={avatarUrl} />;
                }            

            // These cases do not request an avatar image, so they do not require that handler.
            case 'mailing_list':
                return <Avatar key={id} style={styles.avatar} size={32} icon={<Icon>list</Icon>} />;
                break;
            
            default:
                return <Avatar key={id} style={styles.avatar} size={32} icon={<Icon>help</Icon>} />;
        }
    }

    render() {
        if (this.props.mail === undefined) {
            return null;

        }

        const mail = this.props.mail;
        //Dialog opening and closing required a rework - the props changed somewhat significantly with the
        //material-ui upgrade.

        return (
        <div>
            <Dialog 
            open={this.props.mail !== undefined && this.state.open !== false}
            onClose={() => this.setState({ open: false })}
            fullWidth = {true}
            maxWidth='sm'
            >
                <DialogTitle style={styles.mailTitle}>
                    <div>{mail.subject}<IconButton style={styles.closeIcon} onClick={() => this.setState({ open: false })}><Icon>close</Icon></IconButton></div>
                </DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>

                <div style={styles.p}>
                    <table cellPadding={0} style={styles.table}>
                        <tbody>
                            <tr>
                                <th style={styles.th}>To:</th>
                                <td style={{ textTransform: 'capitalize' }}>
                                    <div style={styles.wrapper}>
                                        {
                                            mail.recipients.map(r =>
                                                <Chip key={r.recipient_id} style={styles.chip} avatar={this.getAvatarComponent(r.recipient_id, r.recipient_type)} label={r.recipient_name} />,
                                            )
                                        }
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th style={styles.th}>From:</th>
                                { 
                                // TODO check handler for corp/alliance emails to get the correct avatar
                                }
                                <td style={{ textTransform: 'capitalize' }}><Chip style={styles.chip} avatar={this.getAvatarComponent(mail.from, 'character')} label={mail.from_name}/></td>
                            </tr>
                            <tr>
                                <th style={styles.th}>Time:</th>
                                <td>{ new Date(mail.timestamp).toLocaleString(navigator.language)}</td>
                            </tr>
                            <tr>
                                <th style={styles.th}>Labels:</th>
                                <td>{ mail.label_names !== undefined ? mail.label_names.join(',') : ''}</td>
                            </tr>
                        </tbody>
                    </table>
                        <Paper>
                            <div style={{ margin: 10 }}>
                                {mail.body.body.split(/\n/g).map((text, i) => <span key={i}>{text}<br /></span>)}
                            </div>
                        </Paper>
                    
                    </div>
                    {
                        mail.body.links !== undefined && mail.body.links.length > 0 &&
                            <div>
                                <List style={styles.p}>
                                {
                                    //TODO might be neat to have the links in the email where they are supposed to be, though having
                                    //them at the bottom parsed out makes it feel like you're less likely to get HAZED
                                    mail.body.links.map((link, index) =>
                                    (<ListItem key={index}> 
                                        <ListItemText>{index + 1} - {link}</ListItemText>
                                        <ListItemIcon>
                                            <IconButton edge="end" aria-label="Open in Browser" onClick={e => {require("electron").shell.openExternal(link); }}>
                                                <Icon style={styles.browsericon}>open_in_new</Icon>
                                            </IconButton>
                                        </ListItemIcon>
                                    </ListItem>
                                    ),
                                    )
                                }
                                
                                </List>
                                </div>
                    }        
                
                </DialogContent>
            </Dialog>
        </div>
        );
    }
}

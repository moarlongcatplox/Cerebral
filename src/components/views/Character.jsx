'use strict';
//material-ui
import { Button, Icon } from '@material-ui/core';

//local
import Summary from './Character/Summary';
import Skills from './Character/Skills';
import Plans from './Character/Plans';
import Contracts from './Character/Contracts';
import Mails from './Character/Mails';
import Api from './Character/Api';

//react
import React from 'react';

//---------------------------------end imports---------------------------------


const styles = {
    button: {
        marginLeft: 5,
        width: 130,
        marginTop: 5,
        backgroundColor: 'rgba(75, 75, 75, .5)',
        color: 'rgb(245, 245, 245)'
    },
    buttonDiv: {
        marginLeft: 10,
        marginTop: 10
    }
};

export default class Character extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: 'summary',
        }
    }

    switchPage(newPage) {
        this.setState({
            currentPage: newPage
        });
    }

    render() {
        const characterId = this.props.match.params.characterId;

        let component;
        switch(this.state.currentPage) {
            case 'plans':
                component = <Plans characterId={characterId}/>;
            break;
            case 'skills':
                component = <Skills characterId={characterId}/>;
                break;
            case 'contracts':
                component = <Contracts characterId={characterId}/>;
                break;
            case 'mails':
                component = <Mails characterId={characterId}/>;
                break;
            case 'api':
                component = <Api characterId={characterId}/>;
                break;
            default:
                component = <Summary characterId={characterId}/>;
        }

        return (
            <div style={{width: '100%', overflow: 'hidden'}}>
                <div style={styles.buttonDiv}>
                    <Button variant="contained" label="Summary"
                                  disabled={this.state.currentPage === 'summary'}
                                  style={styles.button}
                                  startIcon={<Icon>assessment</Icon>}
                                  onClick={e => this.switchPage('summary')}>
                    Summary</Button>

                    <Button variant="contained" label="Skills"
                                  disabled={this.state.currentPage === 'skills'}
                                  style={styles.button}
                                  startIcon={<Icon>library_books</Icon>}
                                  onClick={e => this.switchPage('skills')}>
                    Skills</Button>

                    <Button variant="contained" label="Plans"
                                  disabled={this.state.currentPage === 'plans'}
                                  style={styles.button}
                                  startIcon={<Icon>format_list_numbered</Icon>}
                                  onClick={e => this.switchPage('plans')}>
                    plans</Button>

                    <Button variant="contained" label="Mails"
                                  disabled={this.state.currentPage === 'mails'}
                                  style={styles.button}
                                  startIcon={<Icon>mail</Icon>}
                                  onClick={e => this.switchPage('mails')} >
                    mails</Button>

                    <Button variant="contained" label="Contracts"
                                  disabled={this.state.currentPage === 'contracts'}
                                  style={styles.button}
                                  startIcon={<Icon>assignment</Icon>}
                                  onClick={e => this.switchPage('contracts')} >
                    contracts</Button>

                    <Button variant="contained" label="API"
                                  disabled={this.state.currentPage === 'api'}
                                  style={styles.button}
                                  startIcon={<Icon>file_download</Icon>}
                                  onClick={e => this.switchPage('api')} >
                    API</Button>
                </div>

                {component}
            </div>
        );
    }
}
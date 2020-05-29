'use strict';
//material-ui
import { MenuItem, Select } from '@material-ui/core';

//local
import Character from '../../models/Character';

//react
import React from 'react';

//---------------------------------end imports---------------------------------


export default class CharacterSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            characterId: 0,
        };

        this.handleCharacterChange = this.handleCharacterChange.bind(this);

        const allChars = Character.getAll();

        this.chars = [];
        Object.keys(allChars).forEach((char) => {
            this.chars.push(<MenuItem key={char} value={char} primaryText={allChars[char].name} />);
        });
        this.chars.sort((a, b) => a.props.primaryText.localeCompare(b.props.primaryText));
    }

    handleCharacterChange(event, index, value) {
        this.setState({ characterId: value });
        this.props.onCharacterChange(value);
    }

    render() {
        return (
            <Select style={{ margin: 10 }}
                floatingLabelText="Character"
                value={this.state.characterId}
                onChange={this.handleCharacterChange}
            >
                {this.chars}
            </Select>
        );
    }
}

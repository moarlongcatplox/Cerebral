'use strict';
//material-ui
import { Checkbox, IconButton, Icon, Popover, Table, TableBody, TableHead, TableRow, TableCell, TableFooter } from '@material-ui/core'

//local
import DateHelper from '../../helpers/DateTimeHelper';
import AllSkills from '../../../resources/all_skills';


//react
import React from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

//---------------------------------end imports---------------------------------


const styles = {
    planRow: {
        height: 20,
    },
    planRowHighlight: {
        height: 20,
        background: '#404040',
    },
    planRowColumn: {
        height: 20,
        paddingRight: 6,
        paddingLeft: 6,
        textTransform: 'capitalize',
    },
    planRowColumnBuffer: {
        height: 20,
        width: '0%',
        paddingRight: 6,
        paddingLeft: 6,
        textTransform: 'capitalize',
    },
    planRowColumnHidden: {
        height: 20,
        paddingRight: 0,
        paddingLeft: 0,
        visibility: 'hidden',
        width: 0,
    },
    planRowColumnSkill: {
        height: 20,
        width: 250,
        paddingRight: 6,
        paddingLeft: 6,
    },
    planRowColumnTime: {
        height: 20,
        width: 110,
        paddingRight: 6,
        paddingLeft: 6,
    },
    planRowColumnDelete: {
        height: 20,
        width: 20,
        paddingRight: 3,
        paddingLeft: 6,
    },
    planRowColumnSPh: {
        height: 20,
        width: 40,
        paddingRight: 6,
        paddingLeft: 6,
    },
    planRowColumnEdit: {
        height: 20,
        width: 20,
        paddingRight: 0,
        paddingLeft: 0,
    },
    deleteButton: {
        height: 20,
        width: 20,
        margin: 0,
        fontSize: 16,
        padding: 0,
    },
};

const SortableItem = SortableElement(
    class SortableItemA extends React.PureComponent {
        constructor() {
            super();
            this.handleMouseDown = this.handleMouseDown.bind(this);
        }

        handleMouseDown(e) {
            if (e.target.innerText !== undefined && e.target.innerText === 'delete') {
                this.props.onRemove(this.props.idx, e);
            } else if (e.target.innerText !== undefined && e.target.innerText === 'mode_edit') {
                this.props.onEdit(this.props.idx, e);
            } else {
                this.props.onMouseDown(this.props.idx, e);
            }
        }

        render() {
            const style = this.props.highlighted ? styles.planRowHighlight : styles.planRow;
            switch (this.props.value.type) {
                case 'skill': {
                    return (
                        <TableRow selectable style={style} onMouseDown={this.handleMouseDown}>
                            <TableCell style={styles.planRowColumnSkill}>
                                {this.props.value.title}
                            </TableCell>
                            <TableCell style={this.props.columnTime}>
                                {DateHelper.niceCountdown(this.props.value.time)}
                            </TableCell>
                            <TableCell style={this.props.columnMarketGroup}>
                                {AllSkills.skills[this.props.value.id].market_group_name}
                            </TableCell>
                            <TableCell style={this.props.columnAttributes}>
                                {this.props.value.attributeTitle}
                            </TableCell>
                            <TableCell style={this.props.columnSPhs}>
                                {this.props.value.spHour}
                            </TableCell>
                            <TableCell style={this.props.columnLastRemap}>
                                {DateHelper.niceCountdown(this.props.value.lastRemap)}
                            </TableCell>
                            <TableCell style={styles.planRowColumnEdit}>
                            </TableCell>
                            <TableCell style={styles.planRowColumnDelete}>
                                <IconButton
                                    style={styles.deleteButton}
                                    iconStyle={styles.deleteButton}
                                >
                                    <Icon style={styles.deleteButton} className="material-icons">delete</Icon>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    );
                }
                case 'note':
                case 'remap': {
                    return (
                        <TableRow selectable style={style} onMouseDown={this.handleMouseDown}>
                            <TableCell style={styles.planRowColumnSkill}>
                                {this.props.value.title}
                            </TableCell>
                            <TableCell style={this.props.columnTime} />
                            <TableCell style={this.props.columnMarketGroup} />
                            <TableCell style={this.props.columnAttributes} />
                            <TableCell style={this.props.columnSPhs} />
                            <TableCell style={this.props.columnLastRemap} />
                            <TableCell style={styles.planRowColumnEdit}>
                                <IconButton
                                    style={styles.deleteButton}
                                    iconStyle={styles.deleteButton}
                                >
                                    <Icon style={styles.deleteButton} className="material-icons">mode_edit</Icon>
                                </IconButton>
                            </TableCell>
                            <TableCell style={styles.planRowColumnDelete}>
                                <IconButton
                                    style={styles.deleteButton}
                                    iconStyle={styles.deleteButton}
                                >
                                    <Icon style={styles.deleteButton} className="material-icons">delete</Icon>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    );
                }
                default: {
                    return (<TableRow />);
                }
            }
        }
    },
);

const SortableList = SortableContainer(
    class SortableListAnonymous extends React.Component {
        render() {
            return (
                <TableBody displayRowCheckbox={false}>
                    {this.props.items.map((value, index) => {
                        {
                            const highlighted = this.props.selection !== undefined ? this.props.selection.indexOf(index) > -1 : 0;
                            return (
                                <SortableItem
                                    key={value.type === 'skill' ? `skill-${value.title}` : `item-${index}`}
                                    index={index}
                                    value={value}
                                    onRemove={this.props.onRemove}
                                    onMouseDown={this.props.onMouseDown}
                                    onEdit={this.props.onEdit}
                                    idx={index}
                                    highlighted={highlighted}
                                    columnTime={this.props.columnTime}
                                    columnMarketGroup={this.props.columnMarketGroup}
                                    columnAttributes={this.props.columnAttributes}
                                    columnSPhs={this.props.columnSPhs}
                                    columnLastRemap={this.props.columnLastRemap}
                                />
                            );
                        }
                    })
                    }
                </TableBody>
            );
        }
    },
);

// workaround for https://github.com/mui-org/material-ui/issues/6579
SortableList.muiName = 'TableBody';

export default class SkillPlanTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            totalTime: 0,
            selection: [],
            columnTimeChecked: true,
            columnMarketGroupChecked: true,
            columnAttributesChecked: false,
            columnSPhsStyleChecked: false,
            columnLastRemapChecked: false,
            columnTimeStyle: styles.planRowColumnTime,
            columnMarketGroupStyle: styles.planRowColumn,
            columnAttributesStyle: styles.planRowColumnHidden,
            columnSPhsStyle: styles.planRowColumnHidden,
            columnLastRemapStyle: styles.planRowColumnHidden,
        };

        this.handleColumnEditRequestClose = this.handleColumnEditRequestClose.bind(this);

        this.handleSortEnd = this.handleSortEnd.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.shouldCancelStart = this.shouldCancelStart.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.items !== this.props.items) {
            this.setState({ items: nextProps.items });
        }
        if (nextProps.totalTime !== this.props.totalTime) {
            this.setState({ totalTime: nextProps.totalTime });
        }
    }

    handleDelete(index, e) {
        this.props.onRemove(index, e);
    }

    handleMouseDown(index, event) {
        let newSelection = this.state.selection;
        const testIndex = newSelection.indexOf(index);

        if (event.shiftKey && this.state.selection.length === 1) {
            if (newSelection[0] > index) {
                for (let i = index; i < newSelection[0]; i += 1) {
                    newSelection = newSelection.concat([i]);
                }
            } else {
                for (let i = index; i > newSelection[0]; i -= 1) {
                    newSelection = newSelection.concat([i]);
                }
            }
        } else if (event.ctrlKey || event.metaKey || this.state.selection.length === 0) {
            if (newSelection && testIndex !== -1) {
                newSelection.splice(testIndex, 1);
            } else {
                newSelection = newSelection.concat([index]);
            }
        } else if (testIndex === -1) {
            newSelection = [index];
        }
        this.setState({
            selection: newSelection.sort((a, b) => (a - b)),
        });
        event.preventDefault();
        return false;
    }

    handleSortEnd({ oldIndex, newIndex }) {
        this.props.onSkillMove(oldIndex, newIndex, this.state.selection);
        this.setState({ selection: [] });
    }

    shouldCancelStart(e) {
        // Prevent sorting from being triggered if target is input or button
        if (['delete', 'mode_edit', 'add'].indexOf(e.target.textContent.toLowerCase()) !== -1) {
            return true; // Return true to cancel sorting
        }
        return false;
    }

    handleColumnEditRequestClose() {
        this.setState({
            columnEditOpen: false,
        });
    }

    render() {
        return (
            <div>
                <Popover
                    open={this.state.columnEditOpen}
                    anchorEl={this.state.columnEditAnchor}
                    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                    onRequestClose={this.handleColumnEditRequestClose}
                    style={{ background: '#404040' }}
                >
                    <div style={{ margin: 10 }}>
                        <Checkbox
                            label="Time"
                            style={styles.checkbox}
                            checked={this.state.columnTimeChecked}
                            onCheck={(e, c) => this.setState({
                                columnTimeStyle: c ? styles.planRowColumnTime : styles.planRowColumnHidden,
                                columnTimeChecked: c,
                            })}
                        />
                        <Checkbox
                            label="Group"
                            style={styles.checkbox}
                            checked={this.state.columnMarketGroupChecked}
                            onCheck={(e, c) => this.setState({
                                columnMarketGroupStyle: c ? styles.planRowColumn : styles.planRowColumnHidden,
                                columnMarketGroupChecked: c,
                             })}
                        />
                        <Checkbox
                            label="Attributes"
                            style={styles.checkbox}
                            checked={this.state.columnAttributesChecked}
                            onCheck={(e, c) => this.setState({
                                columnAttributesStyle: c ? styles.planRowColumn : styles.planRowColumnHidden,
                                columnAttributesChecked: c,
                             })}
                        />
                        <Checkbox
                            label="SP/h"
                            style={styles.checkbox}
                            checked={this.state.columnSPhsStyleChecked}
                            onCheck={(e, c) => this.setState({
                                columnSPhsStyle: c ? styles.planRowColumnSPh : styles.planRowColumnHidden,
                                columnSPhsStyleChecked: c,
                            })}
                        />
                        <Checkbox
                            label="Remap"
                            style={styles.checkbox}
                            checked={this.state.columnLastRemapChecked}
                            onCheck={(e, c) => this.setState({
                                columnLastRemapStyle: c ? styles.planRowColumn : styles.planRowColumnHidden,
                                columnLastRemapChecked: c,
                            })}
                        />
                    </div>
                </Popover>
                <Table style={{overflow: 'hidden'}}>
                    <TableHead displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow style={styles.planRow}>
                            <TableCell style={styles.planRowColumnSkill}>Skill</TableCell>
                            <TableCell style={this.state.columnTimeStyle}>Training Time</TableCell>
                            <TableCell style={this.state.columnMarketGroupStyle}>Group</TableCell>
                            <TableCell style={this.state.columnAttributesStyle}>Attributes</TableCell>
                            <TableCell style={this.state.columnSPhsStyle}>SP/h</TableCell>
                            <TableCell style={this.state.columnLastRemapStyle}>Since remap</TableCell>
                            <TableCell style={styles.planRowColumnEdit}></TableCell>
                            <TableCell style={styles.planRowColumnDelete}>
                                <IconButton
                                    style={styles.deleteButton}
                                    iconStyle={styles.deleteButton}
                                    onClick={e => this.setState({
                                        columnEditOpen: true,
                                        columnEditAnchor: e.currentTarget,
                                    })}
                                >
                                    <Icon style={styles.deleteButton} className="material-icons">keyboard_arrow_down</Icon>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <SortableList
                        items={this.state.items}
                        distance={1}
                        shouldCancelStart={this.shouldCancelStart}
                        selection={this.state.selection}
                        onEdit={this.props.onEdit}
                        onMouseDown={this.handleMouseDown}
                        onRemove={this.handleDelete}
                        onSortEnd={this.handleSortEnd}
                        columnTime={this.state.columnTimeStyle}
                        columnMarketGroup={this.state.columnMarketGroupStyle}
                        columnAttributes={this.state.columnAttributesStyle}
                        columnSPhs={this.state.columnSPhsStyle}
                        columnLastRemap={this.state.columnLastRemapStyle}
                    />
                    <TableFooter style={styles.planRow} adjustForCheckbox={false}>
                        <TableRow style={styles.planRow}>
                            <TableCell style={styles.planRowColumnSkill}>
                                {
                                    this.state.selection && this.state.selection.length > 1 ?
                                    `${this.state.items.length} skills (${this.state.selection.length} selected - ${
                                        DateHelper.niceCountdown(
                                            this.state.selection.reduce(
                                                (totalTime, index) => (totalTime + (this.state.items[index] && this.state.items[index].type === 'skill' ? this.state.items[index].time : 0)), 0,
                                            ),
                                        )
                                    })`
                                    :
                                    `${this.state.items.length} skills`
                                }</TableCell>
                            <TableCell style={this.state.columnTimeStyle}>{DateHelper.niceCountdown(this.state.totalTime)}</TableCell>
                            <TableCell style={this.state.columnMarketGroupStyle} />
                            <TableCell style={this.state.columnAttributesStyle} />
                            <TableCell style={this.state.columnSPhsStyle} />
                            <TableCell style={this.state.columnLastRemapStyle} />
                            <TableCell style={styles.planRowColumnEdit} />
                            <TableCell style={styles.planRowColumnDelete} />
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        );
    }
}

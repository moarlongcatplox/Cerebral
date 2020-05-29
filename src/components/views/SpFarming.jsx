'use strict';
//material-ui

//local
import AddFarmDialog from '../dialogs/AddFarmDialog';
import SpFarmingTable from '../tables/SpFarmingTable';

//react
import React from 'react';

//---------------------------------end imports---------------------------------


export default class SpFarming extends React.Component {
    render() {
        return (
            <div>
                <AddFarmDialog/>
                <SpFarmingTable/>
            </div>
        );
    }
}

'use strict';
//material-ui

//local
import CharactersOverviewTable from '../tables/CharactersOverviewTable';

//react
import React from 'react';

//---------------------------------end imports---------------------------------


export default class Overview extends React.Component {

    componentWillMount(){
        //clears redirect path
        this.setState({redirectPath: undefined});    
    }
        render() {
        return (
            <div>
                <CharactersOverviewTable/>
            </div>
        );
    }
}

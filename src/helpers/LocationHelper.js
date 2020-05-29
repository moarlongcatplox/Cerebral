'use strict';
//material-ui

//local
import StationHelper from './StationHelper';
import StructureHelper from './StructureHelper';

//react

//---------------------------------end imports---------------------------------


export default class LocationHelper {
    static async resolveLocation(id, client, clientCharacterId) {
        if ((id >= 60000000) && (id <= 64000000)) {
            return await StationHelper.resolveStation(id);
        } else {
            return await StructureHelper.resolveStructure(id, client, clientCharacterId);
        }
    }
}
'use strict';
//material-ui

//local
import FarmCharacter from '../models/FarmCharacter';

//react

//---------------------------------end imports---------------------------------


export default class FarmHelper {
    static addFarm(id, accountName, baseSp) {
        if (baseSp < 5000000) {
            baseSp = 5000000;
        }

        let character = new FarmCharacter(id, accountName, baseSp);
        character.save();
    }

    static deleteFarm(id) {
        FarmCharacter.delete(id);
    }
}
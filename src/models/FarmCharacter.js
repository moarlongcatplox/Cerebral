'use strict';
//material-ui

//local

//react
import Store from 'electron-store';

//---------------------------------end imports---------------------------------


let farmCharacters;
const farmCharactersStore = new Store({
    name: 'farm-characters'
});
let subscribedComponents = [];

class FarmCharacter {

    constructor(id, accountName, baseSp) {
        if (id !== undefined) {
            id = id.toString();
        }
        this.id = id;
        this.accountName = accountName;
        this.baseSp = baseSp;
    }

    static getAll() {
        return Array.from(farmCharacters.values());
    }

    static get(id) {
        return (farmCharacters.has(id)) ? farmCharacters.get(id) : undefined;
    }

    static load() {
        if (farmCharacters === undefined) {
            let rawCharacters = farmCharactersStore.get('farmCharacters');

            farmCharacters = new Map();
            if (rawCharacters !== undefined) {
                rawCharacters = new Map(rawCharacters);

                for(let [id, rawCharacter] of rawCharacters) {
                    let character = new FarmCharacter();
                    Object.assign(character, rawCharacter);
                    character.id = character.id.toString();
                    farmCharacters.set(character.id, character);
                }
            }
        }
    }

    static delete(id) {
        if (farmCharacters.has(id)) {
            farmCharacters.delete(id);

            farmCharactersStore.set('farmCharacters', Array.from(farmCharacters.entries()));
            FarmCharacter.pushToSubscribers();
        }
    }

    save() {
        farmCharacters.set(this.id, this);

        farmCharactersStore.set('farmCharacters', Array.from(farmCharacters.entries()));
        FarmCharacter.pushToSubscribers();
    }

    static subscribe(component) {
        return subscribedComponents.push(component) - 1;
    }

    static unsubscribe(id) {
        subscribedComponents[id] = null;
    }

    static pushToSubscribers() {
        for(let component of subscribedComponents) {
            if (component !== null) {
                component.setState({'characters': FarmCharacter.getAll()});
            }
        }
    }
}

FarmCharacter.load();

export default FarmCharacter;
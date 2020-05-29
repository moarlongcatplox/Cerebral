'use strict';
//material-ui

//local
import CharacterHelper from '../helpers/CharacterHelper';
import SsoClient from '../helpers/eve/SsoClient';
import SsoClientv2 from '../helpers/eve/SsoClientv2';
import Character from './Character';
import appProperties from '../../resources/properties';

//react
const Store = require('electron-store');

//---------------------------------end imports---------------------------------


let authorizedCharacters;
const authorizedCharactersStore = new Store({
    name: 'authorized-characters'
});

class AuthorizedCharacter {
    constructor(id, accessToken, accessTokenExpiry, refreshToken, ownerHash, scopes, ssoVersion) {
        if (id !== undefined) {
            id = id.toString();
            this.id = id;
        }

        this.accessToken = accessToken;
        this.accessTokenExpiry = accessTokenExpiry;
        this.refreshToken = refreshToken;
        this.ownerHash = ownerHash;
        this.scopes = scopes;
        this.lastRefresh = {};
        this.ssoVersion = (ssoVersion !== undefined) ? ssoVersion : 1;
    }

    async getAccessToken(minimumValidity) {
        if (minimumValidity === undefined) {
            minimumValidity = 30;
        }

        if (new Date(this.accessTokenExpiry).getTime() <= new Date().getTime() + (1000 * minimumValidity)) {
            await this.refresh();
        }

        return this.accessToken;
    }

    refreshBlocked() {
        return (this.lastRefresh.success === false) && // if last refresh was bad and
        (
            (// we're never supposed to retry
            (this.lastRefresh.shouldRetry === false || new Date(this.lastRefresh.date) > new Date(new Date().getTime() - 300000))) // or we tried in last 5 min
        );
    }

    async refresh() {
        if (this.refreshBlocked()) {
            throw this.lastRefresh.error;
        }

        this.lastRefresh.date = new Date();

        let client;
        try {
            if (this.ssoVersion === 2) {
                client = new SsoClientv2();
            } else {
                client = new SsoClient();
            }
        } catch(err) {
            this.lastRefresh.success = false;
            this.lastRefresh.error = {
                error: 'invalid_client',
                error_description: 'No client credentials provided.'
            };
            this.lastRefresh.shouldRetry = false;
            this.save();

            Character.get(this.id).markFailed('client');
            throw err;
        }

        let res;
        try {
            res = await client.refresh(this.refreshToken);
        } catch(error) {
            this.lastRefresh.success = false;
            this.lastRefresh.error = error;

            switch(error.error) {
                // Failures due to revoked refresh tokens/belongs to bad client
                case 'invalid_grant':
                    this.lastRefresh.shouldRetry = false;
                    Character.get(this.id).markFailed('token');
                    break;

                // Failures due to bad client
                case 'invalid_client':
                case 'unauthorized_client':
                    this.lastRefresh.shouldRetry = false;
                    Character.get(this.id).markFailed('client');
                    break;

                // CCP's other weird responses
                case 'invalid_token':
                    if (error.error_description === 'The refresh token does not match the client specified.') {
                        this.lastRefresh.shouldRetry = false;
                        Character.get(this.id).markFailed('client');
                    }
                    break;

                // Some sort of other error, we'll delay refreshes temporarily
                default:
                    Character.get(this.id).markFailed('error', true);
                    break;
            }

            this.save();

            throw error;
        }

        this.lastRefresh.success = true;
        this.accessToken = res.accessToken;
        this.accessTokenExpiry = res.accessTokenExpiry;
        if ((res.hasOwnProperty('refreshToken')) && (res.refreshToken !== '')) {
            this.refreshToken = res.refreshToken;
        }
        this.save();
    }

    getScopeInfo() {
        let scopeInfo = [];

        for(const scope of appProperties.scopes) {
            scopeInfo.push({
                name: scope.name,
                description: scope.description,
                isGranted: this.scopes.includes(scope.name)
            });
        }

        return scopeInfo;
    }

    static getAll() {
        return authorizedCharacters;
    }

    static get(id) {
        return authorizedCharacters.hasOwnProperty(id) ? authorizedCharacters[id] : undefined;
    }

    static load() {
        if (authorizedCharacters === undefined) {
            let rawCharacters = authorizedCharactersStore.get('authorizedCharacters');
            let newCharacters = {};

            if (rawCharacters !== undefined) {
                Object.keys(rawCharacters).map(id => {
                    newCharacters[id.toString()] = new AuthorizedCharacter();
                    Object.assign(newCharacters[id.toString()], rawCharacters[id]);
                    newCharacters[id.toString()].id = id.toString()
                });
            }

            authorizedCharacters = newCharacters;
        }
    }

    save() {
        if (authorizedCharacters !== undefined) {
            authorizedCharacters[this.id] = this;
            authorizedCharactersStore.set('authorizedCharacters', authorizedCharacters);
        }
    }
}

AuthorizedCharacter.load();

export default AuthorizedCharacter;
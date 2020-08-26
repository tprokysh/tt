import knex from 'knex';
import knexConfig from './../knexfile';
import mysql from 'mysql';
import * as models from './models/';

export default class Database {
    constructor() {
        this.connection = this.__connect();
    }

    __connect() {
        return knex(knexConfig[process.env.NODE_ENV || 'development']);  
    }

    async getModel(modelName) {
        return new models[modelName](this);
    }
}
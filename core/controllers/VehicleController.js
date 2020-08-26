import BaseController from "./BaseController";

export default class VehicleController extends BaseController {
    constructor(container) {
        super(container);
    }

    async create(req, res) {
        const data = req.body;
        const validationRules = {
            number: 'required|string',
            model: 'required|string',
            type: 'required|string',
            bought_at: 'required|date',
            status: 'required|string',
        }

        const isNotValidData = this.validateModel(res, data, validationRules);

        if (isNotValidData) {
            return isNotValidData
        }
        
        return this.makeLogic({
            res,
            message: 'Vehicle sucessfully created!',
            model: await this.container.db.getModel('Vehicle'),
            method: 'create',
            data: [ data ]
        });
    }

    async show(req, res) {
        const id = req.params.id;
        const validationRules = {
            id: 'required|integer',
        }

        const isNotValidData = this.validateModel(res, { id }, validationRules);
        
        if (isNotValidData) {
            return isNotValidData;
        }

        return this.makeLogic({
            res,
            message: '',
            model: await this.container.db.getModel('Vehicle'),
            method: 'show',
            data: [ id ]
        });
    }

    async index(res) {
        return this.makeLogic({
            res,
            message: '',
            model: await this.container.db.getModel('Vehicle'),
            method: 'index',
            data: [ ]
        });
    }

    async update(req, res) {
        const data = req.body;
        const id = req.params.id;
        const validationRules = {
            id: 'integer',
            number: 'string',
            model: 'string',
            type: 'string',
            bought_at: 'string',
            status: 'string',
        }

        const isNotValidData = this.validateModel(res, { id, ...data }, validationRules);

        if (isNotValidData) {
            return isNotValidData;
        }

        return this.makeLogic({
            res,
            message: 'Vehicle sucessfully updated!',
            model: await this.container.db.getModel('Vehicle'),
            method: 'update',
            data: [ data ]
        });
    }

    async delete(req, res) {
        const id = req.params.id;
        const validationRules = {
            id: 'required|integer',
        }

        const isNotValidData = this.validateModel(res, { id }, validationRules);

        if (isNotValidData) {
            return isNotValidData;
        }

        return this.makeLogic({
            res,
            message: 'Vehicle sucessfully deleted!',
            model: await this.container.db.getModel('Vehicle'),
            method: 'delete',
            data: [ id ]
        });
    }

    async getAllAvailbleVehicles(res) {
        return this.makeLogic({
            res,
            message: '',
            model: await this.container.db.getModel('Vehicle'),
            method: 'getAllAvailableVehicles',
            data: []
        });
    }
}
import BaseController from "./BaseController";

export default class RouteController extends BaseController {
    constructor(container) {
        super(container);
    }

    async create(req, res) {
        const data = req.body;
        const validationRules = {
            first_city: 'required|string',
            second_city: 'required|string',
            distance_between_cities: 'required|integer',
            departure_date: 'required|date',
            vehicle_type: 'required|string',
            expected_profit: 'required|integer',
            vehicle_id: 'required|integer',
            status: 'required|string',
            completed_at: 'required|date',
        }

        const isNotValidData = this.validateModel(res, data, validationRules);

        if (isNotValidData) {
            return isNotValidData
        }

        return this.makeLogic({
            res,
            message: 'Route successfully created!',
            model: await this.container.db.getModel('Route'),
            method: 'create',
            data: [ data ]
        });
    }

    async update(req, res) {
        const data = req.body;
        const validationRules = {
            first_city: 'required|string',
            second_city: 'required|string',
            distance_between_cities: 'required|integer',
            departure_date: 'required|date',
            vehicle_type: 'required|string',
            expected_profit: 'required|integer',
            vehicle_id: 'required|integer',
            status: 'required|string',
            completed_at: 'required|date',
        }

        const isNotValidData = this.validateModel(res, data, validationRules);

        if (isNotValidData){
            return isNotValidData;
        }

        return this.makeLogic({
            res,
            message: 'Route successfully updated!',
            model: await this.container.db.getModel('Route'),
            method: 'update',
            data: [ data ]
        });
    }

    async delete(req, res) {
        const validationRules = {
            id: 'required|integer',
        }

        const isNotValidData  = this.validateModel(res, req.params, validationRules);

        if (isNotValidData) {
            return isNotValidData;
        }

        return this.makeLogic({
            res,
            message: 'Route successfully deleted!',
            model: await this.container.db.getModel('Route'),
            method: 'delete',
            data: [ req.params.id ]
        });
    }

    async show(req, res) {
        const validationRules = {
            id: 'required|integer',
        }
        const isNotValidData =  this.validateModel(res, req.params.id, validationRules);

        if (isNotValidData) {
            return isNotValidData;
        }

        return this.makeLogic({
            res,
            message: '',
            model: await this.container.db.getModel('Route'),
            method: 'show',
            data: [ req.params.id ]
        });
    }

    async index(req, res) {
        return this.makeLogic({
            res,
            message: '',
            model: await this.container.db.getModel('Route'),
            method: 'index',
            data: [ req.params.id ]
        });
    }
}
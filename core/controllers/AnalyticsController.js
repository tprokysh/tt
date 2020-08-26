import BaseController from './BaseController';

export default class AnalyticsController extends BaseController {
    constructor(container) {
        super(container);
    }

    async index(req, res) {
        return this.makeLogic({
            res,
            message: '',
            model: await this.container.db.getModel('Analytics'),
            method: 'getAnalyticsData',
            data: []
        });
    }
}
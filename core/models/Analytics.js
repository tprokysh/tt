export default class Analytics {
    constructor(db) {
        this.connection = db.connection;
        this.db = db;
    }

    async getAnalyticsData() {
        const routeModel = await this.db.getModel('Route');

        const completeRoutesCount = await routeModel.countCompleteRoutes();
        const avarageRoutesDistance = await routeModel.getAvarageRoutesDistance();
        const profitByDateAndVehicleType = await routeModel.getProfitByDateAndVehicleType();

        return {
            complete_routes_count: completeRoutesCount[0]['count(*)'],
            avarage_routes_distance: avarageRoutesDistance
        };
    }
}
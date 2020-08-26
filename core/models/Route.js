import Vehicle from './Vehicle';

export default class Route {
    constructor(db) {
        this.connection = db.connection;
        this.db = db;
        this.table = 'route';
    }

    async create(prototype) {
        const vehicleModel  = new Vehicle(this.db);
        const vehicle = await vehicleModel.show(prototype.vehicle_id);

        if (!vehicle) {
            throw new Error('Provided vehicle not found!');
        }

        if (prototype.status === 'IN_PROGRESS') {
            await vehicleModel.update({id: prototype.vehicle_id, status: 'UNAVAILABLE'});
        } else if (prototype.status === 'COMPLETE') {
            await vehicleModel.update({id: prototype.vehicle_id, status: 'AVAILABLE'});
        }

        prototype.created_at = new Date().toISOString();

        try {
            return await this.connection(this.table).insert(prototype).then((result) => {
                return this.connection(this.table).where('id', result[0]).first();
            });
        } catch (error) {
            console.error('Error in Route Model create(): ', error.message);
            throw new Error('Error while creating the route!');
        }
    }

    async delete(id) {
        const vehicleModel  = new Vehicle(this.db);
        const vehicle = await vehicleModel.show(id);

        if (!vehicle) {
            throw new Error('Provided vehicle not found!');
        }

        await vehicleModel.update({status: 'AVAILABLE'}).where('id', vehicle.id);

        try {
            return await this.connection(this.table).where('id', id).update({
                deleted_at: new Date().toISOString()
            }).then((result) => {
                return result;
            });
        } catch (error) {
            console.error('Error in Route Model deleted(): ', error.message);
            throw new Error('Error while route deleting!');
        }
    }

    async update(prototype) {
        const route = await this.getRouteById(prototype.id);

        if (!route) {
            return false;
        }

        const vehicleModel  = new Vehicle(this.db);
        const vehicle = await vehicleModel.show(prototype.vehicle_id);

        if (!vehicle) {
            throw new Error('Provided vehicle not found!');
        }

        if (prototype.transport_type !== vehicle.type) {
            throw new Error('Type of the vehicle is not available for this route!');
        }

        if (prototype.status === 'IN_PROGRESS') {
            await vehicleModel.update({id: prototype.vehicle_id, status: 'UNAVAILABLE'});
        } else if (prototype.status === 'COMPLETE') {
            await vehicleModel.update({id: prototype.vehicle_id, status: 'AVAILABLE'});
        }

        try {
            return  await this.connection(this.table).where('id', prototype.id).update(prototype).then((result) => {
                return this.connection(this.table).where('id', result).first();
            });
        } catch (error) {
            console.error('Error  in Route Model update():', error.message);
            throw new Error('Error while updating route info!');
        }
    }

    async show(id) {
        try {
            const route = await this.connection(this.table).where('id', id).whereNull('deleted_at');

            if (!route) {
                throw new Error(`Route  with id ${id} not found!`);
            }

            return route;
        } catch (error) {
            console.error('Error in Route Model show():', error.message);
            throw new Error('Error while getting route!');
        }
    }

    async index() {
        try {
            return this.connection(this.table).select().whereNull('deleted_at');
        }  catch (error) {
            console.error('Error in Route Model index():', error.message);
            throw new Error('Error while getting routes!');
        }
    }

    async getRouteById(id) {
        try {
            return this.connection(this.table).where('id', id);
        } catch (error) {
            console.error('Error in Route Model getRouteById(): ', error.message);
            throw new Error('Error while updating vehicle info!');
        }
    }

    async countCompleteRoutes() {
        try {
            return this.connection(this.table).where('status', 'COMPLETE').count();
        } catch (error) {
            console.error('Error in Route Model countCompleteRoutes():', error.message);
            throw new Error('Error while getting complete routes');
        }
    }

    async getAvarageRoutesDistance() {
        try {
            const routesDistances = await this.connection(this.table).select('distance_between_cities').whereNull('deleted_at');
            
            if (routesDistances.length === 0) {
                return 0;
            }

            let sum = 0;

            routesDistances.map(route => {
                sum += route.distance_between_cities
            });

            return sum / routesDistances.length;
        } catch (error) {
            console.error('Error in Route Model getAvarageRoutesDistance():', error.message);
            throw new Error('Error while count avarage routes distance!');
        }
    }

    async setUpdatedAt(id) {
        try {
            return await this.connection(this.table).where('id', id).update({
                updated_at: new Date().toISOString()
            });
        } catch (error) {
            console.error('Error in Vehicle Model setUpdatedAt(): ', error.message);
            throw new Error('Error while updating vehicle info!');
        }
    }
}
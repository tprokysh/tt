export default class Vehicle {
    constructor(db) {
        this.connection = db.connection;
        this.db = db;
        this.table = 'vehicle';
    }

    async create(prototype) {
        prototype.created_at = new Date().toISOString();
        try {
            return await this.connection(this.table).insert(prototype).then((result) => {
                return this.connection(this.table).where('id', result[0]).first();
            });
        } catch (error) {
            console.error('Error in Vehicle Model create(): ', error.message)
            throw new Error('Error while creating the vehicle!');
        }
    }

    async show(id) {
        try {
            const vehicle = await this.connection(this.table).where('id', id).whereNull('deleted_at');

            if (!vehicle) {
                throw new Error(`Vehicle with id ${id} not found!`);
            }

            return vehicle;
        } catch (error) {
            console.error('Error in Vehicle Model show(): ', error.message)
            throw new Error('Error while getting vehicle information!');
        }
    }

    async index() {
        try {
            return await this.connection(this.table).select().whereNull('deleted_at');
        } catch (error) {
            console.error('Error in Vehicle Model index(): ', error.message);
            throw new Error('Error while getting vehicles!');
        }
    }

    async update(prototype) {
        try {
            return this.connection(this.table).where('id', prototype.id).update(prototype).then((result) => {
                this.setUpdatedAt(prototype.id)
                return this.connection(this.table).where('id', result);
            });
        } catch (error) {
            console.error('Error in Vehicle Model update(): ', error.message);
            throw new Error('Error while updating vehicle info!');
        }
    }

    async delete(id) {
        try {
            const result = await this.connection(this.table).where('id', id).update({
                deleted_at: new Date().toISOString()
            }).then((result) => {
                return result
            });

            return result;
        } catch (error) {
            console.error('Error in Vehicle Model delete(): ', error.message);
            throw new Error('Error while deleting vehicle!');
        }
    }

    async getAllAvailableVehicles() {
        try {
            return await this.connection(this.table).select().whereNull('deleted_at').where('status', 'AVAILABLE');
        } catch (error) {
            console.error('Error in Vehicle Model index(): ', error.message);
            throw new Error('Error while getting vehicles!');
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
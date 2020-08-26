
exports.up = function(knex) {
    return knex.schema.createTable('vehicle', function (table) {
        table.increments();
        table.string('number');
        table.string('model');
        table.enu('type', ['HEAVY', 'LIGHT']);
        table.datetime('bought_at');
        table.integer('mileage');
        table.enu('status', ['AVAILABLE', 'UNAVAILABLE']);
        table.timestamps();
        table.datetime('deleted_at');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('vehicle');
};

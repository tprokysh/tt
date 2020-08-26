
exports.up = function(knex) {
    return knex.schema.createTable('route', function (table) {
        table.increments();
        table.string('first_city');
        table.string('second_city');
        table.integer('distance_between_cities');
        table.datetime('departure_date');
        table.enu('vehicle_type', ['HEAVY', 'LIGHT']);
        table.integer('expected_profit');
        table.integer('vehicle_id').unsigned();
        table.enu('status', ['AVAILABLE', 'IN_PROGRESS', 'COMPLETE']);
        table.timestamps();
        table.datetime('completed_at');
        table.datetime('deleted_at');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('route');
};

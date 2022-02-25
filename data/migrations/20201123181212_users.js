exports.up = function (knex) {
  return knex.schema.createTable('users', users => {
    users.increments('user_id');
    users.string('username', 255).notNullable().unique();
    users.string('password', 255).notNullable();
  })
  .createTable('jokes', table => {
    table.increments('jokes_id')
    table.string('unique_id', 30).notNullable().unique()
    table.string('joke', 255).notNullable()
    table.integer('user_id')
    .unsigned()
    .notNullable()
    .references('user_id')
    .inTable('users')
    .onUpdate('CASCADE')
    .onDelete('CASCADE')
  })
};

exports.down = function (knex) {
  return knex.schema
  .dropTableIfExists('jokes')
  .dropTableIfExists('users');
};

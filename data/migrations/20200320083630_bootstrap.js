
exports.up = function(knex) {
    return knex.schema
    .createTable('Projects', tbl => {
        tbl.increments();

        tbl.string('name', 128).notNullable().unique();

        tbl.string('description', 512);

        tbl.boolean('completed', 10).notNullable().unique();
    })

    .createTable('Resources', tbl => {
        tbl.increments();

        tbl.string('name', 128).notNullable().unique();

        tbl.string('description', 512);

        tbl.integer('project_id', 10).unsigned().notNullable().references("id").inTable("Projects").onUpdate("CASCADE");
    })
  

    .createTable('Tasks', tbl => {
        tbl.increments();

        tbl.string('name', 128).notNullable().unique();

        tbl.string('description', 512).notNullable();

        tbl.boolean('completed', 10).notNullable().unique();

        tbl.integer('project_id', 10).unsigned().notNullable().references("id").inTable("Projects").onUpdate("CASCADE");

        tbl.string('notes', 512);
    })


    .createTable('Project-Task', tbl => {
        //double primary key
      tbl.primary(["project_id", "task_id"])
  
      tbl.integer('project_id', 128).unsigned().notNullable().references("id").inTable("project").onUpdate("CASCADE");
  
      tbl.integer('task_id', 128).unsigned().notNullable().references("id").inTable("task").onUpdate("CASCADE");
    })
};

exports.down = function(knex) {
    return knex.schema
  .dropTableIfExists("Projects")
  .dropTableIfExists("Resources")
  .dropTableIfExists("Tasks")
  .dropTableIfExists("Project-Task");
};

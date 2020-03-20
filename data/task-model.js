const db = require('./db-config.js');

module.exports = {
    find,
    findById,
    update,
    findSteps,
    remove,
    addStep,
    add,
}


// Tasks Table
function add(task) {
    return db('tasks')
        .insert(task)
        .then(id => {
            return findById(id[0]);
        });
}

// select Tasks.*, Projects.name, Projects.description X
// from Tasks X
// join Projects on Projects.id = Tasks.project_id;

function find() {
    return db("tasks")
        .join("projects", "projects.id", "tasks.project_id")
        .select("tasks.id as Task_ID", "tasks.name as Task_Name", "projects.name as Project_Name", "projects.description as Project_Desc", "tasks.description as Task_Desc", "tasks.notes as Task_Notes",);
        
}



// function find() {
//     return db('tasks')
//         .join('tasks', 'projects.id', 'tasks.project_id')
//         .select('tasks.id', 'projects.name', 'projects.description');
// }
// *************************

function findById(id) {
    return db("resources")
    .where({ id })
    .first();
}

function update(changes, id) {
    return db("resources")
    .where({ id })
    .update(changes)
    .then(() => {
        return findById(id);
    })
}

function findSteps(id) {
    return db("schemes as sch")
        .join("steps as st", "sch.id", "st.scheme_id")
        .select("st.id", "sch.scheme_name", "st.step_number", "st.instructions")
        .orderBy("st.step_number")
        .where("st.scheme_id", id);
}

function remove(id) {
    return db("schemes")
        .where("id", id)
        .del();
}

function addStep(step, scheme_id) {
    const newStep = {
        scheme_id: scheme_id,
        step_number: step.step_number,
        instructions: step.instructions
    };
    return db("steps")
        .insert(newStep)
        .then(id => {
            return findSteps(scheme_id);
        });
}

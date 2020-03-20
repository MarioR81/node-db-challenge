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
// Projects table
function find() {
    return db('projects');
}

// Projects Table
function add(project) {
    return db('projects')
        .insert(project)
        .then(id => {
            return findById(id[0]);
        });
}
// *************************

function findById(id) {
    return db("projects")
    .where({ id })
    .first();
}

function update(changes, id) {
    return db("projects")
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


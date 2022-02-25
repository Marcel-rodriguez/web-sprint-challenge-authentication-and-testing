const db = require('../../data/dbConfig')

function find(){
    return db('users')
    .select('user_id', 'username')
}

function findById(id){
    return db('users')
    .select('user_id', 'username')
    .where('user_id', id)
    .first()
}

function findBy(filter){
    return db('users')
    .select('user_id', 'username', 'password')
    .where(filter)
    .first()
}

async function add(user){
    const [id] = await db('users')
    .insert(user)

    const newUser = await db('users')
    .select('user_id', 'username')
    .where('user_id', id)
    .first()

    return newUser
}

module.exports = {
    find,
    add,
    findById,
    findBy
}
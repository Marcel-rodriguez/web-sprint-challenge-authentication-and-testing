const db = require('../../data/dbConfig')

function find(){
    return db('jokes as j')
    .leftJoin('users as us', 'us.user_id', 'j.user_id')
    .select('us.user_id','us.username', 'j.joke')
    .groupBy('us.user_id')
    .orderBy('us.user_id')
}

module.exports = {
    find,
}
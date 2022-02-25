const jokes = [
    {
      unique_id: "0189hNRf2g",
      joke: "I'm tired of following my dreams. I'm just going to ask them where they are going and meet up with them later.",
      user_id: 2,
    },
    {
      unique_id: "08EQZ8EQukb",
      joke: "Did you hear about the guy whose whole left side was cut off? He's all right now.",
      user_id: 3,
    },
    {
      unique_id: "08xHQCdx5Ed",
      joke: "Why didn’t the skeleton cross the road? Because he had no guts.",
      user_id: 1,
    },
]

const users = [
    {username: "bob", password: "$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq"}, //password 1234
    {username: "mike", password: "$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq"}, //password 1234
    {username: "jane", password: "$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq"}, //password 1234
]


exports.seed = async function(knex){
    await knex('users').insert(users)
    await knex('jokes').insert(jokes)
}
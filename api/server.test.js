const server = require('../api/server')
const request = require('supertest')
const db = require('../data/dbConfig')

const user1 = {username: 'test1', password: 'test123'}
const user2 = {username: 'test2', password: 'test123'}
const user3 = {username: 'test1', password: 'test124'}

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

beforeEach(async () => {
  await db('users').truncate()
  await db('jokes').truncate()
})

afterAll(async () => {
  await db.destroy()
})

// Write your tests here
test('sanity', () => {
  expect(process.env.NODE_ENV).toBe('testing')
})

describe('Return users', () => {
  beforeEach(async () => {
    await db('users').insert(user1)
    await db('users').insert(user2)
  })
  test('returns a list of all users', async () => {
    const users = await request(server).get('/api/users/')
    expect(users.body).toHaveLength(2)
  })
  test('returns the correct user objects', async () => {
    const users = await request(server).get('/api/users/')
    expect(users.body).toEqual([
      {user_id: 1, username: 'test1'},
      {user_id: 2, username: 'test2'}
    ])
  })
})

describe('[POST] /Register', () => {
  test('Can add user to the database', async () => {
    await request(server).post('/api/auth/register').send(user1)
    const users = await db('users')
    expect(users).toHaveLength(1)
  })
  test('returns the new user after adding to the db', async () => {
    const newUser = await request(server).post('/api/auth/register').send(user1)
    expect(newUser.body).toEqual({user_id: 1, username: 'test1'})
  })
})

describe('[POST] /Login', () => {
  beforeEach(async () => {
    await request(server).post('/api/auth/register').send(user1)
  })
  test('returns the correct OBJ shape when logging in a user', async () => {
   const resp = await request(server).post('/api/auth/login').send(user1)
   expect(resp.body).toHaveProperty("message")
   expect(resp.body).toHaveProperty("token")
  })
  test('returns error message if invalid credentials', async () => {
    const resp = await request(server).post('/api/auth/login').send(user3)
    expect(resp.body).toEqual({message: 'Invalid Credentials'})
  })
})
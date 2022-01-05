const { MongoClient } = require('mongodb');
const { userSignup } = require('../db');

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
    });
    db = await connection.db(global.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should signup a user into collection', async () => {
    const users = db.collection('Users');

    const mockUser = { username: 'test', password: '1234', id: 10 };
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({username: 'test'});
    expect(insertedUser).toEqual(mockUser);
  });

  it('should insert a doc into collection', async () => {
    const users = db.collection('Users');

    const mockUser = { username: 'test', password: '1234', id: 10 };
    await userSignup(mockUser);

    const insertedUser = await users.findOne({username: 'test'});
    expect(insertedUser).toEqual(mockUser);
  });
});

import { MongoClient } from 'mongodb';
import{ userSignup } from '../dist/db';
import "regenerator-runtime/runtime.js";

describe('insert', () => {
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

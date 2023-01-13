import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import { DataSource, LessThan } from 'typeorm';
import { User } from '../../src/model/User';
import UserService from '../../src/service/UserService';
import { makeInMemoryDatabase } from '../Util';

describe('User Service', () => {
  let userService : UserService, dataSource : DataSource;

  beforeAll( async () => {
    dataSource = await makeInMemoryDatabase([User]);
    userService = new UserService(dataSource);

    let user = new User();
    user.id = 1;
    user.age = 19;
    user.firstName = "João Gabarito";
    user.lastName = "Corner";

    if(dataSource.isInitialized){
      dataSource.getRepository(User).insert(user);

    }
  });

  afterAll(() => {
    return dataSource.destroy();
  });

  test('Should find one user with id 1 in database', async () => {
    let user = await userService.findById(1);
    expect(user.id).toBe(1);
  });
});
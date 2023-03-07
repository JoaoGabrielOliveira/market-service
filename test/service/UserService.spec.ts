import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import { DestroyDataSource, GetRepository } from '../../src/database/data-source';
import { User } from '../../src/model/User';
import UserService from '../../src/service/UserService';
import { makeInMemoryDatabase } from '../Util';

describe('User Service', () => {
  let userService : UserService;

  beforeAll( async () => {
    await makeInMemoryDatabase([User]);
    userService = new UserService();

    let user = new User();
    user.id = 1;
    user.age = 19;
    user.firstName = "João Gabarito";
    user.lastName = "Corner";

    GetRepository(User).insert(user);
  });

  afterAll(() => {
    return DestroyDataSource();
  });

  test('Should find one user with id 1 in database', async () => {
    let user = await userService.findById(1);
    expect(user.id).toBe(1);
  });
});
import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import { getAllUsers } from '../../src/controller/User';
import httpMocks from "node-mocks-http";
import UserDAO from '../../src/dao/UserDAO';
import { makeInMemoryDatabase } from '../Util';
import { User } from '../../src/model/User';
import { DestroyDataSource } from '../../src/database/data-source';

describe('User Controller', () => {
    beforeAll(async () => {
        
    });

    afterAll(async () => {
        await DestroyDataSource();
    });

    test("Return 200 when a request as send", async () => {
        await makeInMemoryDatabase([User]);

        const request = httpMocks.createRequest({
            method: 'GET',
            url: '/users',
        }), response = httpMocks.createResponse();
        
        await getAllUsers(request, response);
        const responseBody = response._getJSONData();

        expect(response.status).toBe(200);
        expect(Array.isArray(responseBody)).toBe(true);
        expect(responseBody[0] instanceof UserDAO).toBe(true);
    })

});
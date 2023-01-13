import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import { BaseEntity, Column, DataSource, Entity, LessThan, PrimaryGeneratedColumn } from 'typeorm';
import BaseService from '../../src/service/BaseService';
import SendEvent from '../../src/util/Event';
import { makeInMemoryDatabase } from '../Util';


@Entity()
class MockModel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string 

    @Column()
    age: number
}

class MockService extends BaseService<MockModel> {
    constructor(dataSource : DataSource){
        super();
        this.repository = dataSource.getRepository(MockModel);
    }
}

describe('User Service', () => {
    let mockService : MockService, dataSource : DataSource;
  
    beforeAll( async () => {
      dataSource = await makeInMemoryDatabase([MockModel]);
      mockService = new MockService(dataSource);
  
      let model = new MockModel();
      model.id = 1;
      model.age = 19;
      model.firstName = "Jonh";
  
      if(dataSource.isInitialized){
        dataSource.getRepository(MockModel).insert(model);
  
      }
    });
  
    afterAll(() => {
      return dataSource.destroy();
    });
  
    test('Should return an array with all models in database', async () => {
      let models = await mockService.find();
      
      expect(Array.isArray(models)).toBe(true);
      expect(models.length).toBe(1);
    });
  
    test('Should return an array with all models with age lower than 25 in database', async () => {
      let models = await mockService.find({ where: { age: LessThan(25)}});
      
      expect(Array.isArray(models)).toBe(true);
      models.forEach(user => {
        const isAgeOfUserLowerThan25 = user.age < 25;
        expect(isAgeOfUserLowerThan25).toBe(true);
      });
  
  
      models = await mockService.findBy({ age: LessThan(25)});
    });
  
    test('Should find one user with id 1 in database', async () => {
      let user = await mockService.findOneBy({id: 1});
      expect(user.id).toBe(1);
    });
  
    test('Should find one user by the first name "Jonh" in database', async () => {
      let user = await mockService.findOneBy({firstName: "Jonh"});

      expect(user).toBeTruthy();
      expect(user.firstName).toBe("Jonh");

    });
  });
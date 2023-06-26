import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Driver } from './entity/driver.entity';
import { DriverService } from './driver.service';

const testFirstName1 = 'First 1';
const testLastName1 = 'Last 1';

const driverArray = [
  new Driver(testFirstName1, testLastName1, 22),
  new Driver('First 2', 'Last 2', 22),
  new Driver('First 3', 'Last 3', 22),
];

const oneDriver = new Driver(testFirstName1, testLastName1, 22);
let deletedResult = new DeleteResult()
deletedResult.affected = 1

describe('DriverService', () => {
  let service: DriverService;
  let repo: Repository<Driver>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DriverService,
        {
          provide: getRepositoryToken(Driver),
          useValue: {
            find: jest.fn().mockResolvedValue(driverArray),
            findOneBy: jest.fn().mockResolvedValue(oneDriver),
            create: jest.fn().mockResolvedValue(oneDriver),
            save: jest.fn().mockResolvedValue(oneDriver),
            update: jest.fn().mockResolvedValue(oneDriver),
            delete: jest.fn().mockResolvedValue(deletedResult),
          },
        },
      ],
    }).compile();

    service = module.get<DriverService>(DriverService);
    repo = module.get<Repository<Driver>>(getRepositoryToken(Driver));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('getAllPeople', () => {
    it('should return an array of drivers', async () => {
      const drivers = await service.getAllPeople();
      expect(drivers).toEqual(driverArray);
    });
  });
  describe('getDriverById', () => {
    it('should get a single driver', () => {
      const repoSpy = jest.spyOn(repo, 'findOneBy');
      expect(service.getDriverById(1)).resolves.toEqual(oneDriver);
      expect(repoSpy).toBeCalledWith({ id: 1 });
    });
  });
  describe('createDriver', () => {
    it('should successfully create a driver', async () => {
      const createDriverDto = {
        firstName: testFirstName1,
        lastName: testLastName1,
        age: 22,
      }
      const driver = await service.createDriver(createDriverDto);
      expect(driver).toEqual(oneDriver);
      expect(repo.create).toBeCalledTimes(1);
      expect(repo.create).toBeCalledWith(createDriverDto);
      expect(repo.save).toBeCalledTimes(1);
    });
  });
  describe('updateDriver', () => {
    it('should call the update method', async () => {
      const updateDriverDto = {
        firstName: testFirstName1,
        lastName: testLastName1,
        age: 22,
      }
      const driver = await service.updateDriver(
        1,
        updateDriverDto
      );
      expect(driver).toEqual(oneDriver);
      expect(repo.update).toBeCalledTimes(1);
      expect(repo.update).toBeCalledWith(
        1, updateDriverDto);
    });
  });
  describe('deleteDriver', () => {
    it('should return {deleted: true} if deleted', () => {
      expect(service.deleteDriver(1)).resolves.toEqual({ deleted: true });
    });
    it('should return an http exception if no matches found', () => {
      const repoSpy = jest
        .spyOn(repo, 'delete')
        .mockRejectedValueOnce(new HttpException('Driver not found', HttpStatus.NOT_FOUND));
      expect(service.deleteDriver(1)).rejects.toThrow('Driver not found');
      expect(repoSpy).toBeCalledWith({ id: 1 });
      expect(repoSpy).toBeCalledTimes(1);
    });
  });
});
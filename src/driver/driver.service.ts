import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Driver } from './entity/driver.entity';
import { IDriver } from '../interfaces/driver';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
  ) {}

  async getAll(): Promise<Driver[]> {
    return this.driverRepository.find();
  }

  async getDriverById(driverId: string): Promise<IDriver> {
    const driver = await this.driverRepository.findOne({
      where: { id: driverId },
      relations: { cars: true },
    });
    // const driver = await this.driverRepository.findOneBy({ id: driverId });
    if (driver) {
      return driver;
    }
    throw new HttpException('Driver not found', HttpStatus.NOT_FOUND);
  }

  async createDriver(createDriverDto: CreateDriverDto): Promise<Driver> {
    const driver = this.driverRepository.create(createDriverDto);
    return this.driverRepository.save(driver);
  }

  async updateDriver(updateDriverDto: UpdateDriverDto): Promise<Driver> {
    const { id, ...rest } = updateDriverDto;
    await this.driverRepository.update(id, rest);
    const driver = await this.driverRepository.findOneBy({ id });
    if (driver) {
      return driver;
    }
  }

  async deleteDriver(driverId: string) {
    const deletedDriver = await this.driverRepository.delete({ id: driverId });
    if (!deletedDriver.affected) {
      throw new HttpException('Driver not found', HttpStatus.NOT_FOUND);
    }
    return { deleted: true };
  }

  async testQuery(): Promise<Driver> {
    return (
      this.driverRepository
        .createQueryBuilder('driver')
        .leftJoinAndSelect('driver.cars', 'car')
        //.innerJoinAndSelect("driver.cars", "car")
        //.where("driver.firstName = :name", { name: "Sean" })
        .getOne()
    );
  }
}

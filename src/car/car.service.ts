import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entity/car.entity';
import { ICar } from '../interfaces/car';
import { DriverService } from 'src/driver/driver.service';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private carRepository: Repository<Car>,
    private driverService: DriverService,
  ) {}

  async getAllCars(): Promise<Car[]> {
    return this.carRepository.find();
  }

  async getCarById(carId: string): Promise<ICar> {
    const car = await this.carRepository.findOne({
      where: { id: carId },
      relations: { driver: true },
    });
    // const car = await this.carRepository.findOneBy({ id: carId });
    if (car) {
      return car;
    }
    throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
  }

  async createCar(createCarDto: CreateCarDto): Promise<Car> {
    const car = this.carRepository.create(createCarDto);
    return this.carRepository.save(car);
  }

  async updateCar(updateCarDto: UpdateCarDto): Promise<Car> {
    const { id, driverId, ...rest } = updateCarDto;

    const driver = await this.driverService.getDriverById(driverId);
    await this.carRepository.update(id, { ...rest, driver });

    const person = await this.carRepository.findOneBy({ id });
    if (person) {
      return person;
    }
  }

  async deleteCar(carId: string) {
    const deletedCar = await this.carRepository.delete({ id: carId });
    if (!deletedCar.affected) {
      throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
    }
    return { deleted: true };
  }
}

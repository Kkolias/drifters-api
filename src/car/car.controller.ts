import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { CarService } from './car.service';
import { Car } from './entity/car.entity';
import { ICar } from '../interfaces/car';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get('get-all')
  async getAllCar(): Promise<Car[]> {
    return this.carService.getAllCars();
  }
 
  @Get('get-by-id')
  async getCarById(@Query('id') id: string): Promise<ICar> {
    return this.carService.getCarById(id);
  }
 
  @Post("create")
  async createCar(@Body() createCarDto: CreateCarDto): Promise<Car> {
    return this.carService.createCar(createCarDto);
  }
 
  @Put('update')
  async updateCar( @Body() updateCarDto: UpdateCarDto): Promise<Car> {
    return this.carService.updateCar(updateCarDto);
  }
 
  @Delete(':id')
  async deleteCar(@Param('id') id: string) {
    return this.carService.deleteCar(id);
  }
}

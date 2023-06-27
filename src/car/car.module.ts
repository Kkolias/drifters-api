import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entity/car.entity';
import { DriverModule } from '../driver/driver.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Car]),
    DriverModule
  ],
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {}

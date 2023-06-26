import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Driver } from './entity/driver.entity';
import { DriverService } from './driver.service';
import { IDriver } from '../interfaces/driver';

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Get()
  async getAllPeople(): Promise<Driver[]> {
    return this.driverService.getAllPeople();
  }
 
  @Get('get-by-id')
  async getDriverById(@Query('id') id: string): Promise<IDriver> {
    return this.driverService.getDriverById(id);
  }
 
  @Post('create')
  async createDriver(@Body() createDriverDto: CreateDriverDto): Promise<Driver> {
    return this.driverService.createDriver(createDriverDto);
  }
 
  @Put('update')
  async updateDriver( @Body() updateDriverDto : UpdateDriverDto): Promise<Driver> {
    return this.driverService.updateDriver(updateDriverDto);
  }
 
  @Delete(':id')
  async deleteDriver(@Param('id') id: string) {
    return this.driverService.deleteDriver(id);
  }

  // Not actually a PATCH, used for testing!
  @Patch()
  async testQuery(): Promise<Driver> {
    return this.driverService.testQuery();
  }
}

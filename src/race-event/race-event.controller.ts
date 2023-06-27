import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { RaceEventService } from './race-event.service';
import { UpdateRaceEventDto } from './dto/update-race-event.dto';
import { RaceEvent } from './entity/race-event.entity';
import { IRaceEvent } from '../interfaces/race-event';
import { CreateRaceEventDto } from './dto/create-race-event.dto';


@Controller('race-event')
export class RaceEventController {
  constructor(private readonly raceEventService: RaceEventService) {}

  @Get('get-all')
  async getAllRaceEvent(): Promise<IRaceEvent[]> {
    return this.raceEventService.getAllRaceEvents();
  }
 
  @Get('get-by-id')
  async getRaceEventById(@Query('id') id: string): Promise<IRaceEvent> {
    return this.raceEventService.getRaceEventById(id);
  }
 
  @Post("create")
  async createRaceEvent(@Body() createRaceEventDto: CreateRaceEventDto): Promise<IRaceEvent> {
    return this.raceEventService.createRaceEvent(createRaceEventDto);
  }
 
  @Put('update')
  async updateRaceEvent( @Body() updateRaceEventDto: UpdateRaceEventDto): Promise<RaceEvent> {
    return this.raceEventService.updateRaceEvent(updateRaceEventDto);
  }
 
  @Delete('delete')
  async deleteRaceEvent(@Query('id') id: string) {
    return this.raceEventService.deleteRaceEvent(id);
  }
}

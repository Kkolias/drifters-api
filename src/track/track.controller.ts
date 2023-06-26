import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackService } from './track.service';
import { ITrack } from 'src/interfaces/track';
import { Track } from './entity/track.entity';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get('get-all')
  async getAllTrack(): Promise<Track[]> {
    return this.trackService.getAllTracks();
  }
 
  @Get('get-by-id')
  async getTrackById(@Query('id') id: string): Promise<ITrack> {
    return this.trackService.getTrackById(id);
  }
 
  @Post("create")
  async createTrack(@Body() createTrackDto: CreateTrackDto): Promise<ITrack> {
    return this.trackService.createTrack(createTrackDto);
  }
 
  @Put('update')
  async updateTrack( @Body() updateTrackDto: UpdateTrackDto): Promise<ITrack> {
    return this.trackService.updateTrack(updateTrackDto);
  }
 
  @Delete(':id')
  async deleteTrack(@Param('id') id: string) {
    return this.trackService.deleteTrack(id);
  }
}

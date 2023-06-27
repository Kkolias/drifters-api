import { Controller, Get, Post, Body, Delete, Query, Put } from '@nestjs/common';
import { ChampionshipService } from './championship.service';
import { CreateChampionshipDto } from './dto/create-championship.dto';
import { UpdateChampionshipDto } from './dto/update-championship.dto';

@Controller('championship')
export class ChampionshipController {
  constructor(private readonly championshipService: ChampionshipService) {}

  @Post('create')
  create(@Body() createChampionshipDto: CreateChampionshipDto) {
    return this.championshipService.createChampionship(createChampionshipDto);
  }

  @Get('get-all')
  findAll() {
    return this.championshipService.getAll();
  }

  @Get('get-by-id')
  findOne(@Query('id') id: string) {
    return this.championshipService.getChampionshipById(id);
  }

  @Put('update')
  update(@Body() updateChampionshipDto: UpdateChampionshipDto) {
    return this.championshipService.updateChampionship(updateChampionshipDto);
  }

  @Delete('delete')
  remove(@Query() id: string) {
    return this.championshipService.deleteChampionship(id);
  }
}

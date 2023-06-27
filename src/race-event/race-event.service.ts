import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RaceEvent } from './entity/race-event.entity';
import { IRaceEvent } from '../interfaces/race-event';
import { CreateRaceEventDto } from './dto/create-race-event.dto';
import { UpdateRaceEventDto } from './dto/update-race-event.dto';
import { TrackService } from '../track/track.service';
import { ChampionshipService } from '../championship/championship.service';

@Injectable()
export class RaceEventService {
  constructor(
    @InjectRepository(RaceEvent)
    private raceEventRepository: Repository<RaceEvent>,
    private readonly trackService: TrackService,
    private readonly championShipService: ChampionshipService
  ) {}

  async getAllRaceEvents(): Promise<IRaceEvent[]> {
    return this.raceEventRepository.find({ relations: { track: true } });
  }

  async getRaceEventById(id: string): Promise<IRaceEvent> {
    const raceEvent = await this.raceEventRepository.findOne({
      where: { id },
      relations: { track: true },
    });
    // const raceEvent = await this.raceEventRepository.findOneBy({ id: raceEventId });
    if (raceEvent) {
      return raceEvent;
    }
    throw new HttpException('RaceEvent not found', HttpStatus.NOT_FOUND);
  }

  async createRaceEvent(
    createRaceEventDto: CreateRaceEventDto,
  ): Promise<IRaceEvent> {
    const { trackId, championshipId, ...payload } = createRaceEventDto;

    const track = await this.trackService.getTrackById(trackId);
    const championship = await this.championShipService.getChampionshipById(championshipId)

    const raceEvent = this.raceEventRepository.create({ ...payload, track, championship });

    const { id } = await this.raceEventRepository.save(raceEvent);
    return await this.getRaceEventById(id);
  }

  async updateRaceEvent(
    updateRaceEventDto: UpdateRaceEventDto,
  ): Promise<RaceEvent> {
    const { id, trackId, championshipId, ...rest } = updateRaceEventDto;

    const track = await this.trackService.getTrackById(trackId);
    const championship = await this.championShipService.getChampionshipById(championshipId)

    await this.raceEventRepository.update(id, { ...rest, track, championship });

    const person = await this.raceEventRepository.findOne({
      where: { id },
      relations: { track: true },
    });
    if (person) {
      return person;
    }
  }

  async deleteRaceEvent(raceEventId: string) {
    const deletedRaceEvent = await this.raceEventRepository.delete({
      id: raceEventId,
    });
    if (!deletedRaceEvent.affected) {
      throw new HttpException('RaceEvent not found', HttpStatus.NOT_FOUND);
    }
    return { deleted: true };
  }
}

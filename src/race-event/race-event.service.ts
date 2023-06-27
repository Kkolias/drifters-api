import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RaceEvent } from './entity/race-event.entity';
import { IRaceEvent } from '../interfaces/race-event';
import { CreateRaceEventDto } from './dto/create-race-event.dto';
import { UpdateRaceEventDto } from './dto/update-race-event.dto';
import { TrackService } from '../track/track.service';

@Injectable()
export class RaceEventService {
  constructor(
    @InjectRepository(RaceEvent)
    private raceEventRepository: Repository<RaceEvent>,
    private readonly trackService: TrackService,
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
    const { trackId, ...payload } = createRaceEventDto;
    const track = await this.trackService.getTrackById(trackId);
    const raceEvent = this.raceEventRepository.create({ ...payload, track });

    const { id } = await this.raceEventRepository.save(raceEvent);
    return await this.getRaceEventById(id);
  }

  async updateRaceEvent(
    updateRaceEventDto: UpdateRaceEventDto,
  ): Promise<RaceEvent> {
    const { id, trackId, ...rest } = updateRaceEventDto;

    const track = await this.trackService.getTrackById(trackId);
    await this.raceEventRepository.update(id, { ...rest, track });

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

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entity/track.entity';
import { ITrack } from '../interfaces/track';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  async getAllTracks(): Promise<Track[]> {
    return this.trackRepository.find();
  }

  async getTrackById(id: string): Promise<ITrack> {
    const car = await this.trackRepository.findOne({
      where: { id },
    });
    // const car = await this.trackRepository.findOneBy({ id: carId });
    if (car) {
      return car;
    }
    throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
  }

  async createTrack(createTrackDto: CreateTrackDto): Promise<Track> {
    const car = this.trackRepository.create(createTrackDto);
    return this.trackRepository.save(car);
  }

  async updateTrack(updateTrackDto: UpdateTrackDto): Promise<Track> {
    const { id, ...rest } = updateTrackDto;
    await this.trackRepository.update(id, rest);
    const person = await this.trackRepository.findOneBy({ id });
    if (person) {
      return person;
    }
  }

  async deleteTrack(carId: string) {
    const deletedTrack = await this.trackRepository.delete({ id: carId });
    if (!deletedTrack.affected) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    return { deleted: true };
  }
}

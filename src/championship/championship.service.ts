import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateChampionshipDto } from './dto/create-championship.dto';
import { UpdateChampionshipDto } from './dto/update-championship.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Championship } from './entities/championship.entity';
import { IChampionship } from '../interfaces/championship';
import { Repository } from 'typeorm';

@Injectable()
export class ChampionshipService {
  constructor(
    @InjectRepository(Championship)
    private championshipRepository: Repository<Championship>,
  ) {}
  
  async getAll(): Promise<Championship[]> {
    return this.championshipRepository.find();
  }

  async getChampionshipById(championshipId: string): Promise<IChampionship> {
    const championship = await this.championshipRepository.findOne({
      where: { id: championshipId },
      relations: { raceEvents: true },
    });
    // const championship = await this.championshipRepository.findOneBy({ id: championshipId });
    if (championship) {
      return championship;
    }
    throw new HttpException('Championship not found', HttpStatus.NOT_FOUND);
  }

  async createChampionship(createChampionshipDto: CreateChampionshipDto): Promise<Championship> {
    const championship = this.championshipRepository.create(createChampionshipDto);
    return this.championshipRepository.save(championship);
  }

  async updateChampionship(updateChampionshipDto: UpdateChampionshipDto): Promise<Championship> {
    const { id, ...rest } = updateChampionshipDto;
    await this.championshipRepository.update(id, rest);
    const championship = await this.championshipRepository.findOneBy({ id });
    if (championship) {
      return championship;
    }
  }

  async deleteChampionship(championshipId: string) {
    const deletedChampionship = await this.championshipRepository.delete({ id: championshipId });
    if (!deletedChampionship.affected) {
      throw new HttpException('Championship not found', HttpStatus.NOT_FOUND);
    }
    return { deleted: true };
  }
}

import { Championship } from '../../championship/entities/championship.entity';
import { Track } from '../../track/entity/track.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class RaceEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'timestamptz' })
  startsAt: Date;

  @Column({ type: 'timestamptz' })
  endsAt: Date;

  @ManyToOne(() => Track, (track) => track.raceEvents, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'trackId' })
  track: Track;

  @ManyToOne(() => Championship, (championship) => championship.raceEvents, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'championshipId' })
  championship: Championship;
}

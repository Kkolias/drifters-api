import { Track } from 'src/track/entity/track.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

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

  @ManyToOne(() => Track, (track) => track.raceEvents, { cascade: true, onDelete: "CASCADE" })
  @JoinColumn({ name: 'trackId' })
  track: Track;

}

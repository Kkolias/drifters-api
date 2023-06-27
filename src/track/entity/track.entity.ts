import { RaceEvent } from 'src/race-event/entity/race-event.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  country: string;

  @OneToMany(() => RaceEvent, (event) => event.track, {
    eager: true,
  })
  raceEvents: RaceEvent[];

  // @Column()
  // events: Event
}

import { RaceEvent } from 'src/race-event/entity/race-event.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Championship {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  year: number;

  @Column()
  series: string;

  @OneToMany(() => RaceEvent, (event) => event.championship, {
    eager: true,
  })
  raceEvents: RaceEvent[];
}

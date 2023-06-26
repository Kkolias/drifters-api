import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Track {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    country: string;

    // @Column()
    // events: Event
}
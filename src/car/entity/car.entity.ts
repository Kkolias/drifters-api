import { Driver } from "src/driver/entity/driver.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"

@Entity()
export class Car {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    model: string;

    @Column()
    engine: string;

    @Column({nullable: true})
    yearActiveStart: number;

    @Column({nullable: true})
    yearActiveEnd: number;

    @Column({nullable: true})
    torque: number;

    @Column({nullable: true})
    hp: number;

    @ManyToOne(() => Driver, driver => driver.cars)
    @JoinColumn({name: "driverId"})
    driver: Driver;
}
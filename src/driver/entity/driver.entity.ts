import { Car } from "src/car/entity/car.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"

@Entity()
export class Driver {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column()
    country: string;

    @OneToMany(() => Car, car => car.driver, {
      eager: true})
    cars: Car[];

    constructor(firstName: string, lastName?: string, age?: number);
    constructor(firstName: string, lastName: string, age?: number);
    constructor(firstName: string, lastName: string, age: number);
    constructor(firstName?: string, lastName?: string, age?: number);
    constructor(firstName?: string, lastName?: string, age?: number) {
      this.firstName = firstName || '';
      this.lastName = lastName || '';
      this.age = age || NaN;
    }
}
import { ICar } from "./car"

export interface IDriver {
    id?: string
    firstName: string
    lastName: string
    age: number
    country: string
    cars: ICar[]
}
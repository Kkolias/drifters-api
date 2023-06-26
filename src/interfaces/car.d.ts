import { IDriver } from "./driver"

export interface ICar {
    id?: string
    model: string
    engine: string
    yearActiveStart: number | null
    yearActiveEnd: number | null
    torque: number | null
    hp: number | null
    driver: IDriver
}
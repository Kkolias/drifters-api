import { IRaceEvent } from "./race-event"

export interface IChampionship {
    id?: string
    year: number
    series: string
    raceEvents: IRaceEvent[]
}
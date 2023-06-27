import { IRaceEvent } from "./race-event"

export interface ITrack {
    name: string
    id?: string
    country: string
    raceEvents: IRaceEvent[]
}
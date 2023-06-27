import { ITrack } from "./track"

export interface IRaceEvent {
    id?: string
    name: string
    startsAt: Date
    endsAt: Date
    track: ITrack
    
}
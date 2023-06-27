import { IsString, IsNotEmpty, IsDate, IsUUID } from 'class-validator'
export class CreateRaceEventDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsDate()
    startsAt: Date

    @IsNotEmpty()
    @IsDate()
    endsAt: Date

    @IsNotEmpty()
    @IsUUID()
    trackId: string

    @IsNotEmpty()
    @IsUUID()
    championshipId: string
}
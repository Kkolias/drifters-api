import { IsString, IsOptional, IsUUID, IsDate } from 'class-validator'
export class UpdateRaceEventDto {
    @IsUUID()
    id: string

    @IsOptional()
    @IsString()
    name: string

    @IsOptional()
    @IsDate()
    startsAt: Date

    @IsOptional()
    @IsDate()
    endsAt: Date

    @IsOptional()
    @IsUUID()
    trackId: string
}
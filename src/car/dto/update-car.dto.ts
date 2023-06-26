import { IsString, IsOptional, IsUUID } from 'class-validator'
export class UpdateCarDto {
    @IsUUID()
    id: string

    @IsOptional()
    @IsString()
    model: string

    @IsOptional()
    @IsString()
    engine: string

    @IsOptional()
    @IsString()
    yearActiveStart: number | null

    @IsOptional()
    @IsString()
    yearActiveEnds: number | null

    @IsOptional()
    @IsString()
    torque: number | null

    @IsOptional()
    @IsString()
    hp: number | null
}
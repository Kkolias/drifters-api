import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator'
import { Driver } from 'src/driver/entity/driver.entity'
export class CreateCarDto {
    @IsNotEmpty()
    @IsString()
    model: string

    @IsNotEmpty()
    @IsString()
    engine: string

    @IsNotEmpty()
    @IsUUID()
    driverId: Driver

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
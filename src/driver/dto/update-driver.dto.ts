import { IsString, IsInt, Min, Max, IsOptional, IsUUID } from 'class-validator'
export class UpdateDriverDto {
    @IsUUID()
    id: string

    @IsOptional()
    @IsString()
    firstName: string

    @IsOptional()
    @IsString()
    lastName: string

    @IsOptional()
    @IsString()
    country: string

    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(120)
    age: number
}
import { IsString, IsNotEmpty, IsInt, Min, Max } from 'class-validator'
export class CreateDriverDto {
    @IsNotEmpty()
    @IsString()
    firstName: string

    @IsNotEmpty()
    @IsString()
    lastName: string

    @IsNotEmpty()
    @IsString()
    country: string

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Max(120)
    age: number
}
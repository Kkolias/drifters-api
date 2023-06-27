import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateChampionshipDto {
    @IsNotEmpty()
    @IsNumber()
    year: number

    @IsNotEmpty()
    @IsString()
    series: string
}

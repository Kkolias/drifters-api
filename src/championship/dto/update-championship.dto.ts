import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateChampionshipDto {
    @IsNotEmpty()
    @IsUUID()
    id: string
    
    @IsOptional()
    @IsNumber()
    year: number

    @IsOptional()
    @IsString()
    series: string
}

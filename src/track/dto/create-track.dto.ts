import { IsString, IsNotEmpty } from 'class-validator';
export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  country: string;
}

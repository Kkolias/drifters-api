import { IsString, IsNotEmpty, IsUUID } from 'class-validator';
export class UpdateTrackDto {
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  country: string;
}

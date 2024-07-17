import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateDailyViewsDTO {
  @IsString()
  @IsOptional()
  date: string;

  @IsNumber()
  @IsOptional()
  views: number;

  @IsString()
  @IsOptional()
  channel: string;

  @IsString()
  @IsOptional()
  video: string;
}

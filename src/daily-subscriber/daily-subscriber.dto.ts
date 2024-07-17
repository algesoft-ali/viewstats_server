import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateDailySubscriberDTO {
  @IsString()
  @IsOptional()
  date: Date;

  @IsString()
  channel: string;

  @IsNumber()
  @IsOptional()
  subscribers: number;
}

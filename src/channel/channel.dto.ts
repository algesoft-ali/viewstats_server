import { IsString } from "class-validator";

export class CreateChannelDTO {
  @IsString()
  name: string;

  @IsString()
  username: string;

  @IsString()
  logo?: string;

  @IsString()
  country: string;

  @IsString()
  category: string;

  @IsString()
  description: string;

  @IsString()
  createDate?: Date;
}

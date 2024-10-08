import { IsNumber, IsString } from "class-validator";

export class CreateVideoDTO {
  @IsString()
  title: string;

  @IsString()
  thumbnail: string;

  @IsString()
  duration: string;

  @IsString()
  uploadDate: string;

  @IsNumber()
  totalViews: number;

  @IsString()
  type: "long" | "short";

  @IsString()
  category: string;

  @IsString()
  channel: string;

  @IsString()
  ytId: string;
}

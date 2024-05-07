import { IsOptional } from "class-validator";
import { AccesLevel } from "../../../Schema/Enum/AccesLevel";

export class updateSharedDto{
  @IsOptional()
  acceslevel: AccesLevel;

  @IsOptional()
  userID: string


  @IsOptional()
  foldID:string

  @IsOptional()
  docID:string
}

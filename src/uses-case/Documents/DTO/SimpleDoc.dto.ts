import { IsOptional } from "class-validator";

export class SimpleDocDto {


    @IsOptional()
    id: string;

    @IsOptional()
    title: string;

    @IsOptional()
    createdby: String;

    @IsOptional()
    createat: Date;
    
    @IsOptional()
    Updateat: Date;




}
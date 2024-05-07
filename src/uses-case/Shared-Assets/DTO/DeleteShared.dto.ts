import {IsOptional} from "class-validator";

export class DeleteSharedDto{
    @IsOptional()
    UserID: string

    @IsOptional()
    docID: string


    @IsOptional()
    foldID: string

}
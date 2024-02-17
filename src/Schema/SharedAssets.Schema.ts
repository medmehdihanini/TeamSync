import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from "mongoose";
import { Document } from 'mongoose';
import { Role } from "./Enum/Role";
import { AccesLevel } from "./Enum/AccesLevel";


@Schema()
export class  SharedAssets extends Document{


  @Prop({ required: false })
  acceslevel: AccesLevel;

  @Prop({ required: false })
  userid: string;


  @Prop({ required: false })
  folderid: string;

  @Prop({ required: false })
  docid: string;

}
export const SharedAssetsSchema = SchemaFactory.createForClass(SharedAssets);
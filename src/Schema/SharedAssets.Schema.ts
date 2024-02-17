import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from "mongoose";
import { Document } from 'mongoose';
import { Role } from "./Enum/Role";
import { AccesLevel } from "./Enum/AccesLevel";


@Schema()
export class SharedAssets extends Document{


  @Prop({ required: false })
  acceslevel: AccesLevel;

}
export const SharedAssetsSchema = SchemaFactory.createForClass(SharedAssets);
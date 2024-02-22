import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from "mongoose";
import { Document } from 'mongoose';
import { Role } from "./Enum/Role";



@Schema()
export class Settings extends Document{
  @Prop({ required: false })
  cockies: string;

  @Prop({ required: false })
  statut: Boolean;


  @Prop({ required: false })
  enlignestatut: Boolean;

  @Prop({ required: false })
  remember: Boolean;

}
export const SettingsSchema = SchemaFactory.createForClass(Settings);
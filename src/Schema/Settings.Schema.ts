import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from "mongoose";
import { Document } from 'mongoose';
import { Role } from "./Enum/Role";



@Schema()
export class Settings extends Document{
  @Prop({ required: false })
  profilePicture: string; 
}
export const SettingsSchema = SchemaFactory.createForClass(Settings);
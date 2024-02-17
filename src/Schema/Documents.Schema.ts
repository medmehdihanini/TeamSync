import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from "mongoose";
import { Document } from 'mongoose';
@Schema()
export class Documents extends Document {
  @Prop({ required: false })
  title: string;


  @Prop({ required: false })
  content: string;


  @Prop({ required: false })
  createat: Date;


  @Prop({ required: false })
  Updateat: Date;


}

export const DocumentsSchema = SchemaFactory.createForClass(Documents);
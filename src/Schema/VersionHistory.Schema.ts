import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from "mongoose";
import { Document } from 'mongoose';

@Schema()
export class VersionHistory extends Document{


  @Prop({ required: false })
  Action: string;

  @Prop({ required: false })
  TimesTamp: Date;

  @Prop({ required: false })
  documentid: string;


}

export const VersionHistorySchema = SchemaFactory.createForClass(VersionHistory);

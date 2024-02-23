import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from "mongoose";
import { Document } from 'mongoose';
import { CollaboorationLog } from "./CollaboorationLog.Schema";
import { VersionHistory } from "./VersionHistory.Schema";
@Schema()
export class Documents extends Document {
  @Prop({ required: false })
  title: string;


  @Prop({ required: false })
  content: string;


  @Prop({ default: Date.now })
  createat: Date;

  @Prop({ default: Date.now })
  Updateat: Date;

  @Prop({ required: false })
  createdby: String;


  @Prop({ required: false })
  parentfolder: String;


  @Prop({ type:mongoose.Schema.Types.ObjectId, ref: 'CollaboorationLog' })
  CollaboorationLogs?: CollaboorationLog[];


  @Prop({ type:mongoose.Schema.Types.ObjectId, ref: 'VersionHistory' })
  VersionHistorys?: VersionHistory[];
}

export const DocumentsSchema = SchemaFactory.createForClass(Documents);
DocumentsSchema.pre<Documents>('save', function (next) {
  const currentDate = new Date();

  if (!this.createat) {
    this.createat = currentDate;
  }

  this.Updateat = currentDate;

  next();
});
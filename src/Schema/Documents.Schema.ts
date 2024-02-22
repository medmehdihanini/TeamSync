import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from "mongoose";
import { Document } from 'mongoose';
import { CollaboorationLog } from "./CollaboorationLog.Schema";
import { VersionHistory } from "./VersionHistory.Schema";
import { User } from "./User.Schema";
import { Folder } from "./Folder.Schema";
@Schema()
export class Documents extends Document {
  @Prop({ required: false })
  title: string;


  @Prop({ required: false })
  content: string;


  @Prop({ required: false , default: Date.now()})
  createat: Date;


  @Prop({ required: false })
  Updateat: Date;







  @Prop({ type: [{type:mongoose.Schema.Types.ObjectId, ref: 'CollaboorationLog' }],default:[]})
  CollaboorationLogs?: CollaboorationLog[];


  @Prop({ type:[{type:mongoose.Schema.Types.ObjectId, ref: 'VersionHistory' }],default:[]})
  VersionHistorys?: VersionHistory[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createdby?: User;


  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Folder' })
  parentfolder?: Folder;




}

export const DocumentsSchema = SchemaFactory.createForClass(Documents);
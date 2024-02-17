import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from "mongoose";
import { SharedAssets } from "./SharedAssets.Schema";
import { Documents } from "./Documents.Schema";
import { CollaboorationLog } from "./CollaboorationLog.Schema";

@Schema()

export class Folder extends Document{

  @Prop({ required: false })
  foldername: string;


  @Prop({ required: false })
  createdat: Date;

  @Prop({ required: false })
  updateat: Date;

  @Prop({ required: false })
  createdby: String;


  @Prop({ required: false })
  parentfolder: String;


  @Prop({ type:mongoose.Schema.Types.ObjectId, ref: 'Documents' })
  Documents?: Documents[];




}

export const FolderSchema = SchemaFactory.createForClass(Folder);
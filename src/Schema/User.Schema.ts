import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from "mongoose";
import { Document } from 'mongoose';
import { Role } from "./Enum/Role";
import { Settings } from "./Settings.Schema";
import { Folder } from "./Folder.Schema";
import { SharedAssets} from "./SharedAssets.Schema";


@Schema()
export class User extends Document{


  @Prop({ required: false })
  username: string;

  @Prop({ required: false })
  firstname: string;

  @Prop({ required: false })
  lastname: string;

  @Prop({ required: false })
  email: string;

  @Prop()
  password: string;

  @Prop({ required: false })
  Role:Role;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Settings' })
  settings?: Settings;

  @Prop({ type:mongoose.Schema.Types.ObjectId, ref: 'Folder' })
  folders?: Folder[];

  @Prop({ type:mongoose.Schema.Types.ObjectId, ref: 'SharedAssets' })
  sharedassets?: SharedAssets[];
}

export const UserSchema = SchemaFactory.createForClass(User);

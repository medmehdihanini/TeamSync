import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from "mongoose";
import { Document } from 'mongoose';
import { Role } from "./Enum/Role";


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

}

export const UserSchema = SchemaFactory.createForClass(User);

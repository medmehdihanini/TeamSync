import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()

export class Folder extends Document{

  @Prop({ required: false })
  foldername: string;


  @Prop({ required: false })
  createdat: Date;

  @Prop({ required: false })
  updateat: Date;


}

export const FolderSchema = SchemaFactory.createForClass(Folder);
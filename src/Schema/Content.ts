import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from "mongoose";

export class Data {
    @Prop({ required: false })
    text: String;
  }
  
  export class Styles {
    @Prop({ required: false })
    name: String;
  
    @Prop({ required: false })
    value: String;
  }

@Schema()
export class Content extends mongoose.Document {
    
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Document' })
  Documentid: mongoose.Types.ObjectId;

  @Prop({ required: false })
  type: string;

  @Prop({ required: false })
  data: Data;

  @Prop({ required: false })
  styles: Styles[];
}

export const ContentSchema = SchemaFactory.createForClass(Content);

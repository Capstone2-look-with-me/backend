import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type ContactDocument = HydratedDocument<Contact>;

@Schema({ timestamps: true })
export class Contact {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user_id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop()
  avatar: string;

  @Prop({ required: false }) // Mảng các vector 128 số thực
  avatar_encoding: number[][];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);

ContactSchema.index({ user_id: 1 }); 
ContactSchema.index({ name: 1 });    


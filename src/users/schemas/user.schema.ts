import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true })
export class User {
  
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  avatar: string;

  @Prop()
  phone: string;

  @Prop()
  refreshToken: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);
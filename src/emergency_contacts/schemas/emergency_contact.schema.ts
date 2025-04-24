import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type EmergencyContactDocument = HydratedDocument<EmergencyContact>;

@Schema({ timestamps: true })
export class EmergencyContact {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user_id: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Contact', required: false, default: null })
  contact_id?: Types.ObjectId | null;

  @Prop({ required: false, default: null })
  contact_name?: string;

  @Prop({ required: false, default: null })
  phone_number?: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const EmergencyContactSchema = SchemaFactory.createForClass(EmergencyContact);

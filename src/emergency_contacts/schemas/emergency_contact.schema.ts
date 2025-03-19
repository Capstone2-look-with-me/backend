import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class EmergencyContact extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user_id: Types.ObjectId;

  @Prop({
    type: { contact_id: { type: Types.ObjectId, ref: 'Contact' }, contact_name: String, phone_number: String },
  })
  contact: {
    contact_id: Types.ObjectId;
    contact_name: string;
    phone_number: string;
  };
}

export const EmergencyContactSchema = SchemaFactory.createForClass(EmergencyContact);

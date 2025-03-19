import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class DetectedObject extends Document {
  @Prop({ required: true })
  object_name: string;

  @Prop()
  category: string;
}

export const DetectedObjectSchema = SchemaFactory.createForClass(DetectedObject);

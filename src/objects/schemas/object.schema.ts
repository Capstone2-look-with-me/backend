import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type DetectedObjectDocument = HydratedDocument<DetectedObject>

@Schema({ timestamps: true })
export class DetectedObject {
  
  @Prop({ required: true })
  object_name: string;

  @Prop()
  category: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

}

export const DetectedObjectSchema = SchemaFactory.createForClass(DetectedObject);
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

DetectedObjectSchema.index({ object_name: 1 }); // Nếu filter/search object theo tên
DetectedObjectSchema.index({ category: 1 });    // Nếu thống kê hoặc lọc theo loại object

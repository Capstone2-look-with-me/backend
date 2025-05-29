import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type RecognitionResultDocument = HydratedDocument<RecognitionResult>;

@Schema({ timestamps: true })
export class RecognitionResult {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Image', required: true })
  image_id: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'DetectedObject', required: false })
  detected_object_id?: Types.ObjectId;

  @Prop({ type: Number, required: true })
  confidence: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Contact', required: false })
  detected_person_id?: Types.ObjectId;

  @Prop({ type: Boolean, default: false }) 
  is_known: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const RecognitionResultSchema = SchemaFactory.createForClass(RecognitionResult);

RecognitionResultSchema.index({ image_id: 1 });            // Lấy kết quả theo ảnh
RecognitionResultSchema.index({ detected_object_id: 1 });  // Thống kê theo object
RecognitionResultSchema.index({ detected_person_id: 1 });  // Đối chiếu người quen/lạ
RecognitionResultSchema.index({ is_known: 1 });          

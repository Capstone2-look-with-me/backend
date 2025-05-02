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

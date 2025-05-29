import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type ImageDocument = HydratedDocument<Image>;

@Schema({ timestamps: true })
export class Image {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user_id: Types.ObjectId;

  @Prop({ required: true })
  image_url: string;

  @Prop({ required: false }) // Mảng các vector 128 số thực
  image_encoding: number[][];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ImageSchema = SchemaFactory.createForClass(Image);

ImageSchema.index({ user_id: 1 });  // Lấy ảnh theo user
ImageSchema.index({ createdAt: -1 }); // Sắp xếp ảnh gần nhất (nếu có)

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class RecognitionResult extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Image', required: true })
  image_id: Types.ObjectId;

  @Prop({
    type: { object_id: { type: Types.ObjectId, ref: 'Object' }, confidence: Number },
  })
  detected_object: {
    object_id: Types.ObjectId;
    confidence: number;
  };

  @Prop({
    type: { contact_id: { type: Types.ObjectId, ref: 'Contact' }, is_known: Boolean },
  })
  detected_person: {
    contact_id: Types.ObjectId;
    is_known: boolean;
  };
}

export const RecognitionResultSchema = SchemaFactory.createForClass(RecognitionResult);

import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Image, ImageSchema } from './schemas/image.schema';
import { RecognitionResult, RecognitionResultSchema } from 'src/recognition_results/schemas/recognition_result.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]),
    MongooseModule.forFeature([{ name: RecognitionResult.name, schema: RecognitionResultSchema }]),

  ],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}

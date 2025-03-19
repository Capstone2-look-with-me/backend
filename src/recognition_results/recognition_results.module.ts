import { Module } from '@nestjs/common';
import { RecognitionResultsService } from './recognition_results.service';
import { RecognitionResultsController } from './recognition_results.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RecognitionResult, RecognitionResultSchema } from './schemas/recognition_result.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: RecognitionResult.name, schema: RecognitionResultSchema }])],
  controllers: [RecognitionResultsController],
  providers: [RecognitionResultsService],
})
export class RecognitionResultsModule {}

import { Module } from '@nestjs/common';
import { ObjectsService } from './objects.service';
import { ObjectsController } from './objects.controller';
import { DetectedObject, DetectedObjectSchema } from './schemas/object.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: DetectedObject.name, schema: DetectedObjectSchema }])],
  controllers: [ObjectsController],
  providers: [ObjectsService],
})
export class ObjectsModule {}


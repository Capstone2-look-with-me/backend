import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { MulterModule } from '@nestjs/platform-express';
import { HttpModule } from '@nestjs/axios';
import { CloudinaryService } from './common/cloudinary.service';

@Module({
  controllers: [FilesController],
  providers: [FilesService, CloudinaryService],
  imports: [
    HttpModule
  ]
})
export class FilesModule {}

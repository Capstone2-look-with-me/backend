// src/files/files.controller.ts

import {
  Controller, Post, UploadedFile, UseInterceptors, Headers, UseFilters
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorageConfig, memoryStorageConfig } from './multer.config';
import { CloudinaryService } from './common/cloudinary.service';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from 'src/core/http-exception.filter';
import { ApiOperation, ApiBody, ApiConsumes, ApiTags, ApiHeader } from '@nestjs/swagger';

@ApiTags('files')
@Controller('files')
export class FilesController {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly configService: ConfigService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('fileUpload', diskStorageConfig()))
  @UseFilters(new HttpExceptionFilter())
  @ApiOperation({ summary: 'Upload file to local storage' })
  @ApiConsumes('multipart/form-data')
  @ApiHeader({
    name: 'folder_type',
    required: true,
    description: 'The folder to save file into (e.g., avatar)',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        fileUpload: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadFile(@Headers('folder_type') folderType: string, @UploadedFile() file: Express.Multer.File) {
    const host = this.configService.get<string>('HOST');
    const fileUrl = `${host}/images/${folderType}/${file.filename}`;

    return {
      url: fileUrl,
      fileName: file.filename,
    };
  }

  @Post('upload-cloud')
  @UseInterceptors(FileInterceptor('fileUpload', memoryStorageConfig()))
  @UseFilters(new HttpExceptionFilter())
  @ApiOperation({ summary: 'Upload file to Cloudinary' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        fileUpload: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadToCloudinary(@UploadedFile() file: Express.Multer.File) {
    const result = await this.cloudinaryService.upload(file);
    return {
      url: result.secure_url,
      publicId: result.public_id,
      resourceType: result.resource_type,
    };
  }
}

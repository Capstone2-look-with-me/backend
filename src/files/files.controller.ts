import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipeBuilder, HttpStatus, UseFilters, Headers } from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResponseMessage, SkipCheckPermission, User } from 'src/decorator/customize';
import { ApiBody, ApiConsumes, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/core/http-exception.filter';
import { HttpService } from '@nestjs/axios'; 
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@ApiTags('files')
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) { }

  @Post('upload')
  @ResponseMessage("Upload file")
  @UseInterceptors(FileInterceptor('fileUpload'))
  @UseFilters(new HttpExceptionFilter())
  @ApiOperation({ summary: 'Upload a file with custom header' })
  @ApiConsumes('multipart/form-data')
  @ApiHeader({
    name: 'folder_type',
    required: true,
    description: 'The folder name to store the file (e.g., avatar)',
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
  async uploadFile(  @Headers('folder_type') folderType: string, @UploadedFile() file: Express.Multer.File) {
    const host = this.configService.get<string>('HOST');
    const fileUrl = `${host}/images/${folderType}/${file.filename}`;

    return {
      url: fileUrl,
      fileName: file.filename,
    }
  }

}

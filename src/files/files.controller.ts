import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipeBuilder, HttpStatus, UseFilters, Headers } from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResponseMessage, SkipCheckPermission } from 'src/decorator/customize';
import { ApiBody, ApiConsumes, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/core/http-exception.filter';

@ApiTags('files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

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
  uploadFile(  @Headers('folder_type') folderType: string, @UploadedFile() file: Express.Multer.File) {
    return {
      url: `https://backend-p9rt.onrender.com/images/${folderType}/${file.filename}`,
      urlLocal: `http://localhost:8000/images/${folderType}/${file.filename}`,
      fileName: file.filename
    }
  }

}

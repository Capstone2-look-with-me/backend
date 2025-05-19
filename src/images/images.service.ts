import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Image, ImageDocument } from './schemas/image.schema';
import mongoose, { Model } from 'mongoose';
import aqp from 'api-query-params';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RecognitionResult, RecognitionResultDocument } from 'src/recognition_results/schemas/recognition_result.schema';
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary'; 
@Injectable()
export class ImagesService {
  constructor(
    @InjectModel(Image.name) private imageModel: Model<ImageDocument>,
    @InjectModel(RecognitionResult.name) private recognitionResultModel: Model<RecognitionResultDocument>,  
    private readonly configService: ConfigService,

  ) {}
  async create(createImageDto: CreateImageDto) {
    let newImage = await this.imageModel.create({
      ...createImageDto,
    })
    return {
      _id: newImage?._id,
      createdAt: newImage?.createdAt
    }
  }
  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, projection, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    let offset = (currentPage - 1) * limit;
    let defaultLimit = limit ? limit : 10;

    const totalItems = (await this.imageModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.imageModel
      .find(filter)
      .skip(offset)
      .limit(limit)
      .sort(sort as any)
      .populate(population)
      .exec();

    return {
      meta: {
        current: currentPage, //trang hien tai
        pageSize: limit, //so luong ban ghi da lay
        pages: totalPages, //tong so trang voi dieu kien query
        total: totalItems, //tong so phan tu (so ban ghi)
      },
      result, //kết quả query
    };
  }
  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new BadRequestException( `Not found image with id ${id}`);
    return this.imageModel
      .findOne({
        _id: id,
      })
  }
  async update(updateImageDto) {
    return await this.imageModel.updateOne(
      { _id: updateImageDto._id },
      {
        ...updateImageDto,
      },
    );
  }
  async findByUserId(userId: string) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new BadRequestException(`Invalid user_id: ${userId}`);
    }
  
    return this.imageModel.find({ user_id: userId }).exec();
  }

  async remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException( `Not found image`);
    }
    return this.imageModel.deleteOne({
      _id: id,
    });
  }

  // Cron job để kiểm tra ảnh không được sử dụng trong recognition_results sau 24 giờ

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  // @Cron('*/10 * * * * *')

  async handleCron() {
    console.log('Cron job is running...');
    const images = await this.imageModel.find();
    const host = this.configService.get<string>('HOST');
  
    for (const image of images) {
      const used = await this.recognitionResultModel.exists({ image_id: image._id });
  
      if (!used) {
        await this.imageModel.deleteOne({ _id: image._id });
  
        const imageUrl = image.image_url;
  
        if (imageUrl.includes('res.cloudinary.com')) {
          const publicId = this.extractCloudinaryPublicId(imageUrl);
          if (publicId) {
            try {
              await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
              console.log(`Deleted Cloudinary image: ${publicId}`);
            } catch (err) {
              console.error(`Error deleting Cloudinary image: ${publicId}`, err);
            }
          }
        } else {
          const localFilePath = path.join(__dirname, '..', '..', 'public', imageUrl.replace(`${host}/`, ''));
          fs.unlink(localFilePath, (err) => {
            if (err) {
              console.error(`Error deleting file: ${localFilePath}`, err);
            } else {
              console.log(`Deleted unused image: ${localFilePath}`);
            }
          });
        }
      }
    }
  }

  private extractCloudinaryPublicId(url: string): string {
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname; // /your_cloud/image/upload/vXXXX/Cap2/filename.jpg
      const parts = pathname.split('/');
      const uploadIndex = parts.findIndex(part => part === 'upload');
  
      // Skip version (v1747651088), get everything after it
      const publicIdParts = parts.slice(uploadIndex + 2); // Skip "upload" and "vXXXX"
      const publicIdWithExt = publicIdParts.join('/');
      const publicId = publicIdWithExt.replace(/\.[^/.]+$/, ''); // Remove extension
  
      return publicId;
    } catch (e) {
      console.error('Failed to extract publicId from URL', url);
      return null;
    }
  }
  
  
   // Cron expression: Every 3 minutes
   @Cron('*/3 * * * *')
   async handleCronEvery() {
    try {
      const response = await axios.get('https://backend-p9rt.onrender.com/swagger');
    } catch (error) {
      console.error('API Request failed:', error.message);
    }
  }
}

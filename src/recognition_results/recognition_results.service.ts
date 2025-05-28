import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRecognitionResultDto } from './dto/create-recognition_result.dto';
import { UpdateRecognitionResultDto } from './dto/update-recognition_result.dto';
import { InjectModel } from '@nestjs/mongoose';
import { RecognitionResult, RecognitionResultDocument } from './schemas/recognition_result.schema';
import mongoose, { Model } from 'mongoose';
import aqp from 'api-query-params';

@Injectable()
export class RecognitionResultsService {
  constructor(
    @InjectModel(RecognitionResult.name) private recognitionResultModel: Model<RecognitionResultDocument>
  ) {}
  async create(createRecognitionResultDto: CreateRecognitionResultDto) {
    const {confidence} = createRecognitionResultDto;

    if (confidence < 0.5) {
      throw new BadRequestException('Confidence too low. Recognition result not saved.');
    }
    const is_known = confidence >= 0.8;

    let newRecognitionResult = await this.recognitionResultModel.create({
      ...createRecognitionResultDto,
      is_known: is_known,
    })
    return {
      _id: newRecognitionResult?._id,
      createdAt: newRecognitionResult?.createdAt
    }
  }
  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, projection, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    let offset = (currentPage - 1) * limit;
    let defaultLimit = limit ? limit : 10;

    const totalItems = (await this.recognitionResultModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.recognitionResultModel
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
      throw new BadRequestException( `Not found Recognition Result with id ${id}`);
    return this.recognitionResultModel
      .findOne({
        _id: id,
      })
  }
  async update(updateRecognitionResultDto) {
    return await this.recognitionResultModel.updateOne(
      { _id: updateRecognitionResultDto._id },
      {
        ...updateRecognitionResultDto,
      },
    );
  }

  async remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException( `Not found Recognition Result with id ${id}`);
    }
    return this.recognitionResultModel.deleteOne({
      _id: id,
    });
  }

  async findByImageId(imageId: string) {
    if (!mongoose.Types.ObjectId.isValid(imageId)) {
      throw new BadRequestException(`Invalid image_id: ${imageId}`);
    }
  
    return this.recognitionResultModel.find({ image_id: imageId }).exec();
  }

  async findByDetectedObjectId(detectedObjecId: string) {
    if (!mongoose.Types.ObjectId.isValid(detectedObjecId)) {
      throw new BadRequestException(`Invalid detected_object_id: ${detectedObjecId}`);
    }
  
    return this.recognitionResultModel.find({ detected_object_id: detectedObjecId }).exec();
  }

  async findByDetectedPersonId(detectedPersonId: string) {
    if (!mongoose.Types.ObjectId.isValid(detectedPersonId)) {
      throw new BadRequestException(`Invalid detected_person_id: ${detectedPersonId}`);
    }
  
    return this.recognitionResultModel.find({ detected_person_id: detectedPersonId }).exec();
  }
}

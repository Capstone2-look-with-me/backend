import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEmergencyContactDto } from './dto/create-emergency_contact.dto';
import { UpdateEmergencyContactDto } from './dto/update-emergency_contact.dto';
import { InjectModel } from '@nestjs/mongoose';
import { EmergencyContact, EmergencyContactDocument } from './schemas/emergency_contact.schema';
import mongoose, { Model } from 'mongoose';
import aqp from 'api-query-params';
import { UpdateContactDto } from 'src/contacts/dto/update-contact.dto';

@Injectable()
export class EmergencyContactsService {
  constructor(
    @InjectModel(EmergencyContact.name) private emergencyContactModel: Model<EmergencyContactDocument>
  ) {}
  async create(createEmergencyContactDto: CreateEmergencyContactDto) {
    let newContact = await this.emergencyContactModel.create({
      ...createEmergencyContactDto,
    })
    return {
      _id: newContact?._id,
      createdAt: newContact?.createdAt
    }
  }
  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, projection, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    let offset = (currentPage - 1) * limit;
    let defaultLimit = limit ? limit : 10;

    const totalItems = (await this.emergencyContactModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.emergencyContactModel
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
      throw new BadRequestException( `Not found emergency contact with id ${id}`);
    return this.emergencyContactModel
      .findOne({
        _id: id,
      })
  }
  async update(updateEmergencyContactDto) {
    return await this.emergencyContactModel.updateOne(
      { _id: updateEmergencyContactDto._id },
      {
        ...updateEmergencyContactDto,
      },
    );
  }

  async remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException( `Not found emergency contact `);
    }
    return this.emergencyContactModel.deleteOne({
      _id: id,
    });
  }
}

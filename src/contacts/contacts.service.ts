  import { BadRequestException, Inject, Injectable } from '@nestjs/common';
  import { CreateContactDto } from './dto/create-contact.dto';
  import { UpdateContactDto } from './dto/update-contact.dto';
  import { InjectModel } from '@nestjs/mongoose';
  import { Contact, ContactDocument } from './schemas/contact.schema';
  import mongoose, { Model } from 'mongoose';
  import aqp from 'api-query-params';
  import { CACHE_MANAGER } from '@nestjs/cache-manager';
  import { Cache } from 'cache-manager';
import { RedisService } from 'src/redis/redis.service';

  @Injectable()
  export class ContactsService {
    constructor(
      @InjectModel(Contact.name) private contactModel: Model<ContactDocument>,
      // @Inject(CACHE_MANAGER) private cacheManager: Cache,
      private readonly redisService: RedisService


    ) {}
    async create(createContactDto: CreateContactDto) {
      let newContact = await this.contactModel.create({
        ...createContactDto,
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

      const totalItems = (await this.contactModel.find(filter)).length;
      const totalPages = Math.ceil(totalItems / defaultLimit);

      const result = await this.contactModel
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
        throw new BadRequestException( `Not found contact with id ${id}`);
      return this.contactModel
        .findOne({
          _id: id,
        })
    }
    async findByUserId(userId: string) {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new BadRequestException(`Invalid user_id: ${userId}`);
      }
    
      const cacheKey = `contacts:${userId}`;
      let cached = await this.redisService.get(cacheKey);
    
      if (cached) {
        return JSON.parse(cached); // 👉 parse lại thành object
      }
    
      const contacts = await this.contactModel.find({ user_id: userId });
      
      await this.redisService.set(cacheKey, JSON.stringify(contacts), 86400); // 👉 stringify object
    
      return contacts;
    }
    
    async update(updateContactDto) {
      return await this.contactModel.updateOne(
        { _id: updateContactDto._id },
        {
          ...updateContactDto,
        },
      );
    }

    async remove(id: string) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BadRequestException( `Not found contact`);
      }
      return this.contactModel.deleteOne({
        _id: id,
      });
    }
  }

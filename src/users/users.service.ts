import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { IUser } from './users.interface';
import aqp from 'api-query-params';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  getHashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  };

  async create(createUserDto: CreateUserDto) {
    //async create(email: string, password : string, name : string) {
    const hashPassword = this.getHashPassword(createUserDto.password);
    const isExist = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (isExist) {
      throw new BadRequestException(`Email đã tồn tại`);
    }
    let newUser = await this.userModel.create({
      ...createUserDto,
      password: hashPassword,
    });
    return newUser;
  }

  async register(user: RegisterUserDto) {
    const { name, email, password,phone } = user;
    const hashPassword = this.getHashPassword(password);
    const isExist = await this.userModel.findOne({ email });
    if (isExist) {
      throw new BadRequestException(`Email đã tồn tại`);
    }
    //fetch user role
    let newRegister = await this.userModel.create({
      name,
      email,
      password: hashPassword,
      phone
    });
    return newRegister;
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, projection, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    let offset = (currentPage - 1) * limit;
    let defaultLimit = limit ? limit : 10;

    const totalItems = (await this.userModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.userModel
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
      throw new BadRequestException( `Not found user with id ${id}`);
    return this.userModel
      .findOne({
        _id: id,
      })
      .select('-password')
  }

  findOneByUsername(username: string) {
    return this.userModel
      .findOne({
        email: username,
      })
  }

  isValidPassword(password: string, hash: string) {
    return compareSync(password, hash);
  }

  async update(updateUserDto) {
    return await this.userModel.updateOne(
      { _id: updateUserDto._id },
      {
        ...updateUserDto,
      },
    );
  }

  async remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException( `Not found user`);
    }
    const foundUser = await this.userModel.findById(id);
    if (foundUser && foundUser.email === 'vovanminhv23@gmai.com') {
      throw new BadRequestException(`You can't delete this user`);
    }
    return this.userModel.deleteOne({
      _id: id,
    });
  }

  updateUserToken = async (refreshToken: string, _id: string) => {
    return await this.userModel.updateOne({ _id }, { refreshToken });
  };
  findUserByToken = async (refreshToken: string) => {
    return await this.userModel.findOne({ refreshToken }).populate({
      path: 'role',
      select: { name: 1 },
    });
  };
  async findById(userId: string){
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  async updatePassword(userId: string, hashedPassword: string){
    return this.userModel
      .findByIdAndUpdate(
        userId,
        {
          password: hashedPassword
        },
        {
          new: true
        }
      )
      .exec()
  }

}

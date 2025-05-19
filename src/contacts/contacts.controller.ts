import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Public, ResponseMessage } from 'src/decorator/customize';
@ApiTags('contacts')

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @ApiBody({ type: CreateContactDto })
  @ResponseMessage("Create a contact")
  @Post()
  async create(
    @Body() createContactDto: CreateContactDto
  ) {

    let newContact = await this.contactsService.create(createContactDto);
    return {
      _id: newContact?._id,
      createdAt: newContact?.createdAt
    }
  }

  @Get()
  @ApiQuery({ name: 'current', required: false, type: Number })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  @ApiQuery({
    name: 'name',
    required: false,
    description: '(e.g: /ReactJs/i)',
    type: String,
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    description: 'Sắp xếp danh sách theo tên biến. Sử dụng `+name` để sắp xếp tăng dần, `-name` để sắp xếp giảm dần.',
  })
  @ResponseMessage('Fetch List Contact with paginate')
  findAll(
    @Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() qs: string
  ) {
    return this.contactsService.findAll(+currentPage, +limit, qs);
  }

  // @Public()
  @Get('user/:userId')
  @ResponseMessage("Fetch contacts by user_id")
  async findByUserId(@Param('userId') userId: string) {
    return this.contactsService.findByUserId(userId);
}
  @Public()
  @Get(':id')
  @ResponseMessage("Fetch contact by id")
  async findOne(@Param('id') id: string) {
    const foundContact = await this.contactsService.findOne(id)
    return foundContact
  }

  @ResponseMessage("Update a Contact")
  @Patch()
  update(@Body() updateContactDto) {
    return this.contactsService.update(updateContactDto);
  }

  @ResponseMessage("Delete a Contact")
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactsService.remove(id);
  }
}

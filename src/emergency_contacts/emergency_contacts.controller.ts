import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EmergencyContactsService } from './emergency_contacts.service';
import { CreateEmergencyContactDto } from './dto/create-emergency_contact.dto';
import { UpdateEmergencyContactDto } from './dto/update-emergency_contact.dto';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Public, ResponseMessage } from 'src/decorator/customize';

@ApiTags('emergency-contacts')

@Controller('emergency-contacts')
export class EmergencyContactsController {
  constructor(private readonly emergencyContactsService: EmergencyContactsService) {}

  @ApiBody({ type: CreateEmergencyContactDto })
  @ResponseMessage("Create a emergency contact")
  @Post()
  async create(
    @Body() createEmergencyContactDto: CreateEmergencyContactDto
  ) {

    let newEmergencyContact = await this.emergencyContactsService.create(createEmergencyContactDto);
    return {
      _id: newEmergencyContact?._id,
      createdAt: newEmergencyContact?.createdAt
    }
  }

  @Get()
  @ApiQuery({ name: 'current', required: false, type: Number })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  @ApiQuery({
    name: 'contact_name',
    required: false,
    description: '(e.g: /ReactJs/i)',
    type: String,
  })
  @ApiQuery({
    name: 'phone_number',
    required: false,
    description: '(e.g: /ReactJs/i)',
    type: String,
  })
  @ResponseMessage('Fetch List emergency contact with paginate')
  findAll(
    @Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() qs: string
  ) {
    return this.emergencyContactsService.findAll(+currentPage, +limit, qs);
  }

  @Get('user/:userId')
  @ResponseMessage("Fetch emergency contact by user_id")
  async findByUserId(@Param('userId') userId: string) {
    return this.emergencyContactsService.findByUserId(userId);
}

  @Public()
  @Get(':id')
  @ResponseMessage("Fetch emergency contact by id")
  async findOne(@Param('id') id: string) {
    const foundContact = await this.emergencyContactsService.findOne(id)
    return foundContact
  }



  @ResponseMessage("Update a emergency contact")
  @Patch()
  update(@Body() updateEmergencyContactDto) {
    return this.emergencyContactsService.update(updateEmergencyContactDto);
  }

  @ResponseMessage("Delete a emergency contact")
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emergencyContactsService.remove(id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmergencyContactsService } from './emergency_contacts.service';
import { CreateEmergencyContactDto } from './dto/create-emergency_contact.dto';
import { UpdateEmergencyContactDto } from './dto/update-emergency_contact.dto';

@Controller('emergency-contacts')
export class EmergencyContactsController {
  constructor(private readonly emergencyContactsService: EmergencyContactsService) {}

  @Post()
  create(@Body() createEmergencyContactDto: CreateEmergencyContactDto) {
    return this.emergencyContactsService.create(createEmergencyContactDto);
  }

  @Get()
  findAll() {
    return this.emergencyContactsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emergencyContactsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmergencyContactDto: UpdateEmergencyContactDto) {
    return this.emergencyContactsService.update(+id, updateEmergencyContactDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emergencyContactsService.remove(+id);
  }
}

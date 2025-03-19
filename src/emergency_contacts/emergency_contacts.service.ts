import { Injectable } from '@nestjs/common';
import { CreateEmergencyContactDto } from './dto/create-emergency_contact.dto';
import { UpdateEmergencyContactDto } from './dto/update-emergency_contact.dto';

@Injectable()
export class EmergencyContactsService {
  create(createEmergencyContactDto: CreateEmergencyContactDto) {
    return 'This action adds a new emergencyContact';
  }

  findAll() {
    return `This action returns all emergencyContacts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} emergencyContact`;
  }

  update(id: number, updateEmergencyContactDto: UpdateEmergencyContactDto) {
    return `This action updates a #${id} emergencyContact`;
  }

  remove(id: number) {
    return `This action removes a #${id} emergencyContact`;
  }
}

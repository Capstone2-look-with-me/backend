import { PartialType } from '@nestjs/mapped-types';
import { CreateEmergencyContactDto } from './create-emergency_contact.dto';

export class UpdateEmergencyContactDto extends PartialType(CreateEmergencyContactDto) {}

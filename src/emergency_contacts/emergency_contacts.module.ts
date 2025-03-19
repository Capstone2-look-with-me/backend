import { Module } from '@nestjs/common';
import { EmergencyContactsService } from './emergency_contacts.service';
import { EmergencyContactsController } from './emergency_contacts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EmergencyContact, EmergencyContactSchema } from './schemas/emergency_contact.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: EmergencyContact.name, schema: EmergencyContactSchema }])],
  controllers: [EmergencyContactsController],
  providers: [EmergencyContactsService],
})
export class EmergencyContactsModule {}

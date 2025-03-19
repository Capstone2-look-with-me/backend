import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactsModule } from './contacts/contacts.module';
import { ObjectsModule } from './objects/objects.module';
import { ImagesModule } from './images/images.module';
import { RecognitionResultsModule } from './recognition_results/recognition_results.module';
import { EmergencyContactsModule } from './emergency_contacts/emergency_contacts.module';

@Module({
  imports: [    MongooseModule.forRoot('mongodb+srv://vvm1004:test123@cluster0.4a2h5sc.mongodb.net/Cap2?retryWrites=true&w=majority&appName=Cluster'),
    UsersModule,
    ContactsModule,
    ObjectsModule,
    ImagesModule,
    RecognitionResultsModule,
    EmergencyContactsModule
  ],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

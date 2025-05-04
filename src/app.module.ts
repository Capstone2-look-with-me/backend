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
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [   
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        connectionFactory: (connection) => {
          return connection;
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    ContactsModule,
    ObjectsModule,
    ImagesModule,
    RecognitionResultsModule,
    EmergencyContactsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    FilesModule,
    ScheduleModule.forRoot()
  ],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

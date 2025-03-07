import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentModule } from './student/student.module';
import { GuardianModule } from './guardian/guardian.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_URL),
    StudentModule,
    GuardianModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}

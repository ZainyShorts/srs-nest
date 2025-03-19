import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { Teacher, TeacherSchema } from './schema/schema.teacher';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: Teacher.name, schema: TeacherSchema }])
  ],
  controllers: [TeacherController],
  providers: [TeacherService]
})
export class TeacherModule {}

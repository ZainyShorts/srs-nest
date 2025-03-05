import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Student, StudentSchema } from './schema/student.schema';
import { GuardianModule } from 'src/guardian/guardian.module';

@Module({
  imports: [
    GuardianModule,
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }])
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}

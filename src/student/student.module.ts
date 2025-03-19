import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Student, StudentSchema } from './schema/student.schema';
import { GuardianModule } from '../guardian/guardian.module';
import { Guardian, GuardianSchema } from '../guardian/schema/guardian.schema';

@Module({
  imports: [
    GuardianModule,
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema },{ name: Guardian.name, schema: GuardianSchema }])
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}

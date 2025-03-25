import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { Course, CourseSchema } from './schema/course.schema';
import { Schedule, ScheduleSchema } from 'src/schedule/schema/schedule.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Course.name, schema: CourseSchema },
    { name: Schedule.name, schema: ScheduleSchema }
  ])],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {}

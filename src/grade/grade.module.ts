import { Module } from '@nestjs/common';
import { GradeController } from './grade.controller';
import { GradeService } from './grade.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Grade, GradeSchema } from './schema/schema.garde';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Grade.name, schema: GradeSchema }]),
  ],
  controllers: [GradeController],
  providers: [GradeService],
})
export class GradeModule {}

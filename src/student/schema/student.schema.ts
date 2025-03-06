import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Guardian } from '../../guardian/schema/guardian.schema';

@Schema({ timestamps: true })
export class Student extends Document {
  @Prop({ required: true, unique: true })
  rollNo: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  class: string;

  @Prop({ required: true })
  section: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  dob: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  enrollDate: string;

  @Prop({ required: true })
  expectedGraduation: string;

  @Prop({ default:"$2b$10$1VlR8HWa.Pzyo96BdwL0H.3Hdp2WF9oRX1W9lEF4EohpCWbq70jKm"})
  password: string; // Hashed password

  @Prop({ type: Types.ObjectId, ref: 'Guardian', required: false }) 
  guardian: Guardian;

  @Prop({ required: true })
  profilePhoto: string; // Store URL of the photo
}

export const StudentSchema = SchemaFactory.createForClass(Student);

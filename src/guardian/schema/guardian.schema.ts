import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Guardian extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string; // Hashed password

  @Prop({ required: true })
  phone: string;
}

export const GuardianSchema = SchemaFactory.createForClass(Guardian);

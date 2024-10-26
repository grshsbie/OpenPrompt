import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // فعال کردن timestamps برای اضافه کردن createdAt و updatedAt
export class Request extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  method: string;

  @Prop({ type: Map, of: String, default: {} }) // مشخص کردن نوع برای headers به عنوان Map
  headers: Map<string, string>;

  @Prop({ type: Object, default: {} }) // مشخص کردن نوع برای body به عنوان Object
  body: Record<string, any>;

  @Prop({ required: true })
  statusCode: number;

  @Prop({ type: String })
  response: string;

  @Prop({ type: [String], default: [] })
  sharedWith: string[];

  createdAt: Date;
  updatedAt: Date;
}

export const RequestSchema = SchemaFactory.createForClass(Request);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Request extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  method: string;

  @Prop({ type: Map, of: String, default: {} })
  headers: Map<string, string>;

  @Prop({ type: Object, default: {} })
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

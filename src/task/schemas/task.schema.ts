import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

export enum status {
  NEW = 'new',
  WORKING = 'working',
  DONE = 'done',
}

@Schema({
  timestamps: true,
})
export class Task {
  @Prop({ required: [true, 'task title is required'] })
  title: string;

  @Prop()
  description: string;

  @Prop({ types: mongoose.Schema.Types.ObjectId, ref: 'User' })
  assignee: User;

  @Prop({ required: [true, 'task must have status'] })
  status: status;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

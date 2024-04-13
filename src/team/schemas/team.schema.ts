import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

@Schema({
  timestamps: true,
})
export class Team {
  @Prop({
    required: [true, 'name is required'],
    minlength: [5, 'Username must have at least 5 character'],
  })
  name: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  teamMembers: User[];
}

export const TeamSchema = SchemaFactory.createForClass(Team);

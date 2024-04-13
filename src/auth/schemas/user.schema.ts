import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    required: [true, 'name is required'],
    minlength: [5, 'Username must have at least 5 character'],
  })
  name: string;

  @Prop({ unique: [true, 'duplicate email address'] })
  email: string;

  @Prop({
    minlength: [8, 'Password must have at least 8 character'],
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

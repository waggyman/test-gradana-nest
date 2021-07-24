import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type UserDocument = UserProps & Document;

export enum StatusOption {
  INCOME = 'INCOME',
  OUTCOME = 'OUTCOME'
}

export class TopUpHistoriesProp {
  @Prop({ type: Date, required: true })
  date: Date;

  @Prop({ type: Number, required: true })
  value: number;

  @Prop({ type: String, required: true, enum: Object.values(StatusOption) })
  historyType: StatusOption;
}

export interface UserProps {
  name: string;
  phoneNumber: string;
  email: string;
  password: string;
  currentBalance: number;
  histories: Array<TopUpHistoriesProp>;
}

@Schema({
  collection: 'users',
})
export class UserModel extends Document implements UserProps {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  phoneNumber: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: Number, required: false })
  currentBalance: number;

  @Prop({
    type: { type: MongooseSchema.Types.Array},
    default: [],
  })
  histories: Array<TopUpHistoriesProp>
}

export const UserSchema = SchemaFactory.createForClass(
  UserModel,
);
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Pool } from './pool.schema';
import * as mongoose from 'mongoose';

export type AccountDocument = HydratedDocument<Account>;

@Schema()
export class Account {
  @Prop({required: true, unique: true, type: String})
  address: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pool' }] })
  deployed_pools: Pool[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pool' }] })
  staked_pools: Pool[];
}

export const AccountSchema = SchemaFactory.createForClass(Account);
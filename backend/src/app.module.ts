import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AccountController, PoolController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PoolSchema } from './schemas/pool.schema';
import { AccountSchema } from './schemas/account.schema';
import { AppLoggerMiddleware } from './logger.module';

require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/nest';
console.log(9, MONGO_URL, process.env.MONGO_URL)

@Module({
  imports: [MongooseModule.forRoot(MONGO_URL), MongooseModule.forFeature([{ name: 'Pool', schema: PoolSchema }, { name: 'Account', schema: AccountSchema }])],
  controllers: [AccountController, PoolController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}

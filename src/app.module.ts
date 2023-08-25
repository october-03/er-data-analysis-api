import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'typeorm.config';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    BullModule.forRoot({
      redis: { host: 'redis', port: Number(process.env.REDIS_PORT) },
    }),
    BullModule.registerQueue({
      name: 'erApiQueue',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

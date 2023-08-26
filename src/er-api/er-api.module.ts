import { Module } from '@nestjs/common';
import { ErApiService } from './er-api.service';
import { ErApiConsumer } from './er-api.consumer';
import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';
import { ErApiQueueService } from './er-api-queue.service';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'erApiQueue' }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [ErApiService, ErApiConsumer, ErApiQueueService],
  exports: [ErApiQueueService],
})
export class ErApiModule {}

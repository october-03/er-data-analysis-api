import { Module } from '@nestjs/common';
import { ErApiService } from './er-api.service';
import { ErApiConsumer } from './er-api.consumer';
import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';
import { ErApiQueueService } from './er-api-queue.service';
import { Game } from 'src/entities/Game.entity';
import { GameUser } from 'src/entities/GameUser.entity';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'erApiQueue' }),
    TypeOrmModule.forFeature([User, Game, GameUser]),
  ],
  providers: [ErApiService, ErApiConsumer, ErApiQueueService],
  exports: [ErApiQueueService],
})
export class ErApiModule {}

import { Module } from '@nestjs/common';
import { ErApiService } from './er-api.service';
import { ErApiConsumer } from './er-api.consumer';
import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';
import { ErApiQueueService } from './er-api-queue.service';
import { Game } from 'src/entities/Game.entity';
import { GameUser } from 'src/entities/GameUser.entity';
import { SeasonUser } from 'src/entities/SeasonUser.entity';
import { ErApiGameService } from './er-api-game.service';
import { ErApiUserService } from './er-api-user.service';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'erApiQueue' }),
    TypeOrmModule.forFeature([User, Game, GameUser, SeasonUser]),
  ],
  providers: [
    ErApiService,
    ErApiConsumer,
    ErApiQueueService,
    ErApiGameService,
    ErApiUserService,
  ],
  exports: [ErApiQueueService],
})
export class ErApiModule {}

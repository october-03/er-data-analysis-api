import { Module } from '@nestjs/common';
import { ErApiService } from './er-api.service';
import { ErApiConsumer } from './er-api.consumer';
import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'erApiQueue' }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [ErApiService, ErApiConsumer],
  exports: [ErApiService],
})
export class ErApiModule {}

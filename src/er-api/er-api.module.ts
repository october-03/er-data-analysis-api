import { Module } from '@nestjs/common';
import { ErApiService } from './er-api.service';
import { ErApiConsumer } from './er-api.consumer';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [BullModule.registerQueue({ name: 'erApiQueue' })],
  providers: [ErApiService, ErApiConsumer],
  exports: [ErApiService],
})
export class ErApiModule {}

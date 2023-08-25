import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { BullModule } from '@nestjs/bull';
import { AppConsumer } from 'src/app.consumer';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'erApiQueue',
    }),
  ],
  providers: [TestService],
  controllers: [TestController, AppConsumer],
})
export class TestModule {}

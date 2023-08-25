import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { ErApiModule } from 'src/er-api/er-api.module';

@Module({
  imports: [ErApiModule],
  providers: [TestService],
  controllers: [TestController],
})
export class TestModule {}

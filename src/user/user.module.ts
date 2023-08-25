import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AppConsumer } from 'src/app.consumer';

@Module({
  controllers: [UserController],
  providers: [UserService, AppConsumer],
})
export class UserModule {}

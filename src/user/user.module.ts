import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ErApiModule } from 'src/er-api/er-api.module';

@Module({
  imports: [ErApiModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

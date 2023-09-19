import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ErApiModule } from 'src/er-api/er-api.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';
import { GameUser } from 'src/entities/GameUser.entity';
import { UserPaginationService } from './user-pagination.service';
import { SeasonUser } from 'src/entities/SeasonUser.entity';

@Module({
  imports: [
    ErApiModule,
    TypeOrmModule.forFeature([User, GameUser, SeasonUser]),
  ],
  controllers: [UserController],
  providers: [UserService, UserPaginationService],
})
export class UserModule {}

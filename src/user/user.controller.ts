import {
  Body,
  Controller,
  Get,
  HttpException,
  Logger,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import UpdateUserDto from 'src/dto/UpdateUser.dto';

@Controller('user')
export class UserController {
  private logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Get('test')
  queueTest() {
    return this.userService.queueTest();
  }

  @Patch('/update')
  updateUser(@Body() req: UpdateUserDto) {
    const { nickname, seasonId } = req;
    if (!nickname || !seasonId) {
      this.logger.error(`Request updateUser ${nickname} ${seasonId}`);
      throw new HttpException('요청값이 잘못되었습니다.', 400);
    }
    this.logger.log(`Request updateUser ${nickname}`);
    return this.userService.updateUser(req);
  }
}

import { Controller, Get, Logger, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  private logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Get('test')
  queueTest() {
    return this.userService.queueTest();
  }

  @Get('/:nickname/:seasonId')
  getInfo(
    @Param('nickname') nickname: string,
    @Param('seasonId') seasonId: number,
  ) {
    this.logger.log(`Request GetInfo ${nickname}`);
    return this.userService.getInfo(nickname, seasonId);
  }
}

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

  @Get('/:nickname')
  getInfo(@Param('nickname') nickname: string) {
    this.logger.log(`Request GetInfo ${nickname}`);
    return this.userService.getInfo(nickname);
  }
}

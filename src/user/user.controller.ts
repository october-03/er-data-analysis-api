import {
  Body,
  Controller,
  Get,
  HttpException,
  Logger,
  Patch,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import UpdateUserDto from 'src/dto/UpdateUser.dto';
import GetUserInfoDto from 'src/dto/GetUserInfo.dto';

@Controller('user')
export class UserController {
  private logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Get('test')
  queueTest() {
    return this.userService.queueTest();
  }

  @Patch('/update')
  async updateUser(@Body() req: UpdateUserDto) {
    const { nickname, seasonId } = req;
    if (!nickname || !seasonId) {
      this.logger.error(`Request updateUser ${nickname} ${seasonId}`);
      throw new HttpException('요청값이 잘못되었습니다.', 400);
    }
    this.logger.log(`Request updateUser ${nickname}`);
    await this.userService.updateUser(req);
    return this.getUserInfo({ nickname, seasonId, page: 1 });
  }

  @Get('/')
  async getUserInfo(@Query() req: GetUserInfoDto) {
    const { seasonId, page } = req;
    req.seasonId = Number(seasonId);
    req.page = Number(page);

    return this.userService.getUserInfo(req);
  }
}

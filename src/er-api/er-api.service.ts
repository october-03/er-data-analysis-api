import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import delay from 'src/utils/delay';
import { ErApiUserService } from './er-api-user.service';
import { ErApiGameService } from './er-api-game.service';
import UpdateUserDto from 'src/dto/UpdateUser.dto';
dayjs().format();

@Injectable()
export class ErApiService {
  constructor(
    private readonly userService: ErApiUserService,
    private readonly gameService: ErApiGameService,
  ) {}

  async updateUser(updateUserDto: UpdateUserDto) {
    const { nickname, seasonId } = updateUserDto;
    const user = await this.userService.registerUser(nickname);
    const now = dayjs();

    await delay(1000);

    let next: string;

    let requestType: 'full' | 'fast' = 'full';

    if (now.diff(user.lastUpdate, 'day') < 7) {
      requestType = 'fast';
    }

    const alreadyGameList = user.gameUsers.map((gameUser) => {
      return gameUser.game.id;
    });

    let gameList = await this.gameService.registerGame(
      user,
      alreadyGameList,
      requestType,
      next,
    );

    while (gameList) {
      next = gameList;
      await delay(1500);
      gameList = await this.gameService.registerGame(
        user,
        alreadyGameList,
        requestType,
        next,
      );
    }

    await delay(1000);

    await this.userService.registerSeasonData(user, seasonId);

    await delay(1000);

    await this.userService.updatedTime(user.id);

    return {
      message: `User ${nickname} updated!`,
    };
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { Game } from 'src/entities/Game.entity';
import { GameUser } from 'src/entities/GameUser.entity';
import { User } from 'src/entities/User.entity';
import {
  BattleUserResult,
  ErGameList,
  ErUserInfo,
} from 'src/types/erApiResponse';
import erApiService from 'src/utils/erApiService';
import { Repository } from 'typeorm';
dayjs().format();

@Injectable()
export class ErApiService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
    @InjectRepository(GameUser)
    private readonly gameUserRepository: Repository<GameUser>,
  ) {}

  delay(ms: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  async getUserInfo(nickname: string): Promise<User> {
    const user = await this.registerUser(nickname);
    const now = dayjs();

    await this.delay(1000);

    let next: string;

    const userData = await this.userRepository.findOne({
      where: { id: user.id },
      relations: ['gameUsers', 'gameUsers.game'],
    });

    let requestType: 'full' | 'fast' = 'full';

    if (now.diff(user.lastUpdate, 'day') < 7) {
      requestType = 'fast';
    }

    const alreadyGameList = userData.gameUsers.map((gameUser) => {
      return gameUser.game.id;
    });
    let gameList = await this.registerGame(
      user,
      alreadyGameList,
      requestType,
      next,
    );

    while (gameList) {
      next = gameList;
      await this.delay(1500);
      gameList = await this.registerGame(
        user,
        alreadyGameList,
        requestType,
        next,
      );
    }

    await this.delay(1000);

    await this.userRepository.update(user.id, { lastUpdate: new Date() });

    return user;
  }

  async registerUser(nickname: string, id?: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { nickname },
    });

    if (user) {
      return user;
    }

    if (id) {
      const newUser = this.userRepository.create({
        id,
        nickname,
      });

      await this.userRepository.insert(newUser);

      return newUser;
    }

    const userData = await erApiService.get<ErUserInfo>(
      `/v1/user/nickname?query=${nickname}`,
    );

    const newUser = this.userRepository.create({
      id: userData.data.user.userNum,
      nickname: userData.data.user.nickname,
      lastUpdate: new Date(),
    });

    await this.userRepository.insert(newUser);

    return newUser;
  }

  async registerGame(
    user: User,
    alreadyGames: number[],
    type: 'fast' | 'full',
    next?: string,
  ): Promise<string> {
    const gameData = await erApiService.get<ErGameList>(
      `v1/user/games/${user.id}${next ? `?next=${next}` : ''}`,
    );

    const gameList: BattleUserResult[] = [];

    gameData.data.userGames.forEach((game) => {
      if (!alreadyGames.includes(game.gameId)) {
        gameList.push(game);
      }
    });

    for (const game of gameList) {
      const isGameExist = await this.gameRepository.findOne({
        where: { id: game.gameId },
      });

      if (!isGameExist) {
        const insertGameData = {
          id: game.gameId,
          startDtm: new Date(game.startDtm),
          playTime: game.playTime,
        };

        const newGame = this.gameRepository.create(insertGameData);
        await this.gameRepository.insert(newGame);
      }

      const existingGame = await this.gameRepository.findOne({
        where: { id: game.gameId },
      });

      const insertGameUserData = {
        KillCount: game.playerKill,
        AnimalKillCount: game.monsterKill,
        AssistCount: game.playerAssistant,
        characterNum: game.characterNum,
        DeathCount: game.playerDeaths,
        TeamKillCount: game.teamKill,
        user: user,
        game: existingGame,
      };

      const newGameUser = this.gameUserRepository.create(insertGameUserData);

      await this.gameUserRepository.insert(newGameUser);
    }

    if (type === 'fast' && gameList.length < 10) {
      return undefined;
    }

    return gameData.data.next;
  }
}

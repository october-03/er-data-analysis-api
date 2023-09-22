import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from 'src/entities/Game.entity';
import { GameUser } from 'src/entities/GameUser.entity';
import { User } from 'src/entities/User.entity';
import { BattleUserResult, ErGameList } from 'src/types/erApiResponse';
import erApiService from 'src/utils/erApiService';
import { Repository } from 'typeorm';

@Injectable()
export class ErApiGameService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
    @InjectRepository(GameUser)
    private readonly gameUserRepository: Repository<GameUser>,
  ) {}

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
        killCount: game.playerKill,
        animalKillCount: game.monsterKill,
        assistCount: game.playerAssistant,
        characterNum: game.characterNum,
        deathCount: game.playerDeaths,
        teamKillCount: game.teamKill,
        user: user,
        game: existingGame,
        seasonId: game.seasonId,
        id: `${game.userNum}-${game.gameId}-${game.seasonId}`,
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

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SeasonUser } from 'src/entities/SeasonUser.entity';
import { User } from 'src/entities/User.entity';
import { ErSeasonUser, ErUserInfo } from 'src/types/erApiResponse';
import { MatchingTeamMode } from 'src/types/matchingTeamMode';
import erApiService from 'src/utils/erApiService';
import { Repository } from 'typeorm';

@Injectable()
export class ErApiUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(SeasonUser)
    private readonly seasonUserRepository: Repository<SeasonUser>,
  ) {}

  async registerUser(nickname: string, id?: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { nickname },
      relations: ['gameUsers', 'gameUsers.game'],
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

    const res = await erApiService.get<ErUserInfo>(
      `/v1/user/nickname?query=${nickname}`,
    );

    const newUser = this.userRepository.create({
      id: res.data.user.userNum,
      nickname: res.data.user.nickname,
      lastUpdate: new Date(),
    });

    await this.userRepository.insert(newUser);

    const userData = await this.userRepository.findOne({
      where: { id: newUser.id },
      relations: ['gameUsers', 'gameUsers.game'],
    });

    console.log(userData);

    return userData;
  }

  async updatedTime(id: number): Promise<void> {
    await this.userRepository.update(id, { lastUpdate: new Date() });
  }

  async registerSeasonData(user: User, seasonId: number) {
    const res = await erApiService.get<ErSeasonUser>(
      `/v1/user/stats/${user.id}/${seasonId}`,
    );

    const seasonData = res.data.userStats;

    if (!seasonData) {
      return;
    }

    for (const season of seasonData) {
      const id = `${season.userNum}-${season.seasonId}-${
        MatchingTeamMode[season.matchingTeamMode]
      }`;

      const seasonUser = {
        id,
        averageAssists: season.averageAssistants,
        averageHunts: season.averageHunts,
        averageKills: season.averageKills,
        averageRank: season.averageRank,
        matchingTeamMode: season.matchingTeamMode,
        mmr: season.mmr,
        rank: season.rank,
        rankSize: season.rankSize,
        seasonId: season.seasonId,
        top2Rate: season.top2 * 100,
        top3Rate: season.top3 * 100,
        totalGames: season.totalGames,
        totalWins: season.totalWins,
        user: user,
      } as SeasonUser;

      if (seasonUser.totalGames === 0) {
        seasonUser.winRate = 0;
      } else {
        const winRate = (seasonUser.totalWins / seasonUser.totalGames) * 100;
        seasonUser.winRate = Number(winRate.toFixed(2));
      }

      const isSeasonUserExist = await this.seasonUserRepository.findOne({
        where: { id },
      });

      if (!isSeasonUserExist) {
        const newSeasonUser = this.seasonUserRepository.create(seasonUser);
        await this.seasonUserRepository.insert(newSeasonUser);
      } else {
        await this.seasonUserRepository.update(id, seasonUser);
      }
    }
  }
}

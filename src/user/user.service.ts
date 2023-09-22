import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import GetUserInfoDto from 'src/dto/GetUserInfo.dto';
import UpdateUserDto from 'src/dto/UpdateUser.dto';
import { User } from 'src/entities/User.entity';
import { ErApiQueueService } from 'src/er-api/er-api-queue.service';
import { Equal, Repository } from 'typeorm';
import { UserPaginationService } from './user-pagination.service';
import { SeasonUser } from 'src/entities/SeasonUser.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly erApiQueueService: ErApiQueueService,
    private readonly userPaginationService: UserPaginationService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(SeasonUser)
    private readonly seasonUserRepository: Repository<SeasonUser>,
  ) {}

  async queueTest() {
    const job = await this.erApiQueueService.queueTest('user');

    return job;
  }

  async updateUser(updateUserDto: UpdateUserDto) {
    const job = await this.erApiQueueService.updateUser(updateUserDto);

    return job;
  }

  async getUserInfo(getUserInfoDto: GetUserInfoDto) {
    const { nickname, seasonId } = getUserInfoDto;
    let { page } = getUserInfoDto;

    let user = await this.userRepository.findOne({
      where: { nickname },
    });

    if (!user) {
      await this.updateUser({ nickname, seasonId });
      user = await this.userRepository.findOne({
        where: { nickname },
      });
    }

    const id = user.id;

    const maxPage = await this.userPaginationService.findMaxPageForUser(
      id,
      seasonId,
    );

    if (page < 1) {
      page = 1;
    } else if (page > maxPage) {
      page = maxPage;
    }

    const pageNationDto = {
      page,
      seasonId,
      user,
    };

    const gameData = await this.userPaginationService.getGameUserList(
      pageNationDto,
    );

    const stats = await this.seasonUserRepository.find({
      where: { user: Equal(id), seasonId },
    });

    return {
      user,
      gameData,
      stats,
    };
  }
}

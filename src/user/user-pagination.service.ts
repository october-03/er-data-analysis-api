import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import PaginationDto from 'src/dto/Pagination.dto';
import { GameUser } from 'src/entities/GameUser.entity';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class UserPaginationService {
  constructor(
    @InjectRepository(GameUser)
    private readonly gameUserRepository: Repository<GameUser>,
  ) {}

  pageSize = 10;

  async findMaxPageForUser(id: number, seasonId: number): Promise<number> {
    const totalCount = await this.gameUserRepository
      .createQueryBuilder('game_user')
      .where('game_user.user_id = :id', { id })
      .andWhere('game_user.seasonId = :seasonId', { seasonId })
      .getCount();

    const maxPage = Math.ceil(totalCount / this.pageSize);

    return maxPage;
  }

  async getGameUserList(pageNationDto: PaginationDto) {
    const { user, page, seasonId } = pageNationDto;

    const data = await this.gameUserRepository.find({
      where: { user: Equal(user.id), seasonId },
      take: this.pageSize,
      skip: (page - 1) * this.pageSize,
      relations: ['game'],
    });

    return data;
  }
}

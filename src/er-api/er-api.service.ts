import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';
import { ErUserInfo } from 'src/types/erApiResponse';
import erApiService from 'src/utils/erApiService';
import { Repository } from 'typeorm';

@Injectable()
export class ErApiService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getInfo(nickname: string): Promise<User> {
    let result: User;

    const user = await this.userRepository.findOne({
      where: { nickname: nickname },
    });

    result = user;

    if (!user) {
      const userData = await erApiService.get<ErUserInfo>(
        `/v1/user/nickname?query=${nickname}`,
      );

      const newUser = this.userRepository.create({
        id: userData.data.user.userNum,
        nickname: userData.data.user.nickname,
      });

      await this.userRepository.insert(newUser);

      result = newUser;
    }

    return result;
  }
}

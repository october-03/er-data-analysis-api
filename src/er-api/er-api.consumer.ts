import { Process, Processor } from '@nestjs/bull';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'bull';
import { User } from 'src/entities/User.entity';
import { ErUserInfo } from 'src/types/erApiResponse';
import erApiService from 'src/utils/erApiService';
import { Repository } from 'typeorm';

@Processor('erApiQueue')
export class ErApiConsumer {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @Process('test')
  async test(job, done) {
    setTimeout(() => {
      done(null, { result: 'test complete' });
    }, 1000 * 30);
  }

  @Process('getInfo')
  async getInfo(job: Job<getInfoParams>, done) {
    let result: User;

    const user = await this.userRepository.findOne({
      where: { nickname: job.data.nickname },
    });

    result = user;

    if (!user) {
      const userData = await erApiService.get<ErUserInfo>(
        `/v1/user/nickname?query=${job.data.nickname}`,
      );

      const newUser = this.userRepository.create({
        id: userData.data.user.userNum,
        nickname: userData.data.user.nickname,
      });

      await this.userRepository.insert(newUser);

      result = newUser;
    }

    done(null, result);
  }
}

type getInfoParams = {
  nickname: string;
};

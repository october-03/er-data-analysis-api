import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { ErApiService } from './er-api.service';

@Processor('erApiQueue')
export class ErApiConsumer {
  constructor(private erService: ErApiService) {}

  @Process('test')
  async test(job, done) {
    setTimeout(() => {
      done(null, { result: 'test complete' });
    }, 1000 * 30);
  }

  @Process('getInfo')
  async getInfo(job: Job<getInfoParams>, done) {
    const result = await this.erService.getUserInfo(job.data.nickname);

    done(null, result);
  }
}

type getInfoParams = {
  nickname: string;
};

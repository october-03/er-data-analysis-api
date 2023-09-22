import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { ErApiService } from './er-api.service';
import UpdateUserDto from 'src/dto/UpdateUser.dto';

@Processor('erApiQueue')
export class ErApiConsumer {
  constructor(private erService: ErApiService) {}

  @Process('test')
  async test(job, done) {
    setTimeout(() => {
      done(null, { result: 'test complete' });
    }, 1000 * 30);
  }

  @Process('updateUser')
  async getInfo(job: Job<UpdateUserDto>, done) {
    const result = await this.erService.updateUser(job.data);

    done(null, result);
  }
}

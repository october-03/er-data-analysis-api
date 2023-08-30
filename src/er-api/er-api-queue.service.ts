import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { User } from 'src/entities/User.entity';

@Injectable()
export class ErApiQueueService {
  constructor(
    @InjectQueue('erApiQueue')
    private readonly erApiQueue: Queue,
  ) {}
  async queueTest(data: string) {
    const job = await this.erApiQueue.add(
      'test',
      { test: data },
      { removeOnComplete: true, removeOnFail: true },
    );

    const jobResult = await job.finished();
    return jobResult;
  }

  async getInfo(nickname: string) {
    const job = await this.erApiQueue.add(
      'getInfo',
      { nickname },
      { removeOnComplete: true, removeOnFail: true },
    );

    const jobResult: User = await job.finished();

    return jobResult;
  }
}

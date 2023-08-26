import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

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

    const jobResult = await job.finished();
    return jobResult;
  }
}

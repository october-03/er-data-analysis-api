import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class ErApiService {
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
}
import { Injectable } from '@nestjs/common';
import { ErApiQueueService } from 'src/er-api/er-api-queue.service';

@Injectable()
export class UserService {
  constructor(private erApiQueueService: ErApiQueueService) {}

  async queueTest() {
    const job = await this.erApiQueueService.queueTest('user');

    return job;
  }

  async getInfo(nickname: string) {
    const job = await this.erApiQueueService.getInfo(nickname);

    return job;
  }
}

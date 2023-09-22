import { Injectable } from '@nestjs/common';
import { ErApiQueueService } from 'src/er-api/er-api-queue.service';

@Injectable()
export class TestService {
  constructor(private erApiQueueService: ErApiQueueService) {}

  async queueTest() {
    const job = await this.erApiQueueService.queueTest('test');

    return job;
  }
}

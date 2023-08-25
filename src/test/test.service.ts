import { Injectable } from '@nestjs/common';
import { ErApiService } from 'src/er-api/er-api.service';

@Injectable()
export class TestService {
  constructor(private erApiService: ErApiService) {}

  async queueTest() {
    const job = await this.erApiService.queueTest('test');

    return job;
  }
}

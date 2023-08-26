import { Injectable } from '@nestjs/common';
import { ErApiService } from 'src/er-api/er-api.service';

@Injectable()
export class UserService {
  constructor(private erApiService: ErApiService) {}

  async queueTest() {
    const job = await this.erApiService.queueTest('user');

    return job;
  }

  async getInfo(nickname: string) {
    const job = await this.erApiService.getInfo(nickname);

    return job;
  }
}

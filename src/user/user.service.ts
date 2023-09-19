import { Injectable } from '@nestjs/common';
import UpdateUserDto from 'src/dto/UpdateUser.dto';
import { ErApiQueueService } from 'src/er-api/er-api-queue.service';

@Injectable()
export class UserService {
  constructor(private erApiQueueService: ErApiQueueService) {}

  async queueTest() {
    const job = await this.erApiQueueService.queueTest('user');

    return job;
  }

  async updateUser(updateUserDto: UpdateUserDto) {
    const job = await this.erApiQueueService.updateUser(updateUserDto);

    return job;
  }
}

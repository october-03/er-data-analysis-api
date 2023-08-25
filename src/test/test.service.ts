import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class TestService {
  constructor(
    @InjectQueue('erApiQueue')
    private readonly erApiQueue: Queue,
  ) {}
}

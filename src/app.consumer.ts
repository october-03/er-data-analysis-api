import { Processor } from '@nestjs/bull';

@Processor('erApiQueue')
export class AppConsumer {}

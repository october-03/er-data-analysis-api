import { Process, Processor } from '@nestjs/bull';

@Processor('erApiQueue')
export class ErApiConsumer {
  @Process('test')
  async test(job, done) {
    console.log(job.data);
    setTimeout(() => {
      done(null, { result: 'test complete' });
    }, 1000 * 30);
  }
}

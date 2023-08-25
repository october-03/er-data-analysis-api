import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'typeorm.config';
import { BullModule } from '@nestjs/bull';
import { UserModule } from './user/user.module';
import { TestModule } from './test/test.module';
import { ErApiModule } from './er-api/er-api.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    BullModule.forRoot({
      redis: { host: 'redis', port: Number(process.env.REDIS_PORT) },
    }),
    UserModule,
    TestModule,
    ErApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

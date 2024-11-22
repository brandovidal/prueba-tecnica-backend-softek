import { Module } from '@nestjs/common';

import { CacheModule } from '@nestjs/cache-manager';
import { MysqlModule } from './providers/database/mysql.module';
import { PeopleModule } from './models/people/people.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MysqlModule,
    CacheModule.register({
      isGlobal: true,
      ttl: 30 * 60 * 1000,
      max: 10,
    }),
    PeopleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

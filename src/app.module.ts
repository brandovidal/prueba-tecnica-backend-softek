import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { PeopleModule } from './people/people.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DbModule, PeopleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

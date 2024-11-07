import { Module } from '@nestjs/common';

import { HttpModule } from '@nestjs/axios';

import { PeopleController } from './people.controller';

import { PeopleService } from './people.service';
import { ApiService } from 'src/utils/api.service';

@Module({
  imports: [HttpModule],
  controllers: [PeopleController],
  providers: [PeopleService, ApiService],
})
export class PeopleModule {}

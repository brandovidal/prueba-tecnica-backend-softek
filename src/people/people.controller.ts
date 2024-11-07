import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';

import { ApiService } from 'src/utils/api.service';
import { PeopleService } from './people.service';

import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';

import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { EntityInterceptor } from '../common/serializers/entity.serializer';
import { Entity } from '../common/decorators/entity.decorator';
import { PersonResponseDto } from './dto/person-response.dto';

@Controller('people')
export class PeopleController {
  constructor(
    private readonly apiService: ApiService,
    private readonly peopleService: PeopleService,
  ) {}

  @Post()
  async create() {
    const url = 'https://swapi.py4e.com/api/people/?format=json';
    const people = await this.apiService.getData(url);

    const createPersonDto: CreatePersonDto = people.results.map((person) => ({
      name: person.name,
    }));
    return this.peopleService.create(createPersonDto);
  }

  @Get()
  @Entity(PersonResponseDto)
  @ResponseMessage('People data successfully')
  async findAll() {
    return await this.peopleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.peopleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.peopleService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.peopleService.remove(+id);
  }
}

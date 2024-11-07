import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { PeopleService } from './people.service';
import { ApiService } from '../../providers/api/api.service';

import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PersonResponseDto } from './dto/person-response.dto';

import { ResponseMessage } from '../../common/decorators/response-message.decorator';
import { Entity } from '../../common/decorators/entity.decorator';

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
    return this.peopleService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.peopleService.update(Number(id), updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.peopleService.remove(Number(id));
  }
}

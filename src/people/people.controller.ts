import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { ApiService } from 'src/utils/api.service';
import { PeopleService } from './people.service';

import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Controller('people')
export class PeopleController {
  constructor(
    private readonly apiService: ApiService,
    private readonly peopleService: PeopleService,
  ) {}

  @Post()
  async create(@Body() createPersonDto: CreatePersonDto) {
    const url = 'https://swapi.py4e.com/api/people/?format=json';
    const data = await this.apiService.getData(url);
    console.log(data);

    return this.peopleService.create(createPersonDto);
  }

  @Get()
  async findAll() {
    return this.peopleService.findAll();
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

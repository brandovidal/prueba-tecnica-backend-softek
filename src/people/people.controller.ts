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
import { Person } from './entities/person.entity';

@Controller('people')
export class PeopleController {
  constructor(
    private readonly apiService: ApiService,
    private readonly peopleService: PeopleService,
  ) {}

  @Post()
  async create() {
    try {
      const url = 'https://swapi.py4e.com/api/people/?format=json';
      const people = await this.apiService.getData(url);

      const createPersonDto: CreatePersonDto = people.results.map((person) => ({
        name: person.name,
      }));
      return this.peopleService.create(createPersonDto);
    } catch (error) {
      console.error(error);
      throw new Error('Error al obtener los datos de la API');
    }
  }

  @Get()
  async findAll() {
    const people = await this.peopleService.findAll();
    console.log("🚀 ~ PeopleController ~ findAll ~ people:", people)

    const data = people.map((person) => ({ id: person.id, nombre: person.name }));
    return data;
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

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { PeopleService } from './people.service';
import { ApiService } from '../../providers/api/api.service';

import { ResponseMessage } from '../../common/decorators/response-message.decorator';
import { Entity } from '../../common/decorators/entity.decorator';

import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PersonResponseDto } from './dto/person-response.dto';
import { BulkCreatePersonDto } from './dto/bulk-create-person.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('People')
@Controller('people')
export class PeopleController {
  private swapiApiUrl: string;
  private readonly logger = new Logger(PeopleController.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly apiService: ApiService,
    private readonly peopleService: PeopleService,
  ) {
    this.swapiApiUrl = this.configService.get('SWAPI_API_URL')!;
  }

  @Post('fusionados')
  @ResponseMessage('People has been successfully created')
  async bulk() {
    const url = `${this.swapiApiUrl}/api/people/?format=json`;
    const responseData = await this.apiService.getData(url);

    const { results: people = [] } = responseData;
    if (people.length === 0) {
      return [];
    }

    const createPersonDto: BulkCreatePersonDto[] = people.map((person) => ({
      name: person.name,
    }));
    const data = await this.peopleService.bulkCreate(createPersonDto);
    this.logger.log('People has been successfully created', data);

    return data;
  }

  @Post('almacenar')
  @ResponseMessage('The person has been successfully created')
  async create(@Body() createPersonDto: CreatePersonDto) {
    const data = await this.peopleService.create(createPersonDto);
    this.logger.log('The person has been successfully created', data);

    return data;
  }

  @Get('historial')
  @Entity(PersonResponseDto)
  @ResponseMessage('People data successfully')
  async findAll() {
    const data = await this.peopleService.findAll();
    this.logger.log('People data successfully', data);

    return data;
  }

  @Get(':id')
  @ResponseMessage('Person data successfully')
  findOne(@Param('id') id: string) {
    return this.peopleService.findOne(Number(id));
  }

  @Patch(':id')
  @ResponseMessage('Updated person successfully')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.peopleService.update(Number(id), updatePersonDto);
  }

  @Delete('eliminar/:id')
  @ResponseMessage('Deleted person successfully')
  remove(@Param('id') id: string) {
    return this.peopleService.remove(Number(id));
  }
}

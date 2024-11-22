import { Inject, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

import { Person } from './entities/person.entity';

import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { BulkCreatePersonDto } from './dto/bulk-create-person.dto';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(Person) private repository: Repository<Person>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async bulkCreate(createPersonDto: BulkCreatePersonDto[]) {
    const data = this.repository.create(createPersonDto);
    return await this.repository.save(data);
  }

  async create(createPersonDto: CreatePersonDto) {
    const data = this.repository.create(createPersonDto);
    return await this.repository.save(data);
  }

  async findAll() {
    const people = await this.cacheManager.get<string>('people');
    if (people) {
      return people;
    }

    const data = await this.repository.find();

    await this.cacheManager.set('people', data);
    return data;
  }

  async findOne(id: number) {
    return await this.repository.findOneBy({ id });
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    return await this.repository.update(id, updatePersonDto);
  }

  async remove(id: number) {
    return await this.repository.softDelete({ id });
  }
}

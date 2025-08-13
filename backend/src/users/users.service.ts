import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity.js';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    const adminExists = await this.usersRepository.findOneBy({ username: 'admin' });
    if (!adminExists) {
      const adminUser = this.usersRepository.create({
        username: 'admin',
        password: 'password', // The entity's BeforeInsert hook will hash this
      });
      await this.usersRepository.save(adminUser);
      console.log('Default admin user created.');
    }
  }

  async findOne(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }
}
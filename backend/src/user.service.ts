import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findOne(email: string): Promise<User> {
    return this.userRepository.findOne({ email: email });
  }

  create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}

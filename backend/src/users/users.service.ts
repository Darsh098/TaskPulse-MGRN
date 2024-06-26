import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/User.model';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.userRepository.find();
  }

  async findById(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUser(googleId: string, displayName: string, email: string) {
    
    const existingUser = await this.userRepository.findOne({ where:{ email} });
    if (existingUser) {
      // throw new Error('User already exists');
      return await existingUser;
    }

    // Create a new user entity and save it to the database
    const newUser = this.userRepository.create({
      googleId,
      displayName,
      email,
    });
    return await this.userRepository.save(newUser);
  }

  async updateUser(
    id: number,
    googleId: string,
    displayName: string,
    email: string,
  ) {
    // const userToUpdate = await this.userRepository.findOne({ where: { id } });
    const userToUpdate = await this.findById(id);
    if (!userToUpdate) {
      throw new Error('User not found');
    }
    userToUpdate.googleId = googleId;
    userToUpdate.displayName = displayName;
    userToUpdate.email = email;
    return await this.userRepository.save(userToUpdate);
  }
}

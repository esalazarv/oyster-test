import { Test, TestingModule } from '@nestjs/testing';

import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, UserRepository],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should save an user in the database', async () => {
    const createUserDto: CreateUserDto = {
      name: 'Eduardo',
      email: 'eduardo@.test.com',
      password: 'secret',
      password_confirm: 'secret',
    };
    const user: User = new User();
    jest.spyOn(userRepository, 'create').mockReturnValue(user);
    jest.spyOn(userRepository, 'save').mockImplementation(() => {
      user.id = 1;
      return new Promise<User>((resolve) => resolve(user));
    });
    expect(await service.create(createUserDto)).toBeInstanceOf(User);
    expect(userRepository.create).toHaveBeenCalledWith(createUserDto);
    expect(userRepository.save).toBeCalledWith(user);
  });

  it('should get all users', async () => {
    jest.spyOn(userRepository, 'find').mockReturnValue(
      new Promise<User[]>((resolve) => resolve([])),
    );
    expect(await service.findAll()).toEqual([]);
    expect(userRepository.find).toBeCalled();
  });

  it('should find a user', async () => {
    const user: User = new User();
    jest.spyOn(userRepository, 'findOne').mockReturnValue(
      new Promise<User>((resolve) => resolve(user)),
    );
    expect(await service.findOne(1)).toEqual(user);
    expect(userRepository.findOne).toBeCalledWith(1);
  });

  it('should update a user', async () => {
    const user: User = new User();
    user.id = 1;
    user.email = 'eduardo@test.com';
    user.name = 'Eduardo';
    const updateUserDto: UpdateUserDto = {
      name: 'Luis',
    };
    jest.spyOn(userRepository, 'findOne').mockReturnValue(
      new Promise<User>((resolve) => resolve(user)),
    );
    jest.spyOn(userRepository, 'save').mockReturnValue(
      new Promise<User>((resolve) => resolve(user)),
    );
    const result = await service.update(1, updateUserDto);
    expect(result).toBeInstanceOf(User);
    expect(userRepository.findOne).toHaveBeenCalledWith(1);
    expect(userRepository.save).toHaveBeenCalledWith({
      ...user,
      ...updateUserDto,
    });
  });

  it('should delete a user', async () => {
    jest.spyOn(userRepository, 'delete').mockImplementation();
    const result = await service.remove(1);
    expect(result).toBe(null);
    expect(userRepository.delete).toHaveBeenCalledWith(1);
  });

  it('should find user by username', async () => {
    const user: User = new User();
    user.id = 1;
    user.email = 'eduardo@test.com';
    user.name = 'Eduardo';
    jest
      .spyOn(userRepository, 'findByUsername')
      .mockImplementation(async () => user);
    const result = await service.findByUsername('eduardo@test.com');
    expect(result).toBe(user);
    expect(userRepository.findByUsername).toHaveBeenCalledWith(
      'eduardo@test.com',
    );
  });
});

import { Test, TestingModule } from '@nestjs/testing';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {UserRepository} from "./repositories/user.repository";

describe('UsersController', () => {
  let controller: UsersController;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        UserRepository,
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be return all users', async () => {
    const data: User[] = [new User(), new User()];
    jest.spyOn(userService, 'findAll').mockReturnValue(
      new Promise<User[]>((resolve) => resolve(data)),
    );
    expect(await controller.findAll()).toBe(data);
    expect(userService.findAll).toBeCalled();
  });

  it('should be create a user', async () => {
    const data: CreateUserDto = {
      name: 'Eduardo',
      email: 'eduardo@test.com',
      password: 'secret',
      password_confirm: 'secret',
    };
    const user: User = new User();
    jest.spyOn(userService, 'create').mockReturnValue(
      new Promise<User>((resolve) => resolve(user)),
    );
    expect(await controller.create(data)).toBe(user);
    expect(userService.create).toBeCalledWith(data);
  });

  it('should be find a user', async () => {
    const user: User = new User();
    jest.spyOn(userService, 'findOne').mockReturnValue(
      new Promise<User>((resolve) => resolve(user)),
    );
    expect(await controller.findOne('1')).toBe(user);
    expect(userService.findOne).toBeCalledWith(1);
  });

  it('should be update a user', async () => {
    const data: UpdateUserDto = {
      name: 'Eduardo',
      email: 'eduardo@test.com',
      password: 'secret',
      password_confirm: 'secret',
    };
    const user: User = new User();
    jest.spyOn(userService, 'update').mockReturnValue(
      new Promise<User>((resolve) => resolve(user)),
    );
    expect(await controller.update('1', data)).toBe(user);
    expect(userService.update).toBeCalledWith(1, data);
  });

  it('should be delete a user', async () => {
    jest.spyOn(userService, 'remove').mockReturnValue(
      new Promise<User>((resolve) => resolve(null)),
    );
    expect(await controller.remove('1')).toBe(null);
    expect(userService.remove).toBeCalledWith(1);
  });
});

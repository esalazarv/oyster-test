import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Confirm } from '../../../decorators/validation/confirm.decorator';
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  @Confirm('password')
  password_confirm: string;
}

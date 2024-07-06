import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  ValidateIf,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  username: string;
  @ValidateIf((o) => !o.provider)
  @IsString()
  @IsNotEmpty({ message: 'Password is required if provider is not provided' })
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\da-zA-Z])(?=.*\S).{8,}$/, {
    message:
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character',
  })
  password: string;

  @IsOptional()
  firstname?: string;
  @IsOptional()
  lastname?: string;
  @IsOptional()
  @IsEnum(['google'])
  provider?: string;
}

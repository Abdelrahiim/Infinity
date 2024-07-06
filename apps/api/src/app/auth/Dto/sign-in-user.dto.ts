import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  ValidateIf,
} from 'class-validator';

export class SignInUserDto {
  @IsEmail()
  email: string;

  @ValidateIf((o) => !o.provider)
  @IsString()
  @IsNotEmpty({ message: 'Password is required if provider is not provided' })
  password?: string;

  @IsOptional()
  @IsEnum(['google'])
  provider?: string;
}

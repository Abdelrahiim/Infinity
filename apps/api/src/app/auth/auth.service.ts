import { AuthenticationService, Tokens } from '@infinity/authentication';
import { PrismaConnectionService } from '@infinity/prisma-connection';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { SignInUserDto, CreateUserDto } from './Dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly db: PrismaConnectionService,
    private readonly authenticationService: AuthenticationService
  ) {}

  async login(signInUserDTO: SignInUserDto) {
    const user = await this.getUserByEmail(signInUserDTO.email);
    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }
    if (signInUserDTO.provider) {
      // TODO : handle provider registration like validate provider token
      return;
    }
    await this.validatePassword(signInUserDTO.password, user.password);
    return this.authenticationService.obtainTokens(
      user.id,
      signInUserDTO.email
    );
  }
  /**
   * Register a new user.
   *
   * @param {CreateUserDto} CreateUserDto - The user data to be registered.
   * @return {Promise<{tokens: Tokens, user: Partial<User></User>}>} - The tokens and user data of the registered user.
   */
  async register(
    CreateUserDto: CreateUserDto
  ): Promise<{ tokens: Tokens; user: Partial<User> }> {
    if (CreateUserDto.provider) {
      // TODO : handle provider registration like validate provider token
      return;
    }
    return await this.createUser(CreateUserDto);
  }
  /**
   * Retrieves a user by their email address.
   *
   * @param {string} email - The email address of the user to retrieve.
   * @return {Promise<User>} A Promise that resolves with the user found by the email.
   */
  private async getUserByEmail(email: string) {
    return this.db.user.findUnique({ where: { email } });
  }
  /**
   * Validates a password by verifying it against a stored hash.
   *
   * @param {string} sentPassword - The password to validate.
   * @param {string} userPassword - The hashed password to compare against.
   * @throws {ForbiddenException} If the password is invalid.
   */
  private async validatePassword(sentPassword: string, userPassword: string) {
    const validPassword = await this.authenticationService.verifyPassword(
      sentPassword,
      userPassword
    );
    if (!validPassword) {
      throw new ForbiddenException('Invalid credentials');
    }
  }
  /**
   * Creates a new user in the database.
   *
   * @param {CreateUserDto} createUserDto - The data for creating the user.
   * @return {Promise<{tokens: Tokens, user: User}>} - The tokens and user data of the created user.
   * @throws {ForbiddenException} - If the credentials are already taken.
   */
  private async createUser(createUserDto: CreateUserDto) {
    try {
      const hashPassword = await this.authenticationService.hashPassword(
        createUserDto.password
      );
      const user = await this.db.user.create({
        data: {
          ...createUserDto,
          password: hashPassword,
        },
        select: {
          id: true,
          username: true,
          email: true,
          firstname: true,
          lastname: true,
          twoWayAuth: true,
          emailVerified: true,
          provider: true,
          createdAt: true,
          updatedAt: true,
          imgId: true,
          role: {
            select: {
              roleName: true,
            },
            include: {
              RolePermision: true,
            },
          },
        },
      });

      // TODO: we should send email verification email
      const tokens = await this.authenticationService.obtainTokens(
        user.id,
        user.email
      );
      return {
        tokens,
        user,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      } else {
        throw error;
      }
    }
  }
}

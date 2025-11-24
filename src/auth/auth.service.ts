import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(email: string, password: string) {
    const existing = await this.userService.findByEmail(email);

    if (existing) {
      throw new ConflictException('Alguém já está utilizando esse e-mail!');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const created = await this.userService.createUser(email, passwordHash);

    const plain = created.toObject ? created.toObject() : created;
    const { passwordHash: _, ...safe } = plain;
    return safe;
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const plain = user.toObject ? user.toObject() : user;
    const { passwordHash: _, ...safe } = plain;
    return safe;
  }

  async login(user: any) {
    return { message: 'JWT não implementado ainda', user };
  }
}

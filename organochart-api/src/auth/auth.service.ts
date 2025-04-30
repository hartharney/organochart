import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtPayload } from './interfaces/jwt-payload.interfaces';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(payload: JwtPayload) {
    return this.userService.findById(payload.sub);
  }
}

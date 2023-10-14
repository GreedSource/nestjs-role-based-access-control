import { UserService } from '@modules/user/user.service';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

@Injectable()
export class CreatedByInterceptor implements NestInterceptor {
  constructor(private readonly userService: UserService) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const { auth } = request;
    request.body.createdBy = auth;
    return next.handle();
  }
}

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class CreatedByInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const { auth } = request;
    request.body.createdBy = _.pick(auth, ['id']);
    return next.handle();
  }
}

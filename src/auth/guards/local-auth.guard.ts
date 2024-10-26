import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  // این گارد به طور خودکار از استراتژی 'local' که در auth.module.ts تعریف شده است، استفاده می‌کند.
}

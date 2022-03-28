import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

// ビジネスロジックを記載
// controllerファイルで呼び出されて実行される
@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
  signup() {
    return { msg: '新規登録です' };
  }
  signin() {
    return { msg: 'ログインです' };
  }
}

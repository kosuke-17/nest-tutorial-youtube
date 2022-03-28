import { Injectable } from '@nestjs/common';

// ビジネスロジックを記載
// controllerファイルで呼び出されて実行される
@Injectable({})
export class AuthService {
  signup() {
    return { msg: '新規登録です' };
  }
  signin() {
    return { msg: 'ログインです' };
  }
}

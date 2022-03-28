import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

// serviceファイルのロジックを受け取り、実行する
// そのために、　クラスないでサービスを初期化しておくことでインスタンス化されるので
// stringが返るときはcontent-typeがtext/htmlになって、objectだとapplication/jsonになる
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup() {
    return this.authService.signup();
  }

  @Post('signin')
  signin() {
    return this.authService.signin();
  }
}

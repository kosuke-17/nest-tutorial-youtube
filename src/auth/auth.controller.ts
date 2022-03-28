import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

// serviceファイルのロジックを受け取り、実行する
// そのために、　クラスないでサービスを初期化しておくことでインスタンス化されるので
// stringが返るときはcontent-typeがtext/htmlになって、objectだとapplication/jsonになる
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // requestを受け取ることができる
  // リクエストの中のボディでも受け取れる
  // signup(@Req() req: Request) {
  //   console.log(req.body);
  //   return this.authService.signup();
  // }
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    console.log(dto);
    return this.authService.signup();
  }
  // { dto: { email: 'test@test.com', password: 'pass' } }

  @Post('signin')
  signin() {
    return this.authService.signin();
  }
}

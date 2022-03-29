import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
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
    return this.authService.signup(dto);
  }

  // Httpステータスを指定できるデコレーター
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}

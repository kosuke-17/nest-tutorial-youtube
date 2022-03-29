import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

// ビジネスロジックを記載
// controllerファイルで呼び出されて実行される
@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  /**
   * ユーザー新規登録処理
   * @param dto - ユーザーが削除するデータ
   * @returns ユーザ情報(ハッシュなし)
   */
  async signup(dto: AuthDto) {
    try {
      // ハッシュ化されたパスワードを生成
      const hash = await argon.hash(dto.password);

      // DBに新規のユーザーを保存
      // selectでuserに帰ってくるデータを指定してる
      // select: {
      //   id: true,
      //   email: true,
      //   createdAt: true,
      // },
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });
      // リターンに不要なハッシュデータを削除
      delete user.hash;

      // 保存したユーザーを返す
      return user;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        // 一意ではない時のcode
        if (e.code === 'P2002') {
          throw new ForbiddenException('認証に失敗しました');
        }
      }
      throw e;
    }
  }
  /**
   * ログイン処理
   * @param dto - ログインに必要なデータ
   * @returns jwtToken
   */
  async signin(dto: AuthDto) {
    // ユーザーのメールアドレスを見つける
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    // 見つからなければエラー
    if (!user) throw new ForbiddenException('認証失敗しました。');

    // パスワードを比較する
    const pwMatche = await argon.verify(user.hash, dto.password);
    // 正しくなければエラー
    if (!pwMatche) throw new ForbiddenException('認証に失敗しました。');
    // ユーザー情報を送る
    return this.signToken(user.id, user.email);
  }
  /**
   * userId,emailを利用したJWTトークンの生成
   * @param userId - ユーザーID
   * @param email - メールアドレス
   * @returns jwtToken
   */
  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }

  return;
}

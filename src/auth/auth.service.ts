import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as argon from 'argon2';

// ビジネスロジックを記載
// controllerファイルで呼び出されて実行される
@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
  /**
   * @param dto - ユーザーが削除するデータ
   * @returns ユーザ情報(ハッシュなし)
   */
  async signup(dto: AuthDto) {
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
  }
  signin() {
    return { msg: 'ログインです' };
  }
}

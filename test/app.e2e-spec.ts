import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';
import { AuthDto } from 'src/auth/dto/auth.dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  //  アプリケーションを用意
  beforeAll(async () => {
    // テスト用にAppモジュールを用意
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    // テスト用モジュールからアプリを作成
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    // アプリの初期化を行う
    await app.init();
    // アプリの起動
    await app.listen(9000);

    // インスタンス化させる
    prisma = app.get(PrismaService);
    // PrismaServiceで用意したDBをきれいにするメソッドを実装
    await prisma.cleanDB();
    // 変化しないURLを前もって準備しておく
    pactum.request.setBaseUrl('http://localhost:9000');
  });

  // アプリケーションを閉じる
  afterAll(() => {
    app.close();
  });

  describe('認証', () => {
    const dto: AuthDto = { email: 'test@test.com', password: 'test1234' };
    describe('新規登録', () => {
      it('メールアドレスが空の時にエラーが表示される', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ password: dto.password })
          .expectStatus(400);
        // .inspect();
      });
      it('パスワードが空の時にエラーが表示される', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ email: dto.email })
          .expectStatus(400);
        // .inspect();
      });
      it('メールアドレスもパスワードも空の時にエラーが表示される', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({})
          .expectStatus(400);
        // .inspect();
      });
      it('新規登録できること', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
        // .inspect();
      });
    });
    describe('ログイン', () => {
      it('メールアドレスが空の時にエラーが表示される', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ password: dto.password })
          .expectStatus(400);
        // .inspect();
      });
      it('パスワードが空の時にエラーが表示される', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ email: dto.email })
          .expectStatus(400);
        // .inspect();
      });
      it('メールアドレスもパスワードも空の時にエラーが表示される', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({})
          .expectStatus(400);
        // .inspect();
      });
      it('ログインできること', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200);
      });
    });
  });
  // describe('ユーザー', () => {
  //   describe('本人情報取得', () => {});
  //   describe('ユーザー情報編集', () => {});
  // });
  // describe('ブックマークス', () => {
  //   describe('ブックマークを作成する', () => {});
  //   describe('ブックマークを取得する', () => {});
  //   describe('idに紐ずくブックマークを取得する', () => {});
  //   describe('ブックマークを編集する', () => {});
  // describe('ブックマークを削除する', () => {});
  // });
});

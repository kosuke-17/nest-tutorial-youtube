import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';

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

    // インスタンス化させる
    prisma = app.get(PrismaService);
    // PrismaServiceで用意したDBをきれいにするメソッドを実装
    await prisma.cleanDB();
  });

  // アプリケーションを閉じる
  afterAll(() => {
    app.close();
  });
  it.todo('通過');
});

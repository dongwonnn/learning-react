# Chapter 21 : 백엔드 프로그래밍 (koa)

- 데이터를 여러 사람과 공유하려면 저장할 공간이 필요하다.
- 백엔드 : 사용자 인증, 데이터 검증, 구분, 어떤 종류의 데이터를 보여줄지, 어떻게, 몇개를 보여줄지에 관한 로직을 만드는 것.
- Node.js 사용
- koa 사용

# 🎯 작업 환경 설정

- node.js 설치
- 프로젝트 생성
  - mkdir blog
  - cd blog
  - mkdir blog-backend
  - cd blog-backend
  - yarn init -y
- koa 설치
  - yarn add koa
- ESLint 설정
  - yarn add --dev eslint
  - yarn run eslint --init
  - syntax and find problems -> CommonJS -> None -> Node(space bar로 활성화) -> JSON
  - 선언하고 사용 안할 때, console.log 에러 제외. eslint.json에 추가
    ```
    "rules": {
        "no-unused-vars": "warn",
        "no-console": "off"
    }
    ```
- prettier 설정
  - blog/blog-backend에 yarn add eslint-config-prettier

# 🎯 koa 사용법

## 1. 서버 띄우기

- src/index.js

  ```
  const Koa = require('koa')
  const app = new Koa();
  app.use(ctx => {
      ctx.body = 'hello world'
  })
  app.listen(4000, ()=> {
      console.log('Listening to port 4000')
  })
  ```

- 실행 : node src

## 2. 미들웨어

- app.use() 함수는 미들웨어 함수를 애플리케이션에 등록한다.
- 미들웨어는 (ctx, next) => { ... }

  - ctx는 웹 요청과 응답에 대한 정보. next는 현재 처리 중인 미들웨어의 다음 미들웨어 호출하는 함수
  - next를 사용하지 않으면 ctx => { } 처럼 next를 설정하지 않아도 된다.
  - 다음 미들웨어를 처리하지 않아도 되는 라우트 미들웨어는 next를 생략해도 된다.
  - app.use()를 등록하는 순서대로 처리된다.
  - next함수는 Promise() 반환. -> async await 그냥 사용하면 된다.

    ```
    app.use(async (ctx, next) => {
        console.log(ctx.url);
        console.log(1);

        if (ctx.query.authorized !== '1') {
        ctx.status = 401;
        return;
        }

        await next();
        console.log('END');
    });
    ```

# 🎯 nodemon 사용하기

- 설치 : yarn add --dev nodemon
- package.json에 추가

  ```
    "scripts": {
      "start": "node src",
      "start:dev": "nodemon --watch src/ src/index.js"
    }
  ```

  - yarn start:dev 실행하면 코드 수정 시 서버 재실행

# 🎯 koa-router 사용하기

## 1. koa-router

- 다른 주소로 요청이 들어올 경우 다른 작업을 처리할 수 있도록 라우터를 사용
- yarn add koa-router
- index.js에서 router 설정

  ```
  const Koa = require('koa');
  const Router = require('koa-router');

  const app = new Koa();
  const router = new Router();

  // 라우터 설정
  router.get('/', (ctx) => {
    ctx.body = '홈';
  });
  router.get('/about', (ctx) => {
    ctx.body = '소개';
  });

  app.use(router.routes()).use(router.allowedMethods());
  ```

## 2. 라우트 파라미터와 쿼리

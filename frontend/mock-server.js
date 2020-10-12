const Koa = require("koa");
const Router = require("@koa/router");
const logger = require("koa-logger");

const app = new Koa();
const router = new Router();

let POST_ID = 1;
const generatePosts = (num) =>
  new Array(num).fill(null).map((_, idx) => ({
    id: POST_ID++,
    user_id: "seowook1963",
    title: "안드로이드 블루투스 연결 질문",
    body:
      "앞이 날카로우나 방황하였으며, 남는 황금시대의 커다란 그리하였는가?\n피에 불어 용감하고 말이다. 청춘에서만 듣기만 앞이 많이 부패뿐이다. 노년에게서 커다란 것이다.보라, 군영과 영락과 하여도...앞이 날카로우나 방황하였으며, 남는 황금시대의 커다란 그리하였는가? 피에 불어 용감하고 말이다. 청춘에서만 듣기만 앞이 많이 부패뿐이다. 노년에게서 커다란 것이다.보라, 군영과 영락과 하여도...",
    tag: "안드로이드",
    view: 321,
    recommend: 14,
    created_at: new Date(),
    updated_at: new Date(),
  }));

router
  .post("/user/signup", (ctx) => {
    ctx.body = "";
  })
  .post("/user/signin", (ctx) => {
    ctx.body = {
      response: "success",
      message: "로그인에 성공했습니다.",
      data:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImlkIiwiaWF0IjoxNjAxNzEyNTM5LCJleHAiOjE2MDE3MTI1NDl9.2nw12hvcVy2LTP2PjDTbsKjN-uWKL2wPctvfvsr9-qg",
    };
  })
  .post("/user/signout", (ctx) => {
    ctx.body = "";
  })
  .get("/authorized", (ctx) => {
    if (ctx.loggedIn) {
      ctx.body = {
        response: "success",
        message: "성공.",
        data: null,
      };
    } else {
      ctx.body = {
        response: "error",
        message: "실패.",
        data: null,
      };
    }
  })
  .get("/board/:id", (ctx) => {
    ctx.body = {
      response: "success",
      message: "조회성공",
      data: { totalPage: 3, boards: generatePosts(10) },
    };
  });

app
  .use(logger())
  .use(async (ctx, next) => {
    if (ctx.request.header["authorization"]) {
      ctx.loggedIn = true;
    } else {
      ctx.loggedIn = false;
    }
    await next();
  })
  .use(router.routes())
  .use(router.allowedMethods());

const PORT = 8520;
app.listen(PORT, () => {
  console.log(`Mock listening on http://localhost:${PORT}/`);
});

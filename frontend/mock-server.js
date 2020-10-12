const Koa = require("koa");
const Router = require("@koa/router");
const logger = require("koa-logger");

const app = new Koa();
const router = new Router();

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

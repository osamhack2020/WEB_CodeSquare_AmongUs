const Koa = require("koa");
const Router = require("@koa/router");
const logger = require("koa-logger");

const app = new Koa();
const router = new Router();

const now = new Date();

let POST_ID = 1;
let TAG_ID = 1;
const generatePost = (id, answer = false) => ({
  id: id,
  username: "seowook12",
  member_name: "서욱",
  title: !answer && "안드로이드 블루투스 연결 질문",
  body:
    "앞이 날카로우나 방황하였으며, 남는 황금시대의 커다란 그리하였는가?\n피에 불어 용감하고 말이다. 청춘에서만 듣기만 앞이 많이 부패뿐이다. 노년에게서 커다란 것이다.보라, 군영과 영락과 하여도...앞이 날카로우나 방황하였으며, 남는 황금시대의 커다란 그리하였는가? 피에 불어 용감하고 말이다. 청춘에서만 듣기만 앞이 많이 부패뿐이다. 노년에게서 커다란 것이다.보라, 군영과 영락과 하여도...",
  tags: !answer && [{ body: "안드로이드" }, { body: "Kotlin" }],
  view: 321,
  recommend: 14,
  created_at: now.toString(),
  updated_at: now.toString(),
});
const generatePosts = (num, answer = false) => {
  const posts = new Array(num)
    .fill(null)
    .map(() => generatePost(POST_ID++, answer));
  if (answer === true) {
    posts[0].adopted = 1;
  }
  return posts;
};

const generateComment = (id) => ({
  id: id,
  username: id % 2 === 0 ? "seowook12" : "1q2w3e4r",
  member_name: id % 2 === 0 ? "서욱" : "홍길동",
  body: "보이는 이성은 노년에게서 동력은 것이다. 열락의 꽃 구할 못할 것이다.",
  created_at: now,
  updated_at: now,
});
const generateComments = (num) =>
  new Array(num).fill(null).map(() => generateComment(POST_ID++));

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
  .get("/board/title/:keyword/:pageNum", (ctx) => {
    ctx.body = {
      response: "success",
      message: "조회성공",
      data: { totalPage: 1, boards: generatePosts(3) },
    };
  })
  .put("/board/view/:id", (ctx) => {
    ctx.body = {
      response: "success",
      message: "view 1회 증가",
      data: null,
    };
  })
  .put("/board/recommend", (ctx) => {
    ctx.body = {
      response: "success",
      message: "recommend 수정",
      data: null,
    };
  })
  .get("/board/specific/:id", (ctx) => {
    ctx.body = {
      response: "success",
      message: "반환된 게시물",
      data: generatePost(ctx.params.id),
    };
  })
  .get("/boardcomment/:id", (ctx) => {
    ctx.body = {
      response: "success",
      message: "게시물 댓글 조회 성공",
      data: generateComments(5),
    };
  })
  .post("/boardcomment/:id", (ctx) => {
    ctx.body = {
      response: "success",
      message: "게시물 댓글 생성 성공",
      data: null,
    };
  })
  .post("/repliescomment/:id", (ctx) => {
    ctx.body = {
      response: "success",
      message: "게시물 댓글 생성 성공",
      data: null,
    };
  })
  .get("/board/tag/:id", (ctx) => {
    ctx.body = {
      response: "success",
      message: "태그 조회 성공",
      data: [
        { id: TAG_ID++, body: "안드로이드", board: ctx.params.id },
        { id: TAG_ID++, body: "Kotlin", board: ctx.params.id },
      ],
    };
  })
  .get("/replies/:postId", (ctx) => {
    ctx.body = {
      response: "success",
      message: "답글 조회 성공",
      data: generatePosts(3, true),
    };
  })
  .get("/boardcomment/:postId", (ctx) => {
    ctx.body = {
      response: "success",
      message: "댓글 조회 성공",
      data: generateComments(3),
    };
  })
  .get("/repliescomment/:postId", (ctx) => {
    ctx.body = {
      response: "success",
      message: "댓글 조회 성공",
      data: generateComments(3),
    };
  })
  .get("/board/:pageNum", (ctx) => {
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

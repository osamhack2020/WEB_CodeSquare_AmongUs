const Koa = require("koa");
const Router = require("@koa/router");
const logger = require("koa-logger");
const bodyParser = require("koa-bodyparser");

const app = new Koa();
const router = new Router();

const now = new Date();

let POST_ID = 1;
let TAG_ID = 1;
const generatePost = (id, answer = false) => ({
  id: id,
  username: id % 2 === 0 ? "seowook12" : "1q2w3e4r",
  member_name: id % 2 === 0 ? "서욱" : "홍길동",
  title: !answer && "안드로이드 블루투스 연결 질문",
  body: `ArrayList 는 데이터를 순서대로 등록하기만 하는 줄 알았는데,

key 값이 같은 HashMap 을 연속으로 등록했더니 먼저 등록한 데이터들까지 마지막에 등록한 데이터와 같은 데이터로 변경되었습니다.

이것저것 시험해본 결과, key 값이 같은 경우에만 이렇게 되는 거 같은데, ArrayList 는 원래 key 값이 같은 데이터가 들어오면, 예전에 등록된 데이터까지 수정해버리나요?

아니면 다른 조건이 더 필요한가요?

그 때 코드는 대충 이런 모양이었습니다.

\`\`\`java
ArrayList<HashMap<String, String>> al = new ArrayList<HashMap<String, String>>();
HashMap<String, String> hm = new HashMap<String, String>();

for (int i=0; i<3 ; i++ ) { 
    hm.put("목록", i);
    aList.add(hm);
    System.out.println("aList >>> : " + aList);
}
\`\`\`
참고로 for문 안에 \`HashMap hm = new HashMap();\`를 옮겨 쓰면 되는 건 알고있습니다.

제가 알고싶은 건 ArrayList에 등록 된 데이터가 나중에 등록 된 데이터로 인해 수정되는 조건입니다.`,
  tags: !answer && [{ body: "java" }, { body: "안드로이드" }],
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
    // posts[0].adopted = 1;
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
      data: generatePost(Number(ctx.params.id)),
    };
  })
  .get("/boardcomment/:id", (ctx) => {
    ctx.body = {
      response: "success",
      message: "게시물 댓글 조회 성공",
      data: generateComments(2),
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
  })
  .post("/board", (ctx) => {
    const { body, tag: tags, title } = ctx.request.body;
    ctx.body = {
      response: "success",
      message: "게시물 생성 성공",
      data: {
        ...generatePosts(1)[0],
        body,
        tags: tags.split(" ").map((tag) => ({
          data: tag,
        })),
        title,
      },
    };
  })
  .put("/replies/adopted/:postId", (ctx) => {
    ctx.body = {
      response: "success",
      message: "답글 채택 성공",
      data: null,
    };
  })
  .put("/board/:postId", (ctx) => {
    const postId = ctx.params.postId;
    const { body, tag: tags, title } = ctx.request.body;
    ctx.body = {
      response: "success",
      message: "질문글 수정 성공",
      data: {
        ...generatePost(postId),
        body,
        tags: tags.split(" ").map((tag) => ({ data: tag })),
        title,
      },
    };
  })
  .put("/replies/:postId", (ctx) => {
    const postId = ctx.params.postId;
    const { body } = ctx.request.body;
    ctx.body = {
      response: "success",
      message: "답글 수정 성공",
      data: { ...generatePost(postId, true), body },
    };
  })
  .delete("/board/:postId", (ctx) => {
    ctx.body = {
      response: "success",
      message: "질문글 삭제 성공",
      data: null,
    };
  })
  .delete("/replies/:postId", (ctx) => {
    ctx.body = {
      response: "success",
      message: "답변글 삭제 성공",
      data: null,
    };
  });

app
  .use(logger())
  .use(bodyParser())
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

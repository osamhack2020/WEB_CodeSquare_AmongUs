import { QnaComment, QnaPost } from "../../lib/api/qna";

let POST_ID = 1;
export const generatePosts = (num: number): QnaPost[] =>
  new Array(num).fill(null).map(() => ({
    id: POST_ID++,
    username: "seowook1963",
    member_name: "서욱",
    title: "안드로이드 블루투스 연결 질문",
    text:
      "앞이 날카로우나 방황하였으며, 남는 황금시대의 커다란 그리하였는가?\n피에 불어 용감하고 말이다. 청춘에서만 듣기만 앞이 많이 부패뿐이다. 노년에게서 커다란 것이다.보라, 군영과 영락과 하여도...앞이 날카로우나 방황하였으며, 남는 황금시대의 커다란 그리하였는가? 피에 불어 용감하고 말이다. 청춘에서만 듣기만 앞이 많이 부패뿐이다. 노년에게서 커다란 것이다.보라, 군영과 영락과 하여도...",
    tags: ["안드로이드", "Kotlin"],
    view: 321,
    recommend: 14,
    created_at: new Date().toString(),
    updated_at: new Date().toString(),
    comments: generateComments(5),
    answer: false,
    voted: 0,
  }));

let COMMENT_ID = 1;
export const generateComments = (num: number): QnaComment[] =>
  new Array(num).fill(null).map((_, idx) => {
    return {
      id: COMMENT_ID++,
      username: "seowook1963",
      member_name: "서욱",
      text:
        "보이는 이성은 노년에게서 동력은 것이다. 열락의 꽃 구할 못할 것이다.",
      created_at: new Date().toString(),
      updated_at: new Date().toString(),
      is_author: COMMENT_ID % 2 === 0,
    };
  });

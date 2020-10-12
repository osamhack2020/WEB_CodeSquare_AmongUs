import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { QnaPostItem } from "../../components/qna/QnaPostItem";

import {
  QnaPostList,
  QnaPostListProps,
} from "../../components/qna/QnaPostList";
import { QnaPost } from "../../modules/qna";

export default {
  title: "qna/QnaPostList",
  component: QnaPostList,
} as Meta;

const Template: Story<QnaPostListProps & { posts: QnaPost[] }> = ({
  posts,
  ...args
}) => (
  <QnaPostList {...args}>
    {posts.map((post) => {
      return <QnaPostItem key={post.id} post={post} />;
    })}
  </QnaPostList>
);

const generatePosts = (num: number): QnaPost[] =>
  new Array(num).fill(null).map((_, idx) => ({
    id: idx + 1,
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

export const Default = Template.bind({});
Default.args = {
  posts: generatePosts(5),
};

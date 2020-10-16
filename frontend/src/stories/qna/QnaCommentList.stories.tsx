/** @jsx jsx */
import { jsx } from "@emotion/core";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { QnaCommentItem } from "../../components/qna/QnaCommentItem";

import {
  QnaCommentList,
  QnaCommentListProps,
} from "../../components/qna/QnaCommentList";
import { Comment } from "../../modules/qna";

export default {
  title: "qna/QnaCommentList",
  component: QnaCommentList,
} as Meta;

const generateComments = (num: number): Comment[] =>
  new Array(num).fill(null).map((_, idx) => {
    return {
      id: idx + 1,
      user: {
        id: idx + 1,
        username: "홍길동",
      },
      text:
        "보이는 이성은 노년에게서 동력은 것이다. 열락의 꽃 구할 못할 것이다.",
      created_at: new Date().toString(),
      isAuthor: (idx + 1) % 2 === 0,
    };
  });

const Template: Story<QnaCommentListProps> = (args) => {
  return <QnaCommentList {...args} comments={generateComments(5)} />;
};
export const Default = Template.bind({});
Default.args = {};

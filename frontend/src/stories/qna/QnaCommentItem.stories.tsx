/** @jsx jsx */
import { jsx } from "@emotion/core";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import {
  QnaCommentItem,
  QnaCommentItemProps,
} from "../../components/qna/QnaCommentItem";

export default {
  title: "qna/QnaCommentItem",
  component: QnaCommentItem,
} as Meta;

const Template: Story<QnaCommentItemProps> = (args) => (
  <QnaCommentItem {...args} />
);

export const Default = Template.bind({});
Default.args = {
  comment: {
    id: 1,
    user: {
      id: 1,
      username: "홍길동",
    },
    text: "보이는 이성은 노년에게서 동력은 것이다. 열락의 꽃 구할 못할 것이다.",
    created_at: new Date().toString(),
    isAuthor: true,
  },
};

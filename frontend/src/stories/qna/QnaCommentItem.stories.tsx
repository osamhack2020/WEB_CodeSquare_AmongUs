/** @jsx jsx */
import { jsx } from "@emotion/core";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import {
  QnaCommentItem,
  QnaCommentItemProps,
} from "../../components/qna/QnaCommentItem";
import { generateComments } from "./generator";

export default {
  title: "qna/QnaCommentItem",
  component: QnaCommentItem,
} as Meta;

const Template: Story<QnaCommentItemProps> = (args) => (
  <QnaCommentItem {...args} />
);

export const Default = Template.bind({});
Default.args = {
  comment: generateComments(1)[0],
};

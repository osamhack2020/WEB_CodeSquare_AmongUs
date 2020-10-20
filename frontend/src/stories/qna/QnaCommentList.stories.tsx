/** @jsx jsx */
import { jsx } from "@emotion/core";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import {
  QnaCommentList,
  QnaCommentListProps,
} from "../../components/qna/QnaCommentList";
import { generateComments } from "./generator";

export default {
  title: "qna/QnaCommentList",
  component: QnaCommentList,
} as Meta;

const Template: Story<QnaCommentListProps> = (args) => {
  return <QnaCommentList {...args} comments={generateComments(5)} />;
};
export const Default = Template.bind({});
Default.args = {};

/** @jsx jsx */
import { jsx } from "@emotion/core";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { MemoryRouter } from "react-router-dom";

import {
  QnaPostItem,
  QnaPostItemProps,
} from "../../components/qna/QnaPostItem";
import { generatePosts } from "./generator";

export default {
  title: "qna/QnaPostItem",
  component: QnaPostItem,
} as Meta;

const Template: Story<QnaPostItemProps> = (args) => (
  <MemoryRouter>
    <QnaPostItem {...args} />
  </MemoryRouter>
);

export const Default = Template.bind({});
Default.args = {
  post: generatePosts(1)[0],
};

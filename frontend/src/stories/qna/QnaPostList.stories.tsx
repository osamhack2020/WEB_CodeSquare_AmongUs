import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { QnaPostItem } from "../../components/qna/QnaPostItem";

import {
  QnaPostList,
  QnaPostListProps,
} from "../../components/qna/QnaPostList";
import { QnaPost } from "../../lib/api/qna";
import { generatePosts } from "./generator";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "qna/QnaPostList",
  component: QnaPostList,
} as Meta;

const Template: Story<QnaPostListProps & { posts: QnaPost[] }> = ({
  posts,
  ...args
}) => (
  <MemoryRouter>
    <QnaPostList {...args}>
      {posts.map((post) => {
        return <QnaPostItem key={post.id} post={post} />;
      })}
    </QnaPostList>
  </MemoryRouter>
);

export const Default = Template.bind({});
Default.args = {
  posts: generatePosts(5),
};

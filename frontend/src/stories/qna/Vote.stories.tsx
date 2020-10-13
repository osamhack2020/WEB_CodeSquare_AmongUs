/** @jsx jsx */
import { jsx } from "@emotion/core";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import { Vote, VoteProps } from "../../components/qna/Vote";

export default {
  title: "qna/Vote",
  component: Vote,
} as Meta;

const Template: Story<VoteProps> = (args) => (
  <div>
    <Vote {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  votes: 5,
};

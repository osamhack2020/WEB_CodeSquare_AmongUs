/** @jsx jsx */
import { css, jsx } from "@emotion/core";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import { Header } from "../components/base/Header";

export default {
  title: "Base/Header",
  component: Header,
} as Meta;

const Template: Story = (args) => (
  <Header
    css={css`
      width: 1440px;
    `}
    {...args}
  />
);

export const Default = Template.bind({});
Default.args = {};

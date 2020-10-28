import React, { useState } from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import {
  MarkdownRender,
  MarkdownRenderProps,
} from "../../components/write/MarkdownRender";

export default {
  title: "write/MarkdownRender",
  component: MarkdownRender,
} as Meta;

const Template: Story<MarkdownRenderProps> = (args) => {
  return <MarkdownRender {...args} />;
};

export const Default = Template.bind({});
Default.args = {};

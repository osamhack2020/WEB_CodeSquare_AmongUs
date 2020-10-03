import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import { TextButton, TextButtonProps } from "../components/common/TextButton";

export default {
  title: "Common/TextButton",
  component: TextButton,
} as Meta;

const Template: Story<TextButtonProps & React.HTMLProps<HTMLButtonElement>> = (
  args,
) => <TextButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: "TextButton",
};

export const Disabled = Template.bind({});
Disabled.args = { disabled: true, label: "TextButton" };

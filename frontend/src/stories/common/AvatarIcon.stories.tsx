import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import {
  AvatarIcon,
  AvatarIconProps,
} from "../../components/common/AvatarIcon";

export default {
  title: "common/AvatarIcon",
  component: AvatarIcon,
} as Meta;

const Template: Story<AvatarIconProps> = (args) => <AvatarIcon {...args} />;

export const Default = Template.bind({});
Default.args = {
  width: "46px",
  height: "46px",
};

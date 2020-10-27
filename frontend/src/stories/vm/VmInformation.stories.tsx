/** @jsx jsx */
import { css, jsx } from "@emotion/core";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { useState } from "react";
import { Button } from "../../components/common/Button";

import {
  VmInformation,
  VmInformationProps,
} from "../../components/vm/VmInformation";

export default {
  title: "vm/VmInformation",
  component: VmInformation,
} as Meta;

const Template: Story<VmInformationProps> = (args) => {
  return (
    <div
      css={css`
        display: flex;
        width: 100%;
      `}
    >
      <VmInformation {...args} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  created_at: new Date().toString(),
};

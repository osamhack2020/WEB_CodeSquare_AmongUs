/** @jsx jsx */
import { css, jsx } from "@emotion/core";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import { Header, HeaderProps } from "../../components/base/Header";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "base/Header",
  component: Header,
} as Meta;

const Template: Story<HeaderProps> = (args) => (
  <MemoryRouter>
    <div
      css={css`
        padding: 8px;
        background: #c4c4c4;
      `}
    >
      <Header {...args} />
    </div>
  </MemoryRouter>
);

export const Default = Template.bind({});
Default.args = {
  user: { username: "seowook12" },
};

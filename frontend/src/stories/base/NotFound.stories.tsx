/** @jsx jsx */
import { css, jsx } from "@emotion/core";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { MemoryRouter } from "react-router-dom";

import { NotFound } from "../../components/base/NotFound";

export default {
  title: "base/NotFound",
  component: NotFound,
} as Meta;

const Template: Story = (args) => (
  <MemoryRouter>
    <NotFound {...args} />
  </MemoryRouter>
);

export const Default = Template.bind({});
Default.args = {};

/** @jsx jsx */
import { css, jsx } from "@emotion/core";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import { Footer } from "../../components/base/Footer";

export default {
  title: "base/Footer",
  component: Footer,
} as Meta;

const Template: Story = (args) => <Footer {...args} />;

export const Default = Template.bind({});
Default.args = {};

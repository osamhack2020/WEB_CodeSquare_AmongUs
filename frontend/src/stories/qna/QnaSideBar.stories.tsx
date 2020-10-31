/** @jsx jsx */
import { jsx } from "@emotion/core";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import { QnaSideBar, QnaSideBarProps } from "../../components/qna/QnaSideBar";

export default {
  title: "qna/QnaSideBar",
  component: QnaSideBar,
} as Meta;

const Template: Story<QnaSideBarProps> = (args) => <QnaSideBar {...args} />;

export const Default = Template.bind({});
Default.args = {};

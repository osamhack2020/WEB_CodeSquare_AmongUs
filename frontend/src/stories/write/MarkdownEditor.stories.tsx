import React, { useCallback, useState } from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import { MarkdownEditor } from "../../components/write/MarkdownEditor";

export default {
  title: "write/MarkdownEditor",
  component: MarkdownEditor,
} as Meta;

const Template: Story = (args) => {
  const [text, setText] = useState("");
  const onTextChange = useCallback(
    (text: string) => {
      setText(text);
    },
    [setText],
  );
  return <MarkdownEditor text={text} onChange={onTextChange} {...args} />;
};

export const Default = Template.bind({});
Default.args = {};

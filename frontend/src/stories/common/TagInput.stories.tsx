/** @jsx jsx */
import { css, jsx } from "@emotion/core";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { useCallback, useState } from "react";

import { TagInput, TagInputProps } from "../../components/common/TagInput";

export default {
  title: "common/TagInput",
  component: TagInput,
} as Meta;

const Template: Story<TagInputProps> = (args) => {
  const [tags, setTags] = useState<string[]>([]);
  const onChange = useCallback((tags: string[]) => setTags(tags), [setTags]);
  return <TagInput {...args} tags={tags} onChange={onChange} />;
};

export const Default = Template.bind({});
Default.args = {};

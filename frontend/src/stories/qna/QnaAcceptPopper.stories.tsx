/** @jsx jsx */
import { css, jsx } from "@emotion/core";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { useState } from "react";
import { Button } from "../../components/common/Button";

import { QnaAcceptPopper } from "../../components/qna/QnaAcceptPopper";

export default {
  title: "qna/QnaAcceptPopper",
  component: QnaAcceptPopper,
} as Meta;

const Template: Story = (args) => {
  const [buttonRef, setButtonRef] = useState<HTMLButtonElement | null>(null);
  const [show, setShow] = useState(true);
  return (
    <div
      css={css`
        display: flex;
        width: 100%;
        justify-content: center;
      `}
    >
      <Button ref={setButtonRef} onClick={() => setShow((val) => !val)}>
        Toggle Popper
      </Button>
      <QnaAcceptPopper anchorEl={buttonRef} show={show} {...args} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};

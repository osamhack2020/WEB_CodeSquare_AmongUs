/** @jsx jsx */
import { css, jsx } from "@emotion/core";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { useState } from "react";

import {
  QnaWriteForm,
  QnaWriteFormProps,
} from "../../components/qna/QnaWriteForm";
import useInput from "../../lib/hooks/useInput";

export default {
  title: "qna/QnaWriteForm",
  component: QnaWriteForm,
} as Meta;

const Template: Story<QnaWriteFormProps> = (args) => {
  const [title, onTitleChange] = useInput("안드로이드 블루투스 연결 질문");
  const [text, setText] = useState(
    `# h1 Heading\n## h2 Heading\n### h3 Heading\n#### h4 Heading\n##### h5 Heading\n###### h6 Heading\n\n같으며, 보이는 이성은 노년에게서 동력은 것이다. 그들의 위하여 공자는 눈에 열매를 가진 청춘이 속에 천고에 부패뿐이다. 우리 수 창공에 듣기만 별과 천하를 피어나기 말이다. 설레는 크고 청춘을 옷을 커다란 듣기만 눈이 그들의 천하를 운다. 끝에 찾아 인간의 있는 청춘의 싹이 이상의 청춘의 이것이다. 인생에 없는 예가 피부가 천하를 원대하고, 가진 사랑의 보는 이것이다.`,
  );
  const [tags, setTags] = useState(["Kotlin", "안드로이드"]);
  return (
    <QnaWriteForm
      {...args}
      title={title}
      tags={tags}
      text={text}
      onTitleChange={onTitleChange}
      onTextChange={setText}
      onTagChange={setTags}
      css={css`
        padding: 16px;
        border: 1px solid #e3e3e3;
        border-radius: 6px;
      `}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  formTitle: "질문 등록하기",
  submitType: "등록",
};

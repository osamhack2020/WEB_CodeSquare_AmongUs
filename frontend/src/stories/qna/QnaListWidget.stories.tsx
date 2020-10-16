/** @jsx jsx */
import { jsx } from "@emotion/core";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { MemoryRouter } from "react-router-dom";

import {
  QnaListWidget,
  QnaListWidgetProps,
} from "../../components/qna/QnaListWidget";

export default {
  title: "qna/QnaListWidget",
  component: QnaListWidget,
} as Meta;

const Template: Story<QnaListWidgetProps> = (args) => (
  <MemoryRouter>
    <QnaListWidget {...args} />
  </MemoryRouter>
);

export const Recent = Template.bind({});
Recent.args = {
  title: "답변을 기다리는 질문",
  posts: [
    { title: "빅 오(Big O) 계산은 어떻게 하나요?", id: 1 },
    { title: "숫자 맞추기 게임 관련 질문", id: 2 },
    { title: "자바 writeUTF 인코딩", id: 3 },
    { title: "파이썬 질문 급해요 ㅜㅜ", id: 4 },
    { title: "예외가 throw됨: 읽기 액세스 위반...", id: 5 },
    {
      title:
        "빅 오 숫자 질문 throw됨: 계산은 인코딩 위반 관련 하나요? 숫자 급해요 예외가 ㅜㅜ",
      id: 6,
    },
  ],
};

export const Trending = Template.bind({});
Trending.args = {
  title: "최근 인기 질문",
  posts: [
    { title: "빅 오(Big O) 계산은 어떻게 하나요?", id: 1 },
    { title: "숫자 맞추기 게임 관련 질문", id: 2 },
    { title: "자바 writeUTF 인코딩", id: 3 },
    { title: "파이썬 질문 급해요 ㅜㅜ", id: 4 },
    { title: "예외가 throw됨: 읽기 액세스 위반...", id: 5 },
  ],
};

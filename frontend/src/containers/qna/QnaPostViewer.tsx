/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { AvatarIcon } from "../../components/common/AvatarIcon";
import { VerticalDivider } from "../../components/common/VerticalDivider";
import { QnaTagList } from "../../components/qna/QnaTagList";
import { Vote } from "../../components/qna/Vote";
import { QnaComments } from "./QnaComments";

export const QnaPostViewer: React.FC = (props) => {
  return (
    <div
      css={css`
        display: flex;
      `}
      {...props}
    >
      <div
        css={css`
          width: 20px;
          margin-top: 16px;
        `}
      >
        <Vote votes={32} />
      </div>
      <div
        css={css`
          flex: 1 1 auto;
          display: flex;
          flex-direction: column;
          margin-left: 32px;
        `}
      >
        <div
          css={css`
            font-size: 30px;
            font-style: normal;
            font-weight: 400;
            line-height: 43px;
            letter-spacing: -0.02em;
            text-align: left;
            padding-bottom: 9px;

            color: #323232;
          `}
        >
          안드로이드 스튜디오 블루투스 질문
        </div>
        <div
          css={css`
            display: flex;
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: 17px;
            letter-spacing: -0.02em;
            text-align: left;
            align-items: center;

            & > *:not(:last-child) {
              margin-right: 10px;
            }
            & > div {
              color: #5a5a5a;
            }
          `}
        >
          <div
            css={css`
              display: flex;
              color: #3e3e3e;
              font-weight: 600;
            `}
          >
            <AvatarIcon width={16} height={16} alt="@seowook12" />
            <div>서욱</div>
          </div>
          <VerticalDivider
            height={8}
            css={css`
              align-self: center;
              fill: #c4c4c4;
            `}
          />
          <div>2020.10.04 21:57</div>
          <VerticalDivider
            height={8}
            css={css`
              align-self: center;
              fill: #c4c4c4;
            `}
          />
          <div>조회수: 11,101</div>
        </div>
        <div
          css={css`
            padding-top: 40px;
            padding-bottom: 40px;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 20px;
            letter-spacing: 0em;
            text-align: left;
          `}
        >
          같으며, 보이는 이성은 노년에게서 동력은 것이다. 그들의 위하여 공자는
          눈에 열매를 가진 청춘이 속에 천고에 부패뿐이다. 우리 수 창공에 듣기만
          별과 천하를 피어나기 말이다. 설레는 크고 청춘을 옷을 커다란 듣기만
          눈이 그들의 천하를 운다. 끝에 찾아 인간의 있는 청춘의 싹이 이상의
          청춘의 이것이다. 인생에 없는 예가 피부가 천하를 원대하고, 가진 사랑의
          보는 이것이다. 할지니, 너의 우리의 희망의 많이 것이다.
        </div>
        <QnaTagList
          css={css`
            padding-bottom: 26px;
          `}
        >
          <div>안드로이드</div>
          <div>Kotlin</div>
        </QnaTagList>
        <QnaComments />
      </div>
    </div>
  );
};

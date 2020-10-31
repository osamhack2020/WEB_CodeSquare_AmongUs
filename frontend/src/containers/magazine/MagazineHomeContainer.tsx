/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Card } from "../../components/magazine/Card";
import { formatDate } from "../../lib/utils";

export const MagazineHomeContainer: React.FC = () => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
      padding-top: 48px;
      max-width: 1120px;
      margin: 0 auto;
    `}
  >
    <div
      css={css`
        display: flex;
        padding-bottom: 100px;
        justify-content: space-between;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          margin-right: 36px;
          justify-content: center;
        `}
      >
        <div
          css={css`
            font-family: IBM Plex Sans;
            font-style: normal;
            font-weight: bold;
            font-size: 14px;
            line-height: 18px;
            letter-spacing: -0.02em;

            color: #9e63ff;
            padding-bottom: 6px;
          `}
        >
          FEATURED
        </div>
        <div
          css={css`
            font-style: normal;
            font-weight: bold;
            font-size: 32px;
            line-height: 46px;
            letter-spacing: -0.02em;

            color: #323232;

            margin-bottom: 21px;
            width: 360px;
            max-height: 92px;
            display: flex;
            flex-direction: column;
          `}
        >
          초보 개발자가 꼭 알아야 할 GitHub 협업 가이드
        </div>
        <div
          css={css`
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 24px;
            letter-spacing: -0.02em;

            text-overflow: ellipsis;
            word-break: break-word;
            overflow: hidden;
            overflow-wrap: break-word;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;

            color: #666666;
            width: 515px;
            margin-bottom: 21px;
          `}
        >
          Chrome 79 버전에 등장한 WebXR Device API는 이후 81 버전에서
          immersive-ar 세션을 지원하며 본격적인 모바일 AR 구현이 가능하게
          되었습니다. 이 글에서는 @egjs/view3d의 AR 기능을 개발하면서 익힌,
          WebXR을 이용한 웹에서의 AR 구현 방법과 기존 웹에서의 AR 구현 시도를 두
          편으로 나눠서 다룰 예정입니다. 첫 번째 편은 WebXR Device API에 대한
          설명과 이를 적용하는 데 고려할 점을 다루는 이론편이고 두 번째 편은
          실제 API를 적용하는 코드를 설명하는 실전편입니다.
        </div>
        <div
          css={css`
            font-style: normal;
            font-weight: normal;
            font-size: 12px;
            line-height: 17px;
            letter-spacing: -0.02em;

            color: #85898b;

            margin-bottom: 4px;
          `}
        >
          Luavis Dev Story
        </div>
        <div
          css={css`
            font-style: normal;
            font-weight: normal;
            font-size: 12px;
            line-height: 17px;
            letter-spacing: -0.02em;

            color: #85898b;
          `}
        >
          {formatDate("2020-10-31")}
        </div>
      </div>
      <div
        css={css`
          background-image: url(magazine-1.png);
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center center;
          width: 560px;
          height: 390px;
        `}
      />
    </div>

    <div
      css={css`
        & > div:not(:nth-child(4n)) {
          margin-right: 20px;
        }
        & > div {
          margin-bottom: 60px;
        }
      `}
    >
      <Card
        src="magazine-2.png"
        title="Static type의 맹점: TypeScript는 만병통치약이 아니다"
        source="Luavis Dev Story"
        created_at="2020-10-16"
      />
      <Card
        src="magazine-3.png"
        title="WebXR Device API를 이용한 웹 AR 구현, 그 한계와 대안"
        source="NAVER D2 Hello World"
        created_at="2020-10-16"
      />
      <Card
        src="magazine-4.png"
        title="2020년과 이후 JavaScript의 동향 - WebAssembly"
        source="NAVER D2 Hello World"
        created_at="2020-09-02"
      />
      <Card
        src="magazine-5.png"
        title="TypeScript 환경에서 Redux를 프로처럼 사용하기"
        source="velopert.log"
        created_at="2020-10-16"
      />
      <Card
        src="magazine-6.png"
        title={`원티드 - 요즘 "프론트엔드 개발" 어떻게 하지? 참관 후기`}
        source="velopert.log"
        created_at="2020-10-16"
      />
      <Card
        src="magazine-7.png"
        title="G1: Garbage first garbage collector"
        source="Luavis Dev Story"
        created_at="2020-10-16"
      />
      <Card
        src="magazine-8.png"
        title="좋은 스타트업을 고르는 기준"
        source="ddorong.log"
        created_at="2020-09-02"
      />
      <Card
        src="magazine-9.png"
        title="2020년과 이후 JavaScript의 동향 - JavaScript(ECMAS..."
        source="NAVER D2 Hello World"
        created_at="2020-10-16"
      />
    </div>
  </div>
);

/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { AvatarIcon } from "../../components/common/AvatarIcon";
import { Button } from "../../components/common/Button";
import { GitLabIcon, LocationIcon } from "../../components/common/Icon";
import { VerticalDivider } from "../../components/common/VerticalDivider";

export const ProfileContainer: React.FC = () => {
  return (
    <div
      css={css`
        padding-top: 74px;
        width: 1000px;
        margin: 0 auto;
        display: flex;
      `}
    >
      <div>
        <AvatarIcon
          width={165}
          height={165}
          alt=""
          css={css`
            margin-bottom: 26px;
          `}
        />
        <div
          css={css`
            display: flex;
            flex-direction: column;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 20px;
            letter-spacing: -0.02em;

            color: #444444;

            & > div {
              display: flex;
              align-items: center;
              padding-bottom: 4px;
            }
          `}
        >
          <div>
            <GitLabIcon
              css={css`
                width: 16px;
                height: 16px;
              `}
            />
            <div
              css={css`
                margin-left: 7px;
              `}
            >
              GitLab
            </div>
          </div>
          <div>
            <LocationIcon
              css={css`
                width: 16px;
                height: 16px;
              `}
            />
            <div
              css={css`
                margin-left: 7px;
              `}
            >
              육군 제12보병사단
            </div>
          </div>
        </div>
      </div>
      <div
        css={css`
          flex: 1 1 auto;
          margin-left: 58px;
          display: flex;
          flex-direction: column;
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            padding-bottom: 1px;
          `}
        >
          <div
            css={css`
              font-style: normal;
              font-weight: bold;
              font-size: 24px;
              line-height: 35px;
              letter-spacing: -0.02em;

              color: #323232;
            `}
          >
            서욱
          </div>
          <Button
            css={css`
              font-size: 14px;
              font-style: normal;
              font-weight: 700;
              line-height: 20px;
              letter-spacing: -0.02em;
              text-align: center;
              padding: 6px 30px;
            `}
          >
            팔로우
          </Button>
        </div>
        <div
          css={css`
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 20px;
            letter-spacing: -0.02em;
            text-align: left;
            color: #5b5b5b;

            padding-bottom: 8px;
          `}
        >
          @seowook1963
        </div>
        <div
          css={css`
            display: flex;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 20px;
            letter-spacing: -0.02em;
            text-align: left;
            color: #5b5b5b;
            padding-bottom: 28px;
            & > :not(:last-child) {
              margin-right: 8px;
            }
          `}
        >
          <div>팔로워: 1,249명</div>
          <VerticalDivider
            height={9}
            css={css`
              align-self: center;
              fill: #c4c4c4;
            `}
          />
          <div>팔로잉: 9명</div>
        </div>
        <div
          css={css`
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 20px;
            letter-spacing: -0.02em;
            text-align: left;
            padding-bottom: 72px;

            color: #787878;
          `}
        >
          <div>그들의 풍부하게 얼음 오아이스도 것이다.</div>
          <div>
            내려온 인도하겠다는 몸이 우리 피가 뜨거운지라, 맺어, 것이다.
          </div>
          <br />
          <div>따뜻한 오아이스도 피는 황금시대의 앞이 커다란 것이다.</div>
          <div>얼마나 얼음이 그들에게 우리의 못하다 들어 힘있다.</div>
          <div>대고, 새 피가 간에 봄바람이다. 따뜻한 대한 있는 때문이다.</div>
        </div>
        <div
          css={css`
            display: flex;
            & > div {
              width: 100%;
              font-style: normal;
              font-weight: bold;
              font-size: 18px;
              line-height: 26px;
              letter-spacing: -0.02em;

              color: #323232;
            }
          `}
        >
          <div>
            <div
              css={css`
                padding-bottom: 15px;
              `}
            >
              나의 질문
            </div>
            <div
              css={css`
                font-style: normal;
                font-weight: normal;
                font-size: 14px;
                line-height: 20px;
                letter-spacing: -0.02em;
                color: #323232;
                & > div {
                  text-overflow: ellipsis;
                  word-break: break-word;
                  overflow-wrap: break-word;
                  display: -webkit-box;
                  -webkit-line-clamp: 1;
                  -webkit-box-orient: vertical;
                  overflow: hidden;
                  padding-bottom: 4px;
                }
              `}
            >
              <div>빅 오(Big O) 계산은 어떻게 하나요?</div>
              <div>숫자 맞추기 게임 관련 질문</div>
              <div>
                Spark 리소스 할당과 실제 실행 될 때의 CPU, RAM 사용률에 대해
                질문드립니다.
              </div>
              <div>파이썬 질문 급해요 ㅜㅜ</div>
              <div>
                [안드로이드 스튜디오] 프래그먼트 간 전환시 전환이 한번밖에
                되지않는 문제
              </div>
            </div>
          </div>
          <div
            css={css`
              flex: 0;
              margin: 0px 25px;
            `}
          />
          <div>
            <div
              css={css`
                padding-bottom: 15px;
              `}
            >
              나의 답변
            </div>
            <div
              css={css`
                font-style: normal;
                font-weight: normal;
                font-size: 14px;
                line-height: 20px;
                letter-spacing: -0.02em;
                color: #323232;
                & > div {
                  text-overflow: ellipsis;
                  word-break: break-word;
                  overflow-wrap: break-word;
                  display: -webkit-box;
                  -webkit-line-clamp: 1;
                  -webkit-box-orient: vertical;
                  overflow: hidden;
                  padding-bottom: 4px;
                }
              `}
            >
              <div>빅 오(Big O) 계산은 어떻게 하나요?</div>
              <div>숫자 맞추기 게임 관련 질문</div>
              <div>
                Spark 리소스 할당과 실제 실행 될 때의 CPU, RAM 사용률에 대해
                질문드립니다.
              </div>
              <div>파이썬 질문 급해요 ㅜㅜ</div>
              <div>
                [안드로이드 스튜디오] 프래그먼트 간 전환시 전환이 한번밖에
                되지않는 문제
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

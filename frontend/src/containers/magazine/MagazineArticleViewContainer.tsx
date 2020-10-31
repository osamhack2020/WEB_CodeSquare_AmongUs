/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { VerticalDivider } from "../../components/common/VerticalDivider";
import { MarkdownRender } from "../../components/write/MarkdownRender";

export const MagazineArticleViewContainer: React.FC = () => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
      padding-top: 112px;
      padding-bottom: 88px;
      max-width: 740px;
      margin: 0 auto;
      align-items: center;
    `}
  >
    <div
      css={css`
        font-style: normal;
        font-weight: bold;
        font-size: 36px;
        line-height: 52px;
        text-align: center;
        letter-spacing: -0.02em;

        color: #323232;
        max-width: 550px;
        margin-bottom: 16px;
      `}
    >
      초보 개발자가 꼭 알아야 할 GitHub 협업 가이드
    </div>
    <div
      css={css`
        display: flex;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 17px;
        text-align: center;
        letter-spacing: -0.02em;
        text-align: left;

        color: #85898b;
        padding-bottom: 50px;
        & > :not(:last-child) {
          margin-right: 12px;
        }
      `}
    >
      <div>Luavis Dev Story</div>
      <VerticalDivider
        height={10}
        css={css`
          align-self: center;
          fill: #c0c0c0;
        `}
      />
      <div>2020.10.32</div>
    </div>
    <img
      src="/magazine-1.png"
      alt="magazine"
      css={css`
        max-width: 740px;
        margin-bottom: 60px;
      `}
    />
    <MarkdownRender
      text={atob(
        "IyBQcmlzbSB0aGVtZXMKClRoaXMgcmVwb3NpdG9yeSBsaXN0cyBhIHNlbGVjdGlvbiBvZiBhZGRpdGlvbmFsIHRoZW1lcyBmb3IgdGhlIFtQcmlzbSBzeW50YXggaGlnaGxpZ2h0aW5nIGxpYnJhcnldKGh0dHA6Ly9wcmlzbWpzLmNvbS8pLgoKIyMgSG93IHRvIHVzZSBhIHRoZW1lCgpUbyB1c2Ugb25lIG9mIHRoZSB0aGVtZXMsIGp1c3QgaW5jbHVkZSB0aGUgdGhlbWUncyBDU1MgZmlsZSBpbiB5b3VyIHBhZ2UuIEV4YW1wbGU6CgpgYGBodG1sCjwhRE9DVFlQRSBodG1sPgo8aHRtbD4KICAgIDxoZWFkPgogICAgICAgIC4uLgogICAgICAgIDxsaW5rIGhyZWY9InRoZW1lcy9wcmlzbS1naGNvbG9ycy5jc3MiIHJlbD0ic3R5bGVzaGVldCIgLz4KICAgIDwvaGVhZD4KICAgIDxib2R5PgogICAgICAgIC4uLgogICAgICAgIDxzY3JpcHQgc3JjPSJwcmlzbS5qcyI+PC9zY3JpcHQ+CiAgICA8L2JvZHk+CjwvaHRtbD4KYGBgCgojIyBBZGRpbmcgYSBOZXcgVGhlbWUKClRvIGFkZCB5b3VyIG93biB0aGVtZSwgY29weSBpdCBpbnRvIHRoZSBgdGhlbWVzYCBkaXJlY3RvcnkgYW5kIGFkZCB5b3VyIHRoZW1lcyB0byB0aGUgbGlzdCBvZiBhdmFpbGFibGUgdGhlbWVzIGluIHRoZSByZWFkbWUuClRoZSBsaW5rcyBmb3IgeW91ciB0aGVtZXMgaGF2ZSB0byBiZSBgdGhlbWVzL3ByaXNtLTx5b3VyIHRoZW1lPi5jc3NgIGZvciB0aGUgdGhlbWUgaXRzZWxmIGFuZCBgc2NyZWVuc2hvdHMvcHJpc20tPHlvdXIgdGhlbWU+LnBuZ2AgZm9yIHRoZSBzY3JlZW5zaG90LgoKVGhlIHNjcmVlbnNob3Qgd2lsbCBiZSBjcmVhdGVkIGZvciB5b3UgYnkgcnVubmluZyB0aGUgZm9sbG93aW5nIGNvbW1hbmQ6CgpgYGBiYXNoCm5wbSBpICYmIG5weCBndWxwIHNjcmVlbnNob3QKYGBgCgpCZWZvcmUgbWFraW5nIGEgcHVsbCByZXF1ZXN0LCB5b3UgY2FuIHRoZSBmb2xsb3dpbmcgY29tbWFuZCB0byB2ZXJpZnkgdGhhdCBhbGwgY2hlY2tzIHBhc3M6CgpgYGBiYXNoCm5wbSB0ZXN0CmBgYAoKVGhhbmsgeW91IHNvIG11Y2ggZm9yIGNvbnRyaWJ1dGluZyEh",
      )}
    />
  </div>
);

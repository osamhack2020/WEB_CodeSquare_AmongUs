import { css } from "@emotion/core";

export const prismTheme = css`
  /* atom one light theme */
  code,
  code[class*="language-"],
  pre[class*="language-"] {
    color: #24292e;
  }
  pre {
    box-shadow: 0px 0px 2px #00000005;
    background: #fbfcfd;
    color: #24292e;
    /* background: white; */
  }
  .token.builtin {
    color: #0184bc;
  }
  .token.function {
    color: #005cc5;
  }
  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #969896;
  }
  .token.punctuation {
    color: #24292e;
  }
  .token.atrule,
  .token.attr-value {
    color: #183691;
  }
  .token.property,
  .token.tag {
    color: #63a35c;
  }
  .token.boolean,
  .token.number {
    color: #986801;
  }
  .token.selector,
  .token.attr-name,
  .token.attr-value .punctuation:first-child,
  .token.keyword,
  .token.regex,
  .token.important {
    color: #a626a4;
  }
  .token.operator {
    color: #0184bc;
  }
  .token.entity,
  .token.url,
  .language-css,
  .token.string {
    color: #50a14f;
  }
  .token.entity {
    cursor: help;
  }
  .namespace {
    opacity: 0.7;
  }
`;

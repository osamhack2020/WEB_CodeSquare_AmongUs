import React from "react";
import GlobalStyles from "../src/GlobalStyles";
import { Global } from "@emotion/core";
import "@csstools/normalize.css";
import "../src/typography.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

export const decorators = [
  (Story) => (
    <>
      <Global styles={GlobalStyles} />
      <Story />
    </>
  ),
];

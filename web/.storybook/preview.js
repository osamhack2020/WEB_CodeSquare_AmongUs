import React from "react";
import "@csstools/normalize.css";
import GlobalStyles from "../src/GlobalStyles";
import { Global } from "@emotion/core";

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

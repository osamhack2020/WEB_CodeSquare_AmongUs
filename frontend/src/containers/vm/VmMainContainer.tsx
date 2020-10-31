/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { useSelector } from "react-redux";
import { VmMain } from "../../components/vm/VmMain";
import { RootState } from "../../modules";
import { User } from "../../modules/core";

export const VmMainContainer: React.FC = () => {
  const user = useSelector<RootState, User | null>((state) => state.core.user);

  return (
    <React.Fragment>
      <VmMain to={user ? "/vm/create" : "/login"} />
    </React.Fragment>
  );
};

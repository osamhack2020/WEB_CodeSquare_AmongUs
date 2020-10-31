/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { VmMain } from "../../components/vm/VmMain";
import { RootState } from "../../modules";
import { User } from "../../modules/core";
import { VmStatus } from "../../modules/vm";

export const VmMainContainer: React.FC = () => {
  const user = useSelector<RootState, User | null>((state) => state.core.user);
  const vm = useSelector<RootState, VmStatus | null>((state) => state.vm.vm);

  return (
    <React.Fragment>
      {vm && <Redirect to="/vm/status" />}
      {!vm && <VmMain to={user ? "/vm/loading" : "/login"} />}
    </React.Fragment>
  );
};

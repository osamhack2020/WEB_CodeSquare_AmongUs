/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import { VmLoading } from "../../components/vm/VmLoading";
import { getVm } from "../../lib/api/vm";
import { RootState } from "../../modules";
import { User } from "../../modules/core";
import vmModule, { VmStatus } from "../../modules/vm";
import { VmCreateContainer } from "./VmCreateContainer";
import { VmMainContainer } from "./VmMainContainer";
import { VmStatusContainer } from "./VmStatusContainer";

export const VmHomeContainer: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const user = useSelector<RootState, User | null>((state) => state.core.user);
  const vm = useSelector<RootState, VmStatus | null>((state) => state.vm.vm);
  useEffect(() => {
    let cancel = false;
    if (!user) {
      return;
    }
    setLoading(true);
    getVm()
      .then((data) =>
        dispatch(vmModule.actions.setVm({ ...data, status: "loading" })),
      )
      .catch(() => dispatch(vmModule.actions.setVm(null)))
      .finally(() => !cancel && setLoading(false));

    return () => {
      cancel = true;
    };
  }, [dispatch, setLoading, user]);

  useEffect(() => {
    if (!user) {
      history.replace("/vm");
      return;
    }
    if (loading) {
      history.push("/vm/loading");
      return;
    }
    if (!loading && vm) {
      history.replace("/vm/status");
      return;
    }
    if (!loading && !vm) {
      history.replace("/vm");
      return;
    }
  }, [history, loading, vm, user]);
  return (
    <Switch>
      <Route path="/vm/status">
        <VmStatusContainer />
      </Route>
      <Route path="/vm/loading">
        <VmLoading message="VM을 확인하는 중입니다." />
      </Route>
      <Route path="/vm/create">
        <VmCreateContainer />
      </Route>
      <Route path="/vm">
        <VmMainContainer />
      </Route>
    </Switch>
  );
};

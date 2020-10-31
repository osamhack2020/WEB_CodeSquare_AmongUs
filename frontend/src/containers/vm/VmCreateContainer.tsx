/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { VmLoading } from "../../components/vm/VmLoading";
import { createVm } from "../../lib/api/vm";
import vm, { VmStatus } from "../../modules/vm";

const timeout = (ms: number) =>
  new Promise((resolve) => setTimeout(() => resolve(), ms));

export const VmCreateContainer: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let cancel = false;
    const create = createVm();

    Promise.all([create, timeout(3000)])
      .then(([vmStatus]) => {
        dispatch(vm.actions.setVm(vmStatus as VmStatus));
        !cancel && history.replace("/vm/status");
      })
      .catch(() => !cancel && history.replace("/vm"));

    return () => {
      cancel = true;
    };
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */
  return <VmLoading message="VM을 생성하는 중입니다." />;
};

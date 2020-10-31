/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { VmLoading } from "../../components/vm/VmLoading";

export const VmLoadingContainer: React.FC = () => {
  const history = useHistory();
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const timer = setTimeout(() => {
      history.replace("/vm/status");
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */
  return <VmLoading />;
};

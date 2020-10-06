/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { RegisterForm } from "../../components/auth/RegisterForm";

export const RegisterContainer: React.FC = (props) => {
  const history = useHistory();
  const onCancel = useCallback(() => {
    history.push("/");
  }, [history]);
  const onSubmit = useCallback(() => {}, []);
  return (
    <RegisterForm
      onCancel={onCancel}
      onSubmit={onSubmit}
      {...props}
    ></RegisterForm>
  );
};

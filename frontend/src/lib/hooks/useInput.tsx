import { useState, useCallback, useEffect } from "react";

export default function useInput(
  defaultValue: string,
  cb?: (next: string) => boolean,
) {
  const [input, setInput] = useState(defaultValue);
  const [validate, setValidate] = useState(false);
  useEffect(() => {
    if (cb) {
      setValidate(cb(input));
    } else {
      setValidate(true);
    }
  }, [cb, input]);
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setInput(e.target.value);
    },
    [],
  );
  const onReset = useCallback((value = "") => setInput(value), []);
  return [input, onChange, onReset, validate] as [
    string,
    typeof onChange,
    typeof onReset,
    boolean,
  ];
}

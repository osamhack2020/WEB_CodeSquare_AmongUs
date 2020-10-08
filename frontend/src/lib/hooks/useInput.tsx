import { useState, useCallback } from "react";

export default function useInput(
  defaultValue: string,
  cb?: (prev: string, next: string) => boolean,
) {
  const [input, setInput] = useState(defaultValue);
  const [validate, setValidate] = useState(true);
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (cb) {
        setValidate(cb(input, e.target.value));
      }
      setInput(e.target.value);
    },
    [cb, input],
  );
  const onReset = useCallback(() => setInput(""), []);
  return [input, onChange, onReset, validate] as [
    string,
    typeof onChange,
    typeof onReset,
    boolean,
  ];
}

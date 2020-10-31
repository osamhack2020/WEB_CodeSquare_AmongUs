import { useState, useCallback, useEffect } from "react";

export default function useInput(
  defaultValue: string,
  cb?: (next: string) => string | null,
) {
  const [input, setInput] = useState(defaultValue);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  useEffect(() => {
    if (cb) {
      setErrorMsg(cb(input));
    } else {
      setErrorMsg(null);
    }
  }, [cb, input]);
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setInput(e.target.value);
    },
    [],
  );
  const onReset = useCallback((value = "") => setInput(value), []);
  return [input, onChange, onReset, errorMsg] as [
    string,
    typeof onChange,
    typeof onReset,
    string | null,
  ];
}

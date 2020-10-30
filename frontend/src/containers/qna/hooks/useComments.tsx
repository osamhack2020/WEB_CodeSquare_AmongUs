import { useCallback, useEffect, useState } from "react";
import { getComments, PostType, QnaComment } from "../../../lib/api/qna";

export default function useComments(type: PostType, postId: number) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<QnaComment[] | null>(null);

  const load = useCallback(async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const comments = await getComments(type, postId);
    setData(comments);
    setLoading(false);
  }, [loading, setLoading, setData, postId, type]);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    load();
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  const refetch = useCallback(async () => {
    await load();
  }, [load]);

  return { data, loading, refetch };
}

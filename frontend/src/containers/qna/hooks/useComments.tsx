import { useCallback, useEffect, useState } from "react";
import { getComments, QnaComment } from "../../../lib/api/qna";

export default function useComments(type: "board" | "replies", postId: number) {
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

  // 첫 페이지는 스크롤 이벤트 없이 onLoadMore 함수 호출
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    load();
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  return { data, loading };
}

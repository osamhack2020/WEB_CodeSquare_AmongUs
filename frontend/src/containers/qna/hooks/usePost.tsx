import { useCallback, useEffect, useState } from "react";
import { getPost, QnaPost } from "../../../lib/api/qna";

export default function usePost(postId: string) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{
    post: QnaPost;
    replies: QnaPost[];
  } | null>(null);

  const load = useCallback(async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const { replies, post } = await getPost(postId);
    setData({ replies, post });
    setLoading(false);
  }, [loading, setLoading, setData, postId]);

  /* eslint-disable react-hooks/exhaustive-deps */
  // 첫 페이지는 스크롤 이벤트 없이 onLoadMore 함수 호출
  useEffect(() => {
    load();
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  return { data, loading };
}

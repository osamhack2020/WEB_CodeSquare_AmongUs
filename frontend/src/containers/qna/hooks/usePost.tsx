import { useCallback, useEffect, useState } from "react";
import { getPost, getReplies, QnaPost } from "../../../lib/api/qna";

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
    const [post, replies] = await Promise.all([
      getPost(postId),
      getReplies(postId),
    ]);
    setData({ replies, post });
    setLoading(false);
  }, [loading, setLoading, setData, postId]);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    load();
  }, [postId]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return { data, loading };
}

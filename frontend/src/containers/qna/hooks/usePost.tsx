import { useCallback, useEffect, useState } from "react";
import { getPost, getReplies, QnaPost } from "../../../lib/api/qna";

export default function usePost(postId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<{
    post: QnaPost;
    replies: QnaPost[];
  } | null>(null);

  const load = useCallback(async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const [post, replies] = await Promise.all([
        getPost(postId),
        getReplies(postId),
      ]);
      setData({ replies, post });
    } catch {
      setError(true);
    }
    setLoading(false);
  }, [loading, setLoading, setData, setError, postId]);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    load();
  }, [postId]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return { data, loading, error };
}

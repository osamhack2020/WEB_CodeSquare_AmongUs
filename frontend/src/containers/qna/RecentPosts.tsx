/** @jsx jsx */
import { jsx } from "@emotion/core";
import { QnaPostItem } from "../../components/qna/QnaPostItem";
import { QnaPostList } from "../../components/qna/QnaPostList";
import useRecentPosts from "./hooks/useRecentPosts";

export const RecentPosts: React.FC = (props) => {
  const { data, loading } = useRecentPosts();

  return (
    <QnaPostList {...props}>
      {data?.posts.map((post) => (
        <QnaPostItem key={post.id} post={post} />
      ))}
      {loading && <div>loading</div>}
    </QnaPostList>
  );
};

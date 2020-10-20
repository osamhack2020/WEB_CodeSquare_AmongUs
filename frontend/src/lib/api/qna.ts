import apiClient from "./apiClient";

export interface QnaComment {
  id: number;
  username: string;
  member_name: string;
  text: string;
  created_at: string;
  updated_at: string;
  is_author?: boolean;
}

export interface QnaPost {
  id: number;
  username: string;
  member_name: string;
  title?: string;
  text: string;
  tags?: string[];
  view?: number;
  recommend: number;
  answer: boolean;
  accepted?: boolean;
  created_at: string;
  updated_at: string;
  comments?: QnaComment[];
}

export interface ApiComment {
  id: number;
  username: string;
  member_name: string;
  body: string;
  created_at: string;
  updated_at: string;
}

export interface ApiBoard {
  id: number;
  username: string;
  member_name: string;
  title: string;
  body: string;
  tags: {
    id: number;
    body: string;
  }[];
  view: number;
  recommend: number;
  created_at: string;
  updated_at: string;
}

export interface ApiReplies {
  id: number;
  username: string;
  adopted: number;
  recommend: number;
  body: string;
  member_name: string;
  created_at: string;
  updated_at: string;
}

export interface CoreState {
  posts: QnaPost[];
}

export interface ApiBoardResponse {
  data: {
    totalPage: number;
    boards: ApiBoard[];
  };
}

export interface ApiBoardSpecificResponse {
  data: ApiBoard;
}

export interface ApiRepliesResponse {
  data: ApiReplies[];
}

export interface ApiCommentResponse {
  data: ApiComment[];
}

const buildQnaPostFromApiBoard = (board: ApiBoard): QnaPost => ({
  id: board.id,
  username: board.username,
  member_name: board.member_name,
  title: board.title,
  text: board.body,
  tags: board.tags.map((tag) => tag.body).sort(),
  view: board.view,
  recommend: board.recommend,
  created_at: board.created_at,
  updated_at: board.updated_at,
  answer: false,
});

const buildQnaPostFromApiReplies = (replies: ApiReplies): QnaPost => ({
  id: replies.id,
  username: replies.username,
  member_name: replies.member_name,
  text: replies.body,
  recommend: replies.recommend,
  created_at: replies.created_at,
  updated_at: replies.updated_at,
  answer: true,
  accepted: !!replies.adopted,
});

const buildQnaCommentFromApiComment = (replies: ApiComment): QnaComment => ({
  id: replies.id,
  username: replies.username,
  member_name: replies.member_name,
  text: replies.body,
  created_at: replies.created_at,
  updated_at: replies.updated_at,
});

export const getPost = async (
  postId: string | number,
): Promise<{ post: QnaPost; replies: QnaPost[] }> => {
  const apiBoard = apiClient.get<ApiBoardSpecificResponse>(
    `/board/specific/${postId}`,
  );
  const apiReplies = apiClient.get<ApiRepliesResponse>(`/replies/${postId}`);

  const [
    {
      data: { data: board },
    },
    {
      data: { data: replies },
    },
  ] = await Promise.all([apiBoard, apiReplies]);

  return {
    post: buildQnaPostFromApiBoard(board),
    replies: replies.map((repl) => buildQnaPostFromApiReplies(repl)),
  };
};

export const getRecentPosts = async (
  page: number,
): Promise<{ totalPage: number; posts: QnaPost[] }> => {
  const {
    data: {
      data: { totalPage, boards },
    },
  } = await apiClient.get<ApiBoardResponse>(`/board/${page}`);

  return {
    totalPage,
    posts: boards.map((board) => buildQnaPostFromApiBoard(board)),
  };
};

export const getComments = async (
  type: "board" | "replies",
  postId: number,
): Promise<QnaComment[]> => {
  const url = `/${type}comment/${postId}`;

  const {
    data: { data: comments },
  } = await apiClient.get<ApiCommentResponse>(url);

  return comments.map((comment) => buildQnaCommentFromApiComment(comment));
};

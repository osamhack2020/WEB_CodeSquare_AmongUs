import apiClient from "./apiClient";

export type PostType = "board" | "replies";

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
  voted: number;
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

export interface ApiReply {
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

export interface ApiBoardSpecific {
  board: ApiBoard;
  value: number;
}

export interface ApiBoardSpecificResponse {
  data: ApiBoardSpecific;
}

export interface ApiRepliesResponse {
  data: ApiReply[];
}

export interface ApiCommentResponse {
  data: ApiComment[];
}

const buildQnaPostFromApiBoardSpecific = (api: ApiBoardSpecific): QnaPost => {
  const { board, value } = api;
  return {
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
    voted: value,
  };
};

const buildQnaPostFromApiReplies = (reply: ApiReply): QnaPost => ({
  id: reply.id,
  username: reply.username,
  member_name: reply.member_name,
  text: reply.body,
  recommend: reply.recommend,
  created_at: reply.created_at,
  updated_at: reply.updated_at,
  answer: true,
  accepted: !!reply.adopted,
  voted: 0,
});

const buildQnaCommentFromApiComment = (reply: ApiComment): QnaComment => ({
  id: reply.id,
  username: reply.username,
  member_name: reply.member_name,
  text: reply.body,
  created_at: reply.created_at,
  updated_at: reply.updated_at,
});

export const getPost = async (postId: string | number): Promise<QnaPost> => {
  const {
    data: { data: board },
  } = await apiClient.get<ApiBoardSpecificResponse>(
    `/board/specific/${postId}`,
  );

  return buildQnaPostFromApiBoardSpecific(board);
};

export const getReplies = async (
  postId: string | number,
): Promise<QnaPost[]> => {
  const {
    data: { data: replies },
  } = await apiClient.get<ApiRepliesResponse>(`/replies/${postId}`);

  return replies.map((repl) => buildQnaPostFromApiReplies(repl));
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
    posts: boards.map((board) =>
      buildQnaPostFromApiBoardSpecific({ board, value: 0 }),
    ),
  };
};

export const getComments = async (
  postType: PostType,
  postId: number,
): Promise<QnaComment[]> => {
  const type = postType === "replies" ? "reply" : postType;
  let url = `/${type}comment/${postId}`;

  const {
    data: { data: comments },
  } = await apiClient.get<ApiCommentResponse>(url);

  return comments.map((comment) => buildQnaCommentFromApiComment(comment));
};

export const writeComment = async (
  postType: PostType,
  postId: number,
  text: string,
): Promise<void> => {
  const type = postType === "replies" ? "reply" : postType;
  const url = `/${type}comment/${postId}`;

  await apiClient.post(url, {
    body: text,
  });
};

export const writePost = async (
  text: string,
  title: string,
  tags: string[],
): Promise<QnaPost> => {
  const {
    data: { data: board },
  } = await apiClient.post<{ data: ApiBoard }>("/board/", {
    body: text,
    title,
    tag: tags.join(" "),
  });

  return buildQnaPostFromApiBoardSpecific({ board, value: 0 });
};

export const editPost = async (
  type: PostType,
  postId: number,
  text: string,
  title?: string,
  tags?: string[],
) => {
  const url = type === "board" ? `/${type}` : `/${type}/${postId}`;
  await apiClient.put<ApiBoardSpecificResponse>(url, {
    body: text,
    title,
    tag: tags?.join(" "),
    board_id: type === "board" && postId,
  });
};

export const deletePost = async (type: PostType, postId: number) => {
  const url = `/${type}/${postId}`;
  await apiClient.delete<ApiBoardSpecificResponse>(url);
};

export const writeReply = async (
  postId: string,
  text: string,
): Promise<QnaPost> => {
  const url = `/replies/${postId}`;
  const {
    data: { data: reply },
  } = await apiClient.post<{ data: ApiReply }>(url, {
    body: text,
  });

  return buildQnaPostFromApiReplies(reply);
};

export const accept = async (postId: number) => {
  await apiClient.put(`/replies/adopted/${postId}`);
};

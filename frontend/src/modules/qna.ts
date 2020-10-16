export interface QnaPost {
  id: number;
  user_id: string;
  title: string;
  text: string;
  tag: string;
  view: number;
  recommend: number;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: number;
  user: {
    id: number;
    username: string;
  };
  text: string;
  created_at: string;
  isAuthor: boolean;
}

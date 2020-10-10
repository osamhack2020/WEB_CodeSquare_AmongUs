export interface QnaPost {
  id: number;
  user_id: string;
  title: string;
  body: string;
  tag: string;
  view: number;
  recommend: number;
  created_at: Date;
  updated_at: Date;
}

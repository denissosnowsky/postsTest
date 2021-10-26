export type GetResponsePost = {
  title: string;
  body: string;
  id: number;
};

export type CommentType = {
  postId: number;
  body: string;
  id: number;
};

export type GetResponsePostWithComment = {
  title: string;
  body: string;
  id: number;
  comments: Array<CommentType>;
};

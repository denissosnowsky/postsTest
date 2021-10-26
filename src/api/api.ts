import axios from "axios";
import { CommentType, GetResponsePost, GetResponsePostWithComment } from "../types/types";

const instance = axios.create({
  baseURL: "https://bloggy-api.herokuapp.com",
});

export const postsAPI = {
  async getPosts() {
    try {
      const res = await instance.get<Array<GetResponsePost>>("/posts");

      return res.data;
    } catch (e) {
      return false;
    }
  },
  async getPost(id: number) {
    try {
      const res = await instance.get<GetResponsePostWithComment>(
        `/posts/${id}?_embed=comments`
      );
      return res.data;
    } catch (e) {
      return false;
    }
  },
  async addPost(title: string, body: string) {
    try {
      const res = await instance.post<GetResponsePost>("/posts", {
        title,
        body,
      });

      return res.data;
    } catch (e) {
      return false;
    }
  },
  async putPost(id: number, title: string, body: string) {
    try {
      const res = await instance.put<GetResponsePost>(`/posts/${id}`, {
        title,
        body,
      });
      return res.data;
    } catch (e) {
      return false;
    }
  },
  async deletePost(id: number) {
    try {
      const res = await instance.delete<{}>(`/posts/${id}`);
      return res.data;
    } catch (e) {
      return false;
    }
  },
  async addComment(postId: number, body: string) {
    try {
      const res = await instance.post<CommentType>("/comments", {
        postId,
        body,
      });

      return res.data;
    } catch (e) {
      return false;
    }
  },
};

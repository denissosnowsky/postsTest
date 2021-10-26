import { ThunkAction } from "redux-thunk";
import { postsAPI } from "../api/api";
import { GetResponsePost, GetResponsePostWithComment } from "../types/types";
import { setErrorThunk, setSuccessThunk } from "./alertReducer";
import { StateType } from "./store";

const IS_FETCHING = "IS_FETCHING";
const GET_POSTS = "GET_POSTS";
const GET_POST = "GET_POST";
const SET_PAGE = "SET_PAGE";
const SET_CURRENT_POST = "SET_CURRENT_POST";

const initialState = {
  posts: [],
  paginatedPosts: [],
  isFetching: false,
  page: 1,
  pageSize: 5,
  currentPost: null,
};

type initialStateType = {
  posts: Array<GetResponsePost>;
  paginatedPosts: Array<GetResponsePost>;
  isFetching: boolean;
  page: number;
  pageSize: number;
  currentPost: GetResponsePostWithComment | null;
};

type ActionsType =
  | IsFetchingACType
  | GetPostsACType
  | GetPostACType
  | SetPageACType
  | SetCurrentPost;

const postsReducer = (
  state: initialStateType = initialState,
  action: ActionsType
): initialStateType => {
  switch (action.type) {
    case IS_FETCHING:
      return {
        ...state,
        isFetching: action.data,
      };
    case GET_POSTS:
      return {
        ...state,
        posts: [...action.data],
      };
    case SET_PAGE:
      return {
        ...state,
        page: action.data,
        paginatedPosts: state.posts.slice(
          (action.data - 1) * state.pageSize,
          action.data * state.pageSize
        ),
      };
    case SET_CURRENT_POST:
      return {
        ...state,
        currentPost: action.data,
      };
    default:
      return state;
  }
};

type IsFetchingACType = {
  type: typeof IS_FETCHING;
  data: boolean;
};
export const isFetchingAC = (data: boolean): IsFetchingACType => ({
  type: IS_FETCHING,
  data,
});

type GetPostsACType = {
  type: typeof GET_POSTS;
  data: Array<GetResponsePost>;
};
export const getPostsAC = (data: Array<GetResponsePost>): GetPostsACType => ({
  type: GET_POSTS,
  data,
});

type GetPostACType = {
  type: typeof GET_POST;
  data: GetResponsePost;
};
export const getPostAC = (data: GetResponsePost): GetPostACType => ({
  type: GET_POST,
  data,
});

type SetPageACType = {
  type: typeof SET_PAGE;
  data: number;
};
export const setPageAC = (data: number): SetPageACType => ({
  type: SET_PAGE,
  data,
});

type SetCurrentPost = {
  type: typeof SET_CURRENT_POST;
  data: GetResponsePostWithComment | null;
};
export const setCurrentPost = (
  data: GetResponsePostWithComment | null
): SetCurrentPost => ({
  type: SET_CURRENT_POST,
  data,
});

export const getPostsThunk =
  (page = 1): ThunkAction<Promise<void>, StateType, unknown, ActionsType> =>
  async (dispatch) => {
    dispatch(isFetchingAC(true));
    const res = await postsAPI.getPosts();

    if (res) {
      dispatch(getPostsAC(res));
      dispatch(setPageAC(page));
    }

    dispatch(isFetchingAC(false));
  };

export const deletePostThunk =
  (id: number): ThunkAction<Promise<void>, StateType, unknown, ActionsType> =>
  async (dispatch, state) => {
    const reducer = state().postsReducer;
    dispatch(isFetchingAC(true));
    const res = await postsAPI.deletePost(id);

    if (res) {
      dispatch(
        getPostsThunk(
          reducer.page >
            Math.ceil((reducer.posts.length - 1) / reducer.pageSize)
            ? reducer.page - 1
            : reducer.page
        )
      );
      dispatch(setSuccessThunk("Post was deleted"));
    } else {
      dispatch(isFetchingAC(false));
      dispatch(setErrorThunk("Error: Post wasn't deleted"));
    }
  };

export const putPostThunk =
  (
    id: number,
    title: string,
    body: string
  ): ThunkAction<Promise<void>, StateType, unknown, ActionsType> =>
  async (dispatch, state) => {
    dispatch(isFetchingAC(true));
    const res = await postsAPI.putPost(id, title, body);

    if (res) {
      dispatch(getPostsThunk(state().postsReducer.page));
      dispatch(setSuccessThunk("Post was changed"));
    } else {
      dispatch(isFetchingAC(false));
      dispatch(setErrorThunk("Error: Post wasn't changed"));
    }
  };

export const addPostThunk =
  (
    title: string,
    body: string
  ): ThunkAction<Promise<void>, StateType, unknown, ActionsType> =>
  async (dispatch) => {
    dispatch(isFetchingAC(true));
    const res = await postsAPI.addPost(title, body);

    if (res) {
      dispatch(getPostsThunk());
      dispatch(setSuccessThunk("Post was added"));
    } else {
      dispatch(isFetchingAC(false));
      dispatch(setErrorThunk("Error: Post wasn't added"));
    }
  };

export const addCurrentPostThunk =
  (id: number): ThunkAction<Promise<void>, StateType, unknown, ActionsType> =>
  async (dispatch) => {
    const res = await postsAPI.getPost(id);

    if (res) {
      dispatch(setCurrentPost(res));
    }
  };

export const addCommentThunk =
  (
    userId: number,
    body: string
  ): ThunkAction<Promise<void>, StateType, unknown, ActionsType> =>
  async (dispatch) => {
    const res = await postsAPI.addComment(userId, body);

    if (res) {
      dispatch(addCurrentPostThunk(res.postId));
      dispatch(setSuccessThunk("Comment was added"));
    } else {
      dispatch(setErrorThunk("Error: Comment wasn't added"));
    }
  };

export default postsReducer;

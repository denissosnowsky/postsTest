import { ThunkAction } from "redux-thunk";
import { StateType } from "./store";

const SET_ERROR = "SET_ERROR";
const SET_SUCCESS = "SET_SUCCESS";

const initialState = {
  error: "",
  success: "",
};

export type initialStateType = {
  error: string;
  success: string;
};

type ActionsType = SetErrorAC | SetSuccessAC;

const alertReducer = (
  state: initialStateType = initialState,
  action: ActionsType
): initialStateType => {
  switch (action.type) {
    case SET_SUCCESS:
      return {
        ...state,
        success: action.data,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.data,
      };
    default:
      return state;
  }
};

type SetErrorAC = {
  type: typeof SET_ERROR;
  data: string;
};
export const setErrorAC = (data: string): SetErrorAC => ({
  type: SET_ERROR,
  data,
});

type SetSuccessAC = {
  type: typeof SET_SUCCESS;
  data: string;
};
export const setSuccessAC = (data: string): SetSuccessAC => ({
  type: SET_SUCCESS,
  data,
});

export const setErrorThunk =
  (
    error: string
  ): ThunkAction<Promise<void>, StateType, unknown, ActionsType> =>
  async (dispatch) => {
    dispatch(setErrorAC(error));
    setTimeout(() => {
      dispatch(setErrorAC(""));
    }, 3000);
  };

export const setSuccessThunk =
  (
    success: string
  ): ThunkAction<Promise<void>, StateType, unknown, ActionsType> =>
  async (dispatch) => {
    dispatch(setSuccessAC(success));
    setTimeout(() => {
      dispatch(setSuccessAC(""));
    }, 3000);
  };

export default alertReducer;

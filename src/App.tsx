import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AlertComponent from "./components/AlertComponent/AlertComponent";
import Loading from "./components/Loading/Loading";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import PostPage from "./pages/PostPage/PostPage";
import PostsPage from "./pages/PostsPage/PostsPage";
import { getPostsThunk } from "./redux/postsReducer";
import { StateType } from "./redux/store";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostsThunk());
  }, []);

  const isFetching = useSelector(
    (state: StateType) => state.postsReducer.isFetching
  );

  if (isFetching) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <AlertComponent />
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/posts" />} />
        <Route exact path="/posts" render={() => <PostsPage />} />
        <Route exact path="/posts/:id" render={() => <PostPage />} />
        <Route path="*" render={() => <ErrorPage />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

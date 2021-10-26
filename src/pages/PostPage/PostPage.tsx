import s from "./PostPage.module.css";
import { useHistory, useParams } from "react-router-dom";
import { Button, Container, Row } from "react-bootstrap";
import Header from "../../components/Header/Header";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCommentThunk,
  addCurrentPostThunk,
  setCurrentPost,
} from "../../redux/postsReducer";
import { StateType } from "../../redux/store";
import Loading from "../../components/Loading/Loading";
import { setErrorThunk } from "../../redux/alertReducer";

const PostPage = () => {
  const params: { id: string } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const [commentText, setCommentText] = useState("");
  const textarea: React.LegacyRef<HTMLTextAreaElement> | null = useRef(null);

  const currentPost = useSelector(
    (state: StateType) => state.postsReducer.currentPost
  );

  useEffect(() => {
    dispatch(addCurrentPostThunk(Number(params.id)));
    return () => {
      dispatch(setCurrentPost(null));
    };
  }, []);

  useEffect(() => {
    textarea?.current && textarea?.current!.focus();
  });

  const handleAddPost = (userId: number, body: string) => {
    if (commentText) {
      dispatch(addCommentThunk(userId, body));
      setCommentText("");
    } else {
      dispatch(setErrorThunk("Fill the comment field"));
    }
  };

  if (!currentPost) {
    return <Loading />;
  }

  return (
    <Container>
      <Header
        text={"Back to the List"}
        btnOnClick={() => history.push("/posts")}
        color={"primary"}
        position={"start"}
        icon={"bi bi-arrow-left-circle"}
      />

      <div className={s.wrapper}>
        <Row className={s.row}>
          <div className={s.header}>
            <div className={s.title}>{currentPost.title}</div>
          </div>

          <Row className={s.body}>{currentPost.body}</Row>
        </Row>
      </div>

      <div className={s.commentsHeader}>Comments</div>
      <div className={s.commentWrapper}>
        {currentPost.comments.length > 0 ? (
          currentPost.comments.map((item, i) => (
            <div className={s.comment} key={i}>{`${i + 1}. ${item.body}`}</div>
          ))
        ) : (
          <div className={s.noComments}>No comments</div>
        )}
      </div>

      <div className={s.textareaWrapper}>
        <textarea
          ref={textarea}
          className={s.textarea}
          placeholder="Enter Your Comment"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
      </div>

      <div className={s.addBtn}>
        <Button
          variant="success"
          onClick={() => handleAddPost(currentPost.id, commentText)}
        >
          <i className="bi bi-plus-circle"></i> Add Comment
        </Button>
      </div>
    </Container>
  );
};

export default PostPage;

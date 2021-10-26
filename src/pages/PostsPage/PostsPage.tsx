import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import { useDispatch, useSelector } from "react-redux";
import AddPostModal from "../../components/AddPostModal/AddPostModal";
import ChangePostModal from "../../components/ChangePostModal/ChangePostModal";
import DeletePostModal from "../../components/DeletePostModal/DeletePostModal";
import Header from "../../components/Header/Header";
import ListItem from "../../components/ListItem/ListItem";
import Loading from "../../components/Loading/Loading";
import PaginationFC from "../../components/Pagination/Pagination";
import {
  addPostThunk,
  deletePostThunk,
  putPostThunk,
  setPageAC,
} from "../../redux/postsReducer";
import { StateType } from "../../redux/store";
import s from "./PostsPage.module.css";

interface PostsPagePropsType {}

const PostsPage: React.FC = () => {
  const dispatch = useDispatch();

  const allPostsCount = useSelector(
    (state: StateType) => state.postsReducer.posts
  ).length;
  const paginatedPosts = useSelector(
    (state: StateType) => state.postsReducer.paginatedPosts
  );
  const page = useSelector((state: StateType) => state.postsReducer.page);
  const pageSize = useSelector((state: StateType) => state.postsReducer.pageSize);

  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState<number>(0);
  const [openChange, setOpenChange] = useState<number>(0);
  
  const scrollWindowToTop = () => {
    window.scrollTo(0, 0);
  }

  return (
    <>
      {openAdd && (
        <AddPostModal
          isShow={openAdd}
          setShow={setOpenAdd}
          addClb={(title: string, body: string) =>
            dispatch(addPostThunk(title, body))
          }
        />
      )}
      {Boolean(openDelete) && (
        <DeletePostModal
          isShow={openDelete}
          title={
            paginatedPosts?.filter((obj) => obj?.id === openDelete)[0]?.title
          }
          setShow={setOpenDelete}
          deleteClb={() => dispatch(deletePostThunk(openDelete))}
        />
      )}
      {Boolean(openChange) && (
        <ChangePostModal
          isShow={openChange}
          setShow={setOpenChange}
          title={paginatedPosts.filter((obj) => obj.id === openChange)[0].title}
          body={paginatedPosts.filter((obj) => obj.id === openChange)[0].body}
          changeClb={(title: string, body: string) =>
            dispatch(putPostThunk(openChange, title, body))
          }
        />
      )}
      <Header
        btnOnClick={() => setOpenAdd(true)}
        text={"Add New Post"}
        color={"success"}
        position={"end"}
        icon={"bi bi-plus-circle"}
      />
      <div>
        <Container className={s.container}>
          <>
            <ListGroup>
              {paginatedPosts && allPostsCount > 0 ? (
                paginatedPosts.map((item) => (
                  <ListItem
                    data={item}
                    key={item.id}
                    deleteClb={() => setOpenDelete(item?.id)}
                    changeClb={() => setOpenChange(item?.id)}
                  />
                ))
              ) : (
                <div className={s.noText}>There are no posts</div>
              )}
            </ListGroup>
            <PaginationFC
              page={page}
              setPage={(page: number) => dispatch(setPageAC(page))}
              pageSize={pageSize}
              allCount={allPostsCount}
              extClb={scrollWindowToTop}
            />
          </>
        </Container>
      </div>
    </>
  );
};

export default PostsPage;

import s from "./ListItem.module.css";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router";
import { GetResponsePost } from "../../types/types";

interface ListItemPropsType {
  data: GetResponsePost;
  deleteClb: () => void;
  changeClb: () => void;
}

const ListItem: React.FC<ListItemPropsType> = ({
  data,
  deleteClb,
  changeClb,
}) => {
  const history = useHistory();

  return (
    <ListGroup.Item className={s.wrapper}>
      <Row className={s.row}>
        <div className={s.header}>
          <div
            className={s.title}
            onClick={() => history.push(`/posts/${data.id}`)}
          >
            {data.title}
          </div>
          <div className={s.headerButtons}>
            <i className="bi bi-pencil-square" onClick={() => changeClb()}></i>
            <i
              className="bi bi-x-circle-fill text-danger"
              onClick={() => deleteClb()}
            ></i>
          </div>
        </div>

        <Row className={s.body}>{data.body}</Row>
      </Row>
    </ListGroup.Item>
  );
};

export default ListItem;
